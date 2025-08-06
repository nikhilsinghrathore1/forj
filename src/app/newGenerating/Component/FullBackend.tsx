"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MsgContext } from "../../../../context/MsgContext";
import {Codeview } from "../../../../components/CodeView";
import { PreviewContext } from "../../../../context/PreviewContext";
import { sanitizeAndParseJSON } from "../../../../configs/AiModel";
import Markdown from "react-markdown"
import { FiLink } from "react-icons/fi";
import axios from "axios";
import Prompt from "../../../../data/Prompt";
import { FaPlay } from "react-icons/fa";
import { RunLuaContextt } from "../../../../context/LuaContext";
import logo from "../../../../public/bgRemoveLogoAnon.png"
import Image from "next/image";
import useSpeechToText from 'react-hook-speech-to-text';


const FullBackend = () => {
  const lastCalledRef = useRef(0); 
  const [loading, setloading] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  // Voice recognition setup
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const handleMouseEnter = (index:any) => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, 800); // 1 second delay
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current!);
    setHoveredIndex(null);
  };

  // State declarations - moved up to avoid reference errors
  const [userInput, setuserInput] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [activeTab, setActiveTab] = useState("Chat");

  // what all needs to be fixed first thing first i have to implement the web-container that is the first task 
  const context = useContext(MsgContext);
  if (!context) {
    throw new Error("context not present");
  }
  const LuaContext = useContext(RunLuaContextt);  
  if (!LuaContext) {
    throw new Error("context not present");
  }
  const { LuaMsg,setLuaMsg } = LuaContext 
  const { messages, setMessage } = context;
  const [isHovered, setIsHovered] = useState(false);
  const [clicked, setClicked] = useState(false);


    const Previewcontext = useContext(PreviewContext);
    if (!Previewcontext) {
      throw new Error("context not defined");
    }
    const {setPreview } = Previewcontext;

  const followUpChat = () => {
    if (userInput.length > 2) {
      setMessage((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        {
          role: "user",
          msg: userInput,
        },
      ]);
      setuserInput("");
    } else {
      alert("empty input fields");
    }
  };

  // Handle voice input
  const handleVoiceInput = () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  };

  // Update user input when voice recognition results change
  useEffect(() => {
    if (results.length > 0) {
      // @ts-ignore
      const transcript = results[results.length - 1]?.transcript || '';
      setuserInput(transcript);
    }
  }, [results]);

  // Send voice message when recording stops and there's content
  useEffect(() => {
    if (!isRecording && results.length > 0 && userInput.length > 2) {
      followUpChat();
    }
  }, [isRecording, results, userInput]);

  const RunLuaContetxt = () => {
    if(LuaMsg =='run'){
      setLuaMsg('stop');

    }
    else{
      setLuaMsg('run');
    }
  };

  useEffect(() => {
    const getChat = async () => {
      const now = Date.now();
  
      // Rate limiter: skip if last call was < 10s ago
      if (now - lastCalledRef.current < 10000) {
        console.log("Rate limiter active, skipping call.");
        return;
      }
  
      lastCalledRef.current = now;
      console.log("Calling the get AI response here");
  
      try {
        const MESSAGE = JSON.stringify(messages) + Prompt.CHAT_PROMPT;
  
        const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/getChat`, {
          prompt: MESSAGE,
        });
  
        const result = sanitizeAndParseJSON(response.data.res);
  
        setMessage((prev) => [
          ...(Array.isArray(prev) ? prev : []),
          {
            role: "ai",
            msg: result.response?.description ?? result.response
          },
        ]);
  
        console.log(result);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        setloading(false);
      }
    };
  
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      // Only trigger when user adds a new message
      console.log("request sent to get chat");
      getChat();
    }
  }, [messages]);
  


  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey && userInput.length > 1) {
      event.preventDefault();
      followUpChat();
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[#fff]  flex ">
      {/* this is the left most  nav bar  */}
  {/*  */}


{/* have to add the loader in the initial screen */}





      {/* middle part */}

      <div className="w-[73.2%]  border-r-[0.5px] border-[#37454E]/20  h-full flex flex-col">
        {/* top nav bar  */}

        <div className="w-full  text-black    h-[8.5%] flex items-center justify-between px-5  ">
          {/* first part */}
          <div className="flex w-[30%]   h-full items-center ">

          <div className="w-[30%]  h-full opacity-80">
            <Image className="w-full h-full object-cover" src={logo} alt="not showing" />
          </div>  

          <div className="relative inline-block text-left group">
      <div
        className="w-9 mr-3 -ml-1 bg-transparent flex items-center justify-center transition-all duration-150 h-9 rounded-full hover:bg-[#F2F2F2] cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide opacity-60 lucide-chevron-down"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </div>
      
      {/* Tooltip */}
      <div className="absolute z-[100] bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
          Preview
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-800"></div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute left-[10%] mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1 f19">
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Git Push</button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">New Project</button>
            <button className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Download</button>
          </div>
        </div>
      )}
    </div>

          <div
                  onClick={() => (setClicked(!clicked) ,  setPreview(prev=>!prev))}
      className={`w-[20%] px-1 flex items-center h-[57%] border rounded-lg overflow-hidden transition-colors duration-200
        ${clicked ? 'bg-[#37454E]' : 'bg-[#F2F2F2]'}`}
    >
      <div
        onClick={() => setClicked(!clicked)}
        className={`w-[65%] h-[75%] flex items-center justify-center rounded-lg transition-all duration-500 cursor-pointer
          ${clicked ? 'translate-x-[60%] bg-white' : 'translate-x-0 bg-white'}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-code"
        >
          <polyline points="16 18 22 12 16 6"></polyline>
          <polyline points="8 6 2 12 8 18"></polyline>
        </svg>
      </div>
    </div>
    <div className="mx-5 opacity-70"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-panel-bottom"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M3 15h18"></path></svg></div>
    <div className="opacity-70"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-package-check"><path d="m16 16 2 2 4-4"></path><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path><path d="m7.5 4.27 9 5.15"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" x2="12" y1="22" y2="12"></line></svg></div>
          </div>
          {/* search bar section */}
          <div className="w-[36%] h-full flex items-center justify-center ">
            <div className="w-full h-[50%] rounded-md bg-[#F2F2F2] flex items-center justify-between px-2">
              {/*  the left section*/}
              <div className="flex items-center  gap-1">
                <div className="p-1 hover:bg-[#E7E8E9] rounded-lg transition-all duration-200">
                <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="opacity-50"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>
                </div>

                <div className="p-1 mr-2 hover:bg-[#E7E8E9] rounded-lg transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house opacity-70"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                </div>

                <div className="f17 opacity-80">
                  <p>BetaVersion/</p>
                </div>

              </div>
            {/* right side */}
              <div>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-refresh-cw opacity-70"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M8 16H3v5"></path></svg>
              </div>
            </div>
          </div>

          <div className="w-[20%] h-full flex items-center justify-end gap-2  ">
            <div className="p-1 hover:bg-[#E7E8E9] transition-all  rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-ellipsis"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </div>
            <div className="p-1 hover:bg-[#E7E8E9] transition-all  rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </div>

            <div onClick={()=>setLuaMsg("run")} className="px-3 cursor-pointer py-1 flex items-center gap-2 bg-[#37454E] text-white rounded-[4px]">
              <div><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" className="opacity-90" height=".9em" width=".9em" xmlns="http://www.w3.org/2000/svg"><path d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"></path></svg></div>
              <p className="f17">Run Lua</p>
            </div>

          </div>

          
        </div>

        {/* code & preview part */}

        <div className="w-full flex items-end justify-center h-[91%] text-white ">

          <div className="w-[97.5%] h-[99%] rounded-lg overflow-hidden border-[1px] border-black/10">
                    <Codeview /> 
          </div>

        </div>
      </div>

      {/* last part chat section  */}

      <div className="w-[33.7%]  h-full text-black flex flex-col">
  <div className="relative items-center w-full h-[9%] border-b border-[#37454E]/20 flex px-4">

      <div>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-panel-right"><rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M15 3v18"></path></svg>        
      </div>

  </div>

  {/* Conditional Content */}
  {activeTab === "Chat" ? (
    <div className="w-full h-[77%] text-[#000]  gap-5 justify-end px-4 flex flex-col">
      {/* Chat Section */}
      <div className="flex flex-col overflow-y-auto py-5 gap-5 justify-end items-end">
        {messages.map((msg, index) => (
          <div key={index} className="w-full flex flex-col gap-3 justify-end items-end">
            {msg.role === "user" && (
              <div className="min-w-[70%] max-w-[80%] py-2 px-2 text-sm rounded-lg bg-[#F2F2F2]">
                {msg.msg}
              </div>
            )}

            {loading ? (
             <div className="w-full flex   items-start gap-2">
             <div className="w-[12%] flex justify-center h-full">
               <div className="w-8 h-8 rounded-full bg-[#E0E0E0] flex items-center justify-center">
                 <svg
                   className="w-[20px] text-[#4B5563]" // A darker gray for visibility
                   width="20"
                   height="20"
                   viewBox="0 0 25 25"
                   fill="none"
                   xmlns="http://www.w3.org/2000/svg"
                 >
                   <path
                     d="M12.5192 1.91235L17.0537 4.53232L18.1874 5.18731M21.5883 7.15228V12.2914V13.5762M21.5883 17.4306L17.0537 20.0506L15.9201 20.7056M12.5192 22.6705L7.98463 20.0506L6.85099 19.3956M3.45007 17.4306V12.2914V11.0067M3.45007 7.15228L7.98463 4.53232L9.11826 3.87733"
                     stroke="#4B5563"
                     strokeWidth="1.25"
                     strokeLinejoin="round"
                   />
                 </svg>
               </div>
             </div>
         
             <div className="w-[85%] flex gap-1 items-center">
               <span className="w-2 h-2 bg-gray-700 rounded-full animate-pulse"></span>
               <span className="w-2 h-2 bg-gray-700 rounded-full animate-pulse delay-200"></span>
               <span className="w-2 h-2 bg-gray-700 rounded-full animate-pulse delay-400"></span>
             </div>
           </div>            ) : (
              msg.role === "ai" && (
<div className="w-full gap-2 flex items-start">
  <div className="w-[12%] flex justify-center h-full">
    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shadow-sm">
      <svg
        className="w-[20px] text-gray-600"
        width="20"
        height="20"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5192 1.91235L17.0537 4.53232L18.1874 5.18731M21.5883 7.15228V12.2914V13.5762M21.5883 17.4306L17.0537 20.0506L15.9201 20.7056M12.5192 22.6705L7.98463 20.0506L6.85099 19.3956M3.45007 17.4306V12.2914V11.0067M3.45007 7.15228L7.98463 4.53232L9.11826 3.87733"
          stroke="#4B5563"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>

  <div className="w-[85%] bg-[#e8eff7] text-gray-900 text-sm rounded-md px-4 py-2 shadow-sm">
    <Markdown>{msg.msg}</Markdown>
  </div>
</div>

         
              )
            )}
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="w-full h-[77%] border-b border-[#37454E] flex flex-col justify-center px-4">
      <div className="text-white text-sm font-semibold">Deployed URL</div>
      <div className="text-[#8F989E] text-sm mt-2">
        <a href="https://example.com" target="_blank" className="underline">
          https://example.com
        </a>
      </div>
    </div>
  )}

  {/* Input Section (Visible in Both Tabs) */}
  <div className="w-full h-[20%]  text-black flex items-center justify-start px-1">
    <div className="w-[95%] ml-1 h-[76%] justify-between flex flex-col border-[#37454E]/40 border rounded-lg">
      <div className="w-full py-2">
        <input
          value={userInput}
          onChange={(e) => setuserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-black outline-none f4 bg-transparent placeholder:text-[#45544D] text-sm px-3"
          type="text"
          placeholder={isRecording ? "Listening..." : "What do you want to change..."}
        />
      </div>
      <div className="w-full flex justify-between items-center px-4">
        {/* Voice Input Button */}
        <button
          onClick={handleVoiceInput}
          className={`p-2 text-sm rounded-full mb-2 flex items-center justify-center transition-all duration-200 ${
            isRecording 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
          }`}
        >
          {isRecording ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="6" y="4" width="4" height="16" rx="2" />
              <rect x="14" y="4" width="4" height="16" rx="2" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" x2="12" y1="19" y2="22"></line>
              <line x1="8" x2="16" y1="22" y2="22"></line>
            </svg>
          )}
        </button>

        {/* Send Button */}
        <div className="p-2 text-sm rounded-full mb-2 flex items-center justify-center text-white bg-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 7-7 7 7"></path>
            <path d="M12 19V5"></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
  );
};
export default FullBackend;