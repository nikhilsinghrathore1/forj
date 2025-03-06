"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { MsgContext } from "../../../context/MsgContext";
import Codeview from "../../../components/CodeView";
import { PreviewContext } from "../../../context/PreviewContext";
import { sanitizeAndParseJSON } from "../../../configs/AiModel";
import Markdown from "react-markdown"
import { FaLink, FaPlay } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import { VscDebugStart } from "react-icons/vsc";
import axios from "axios";
import Prompt from "../../../data/Prompt";
import PromptAO from "../../../data/PromptAO";



const page = () => {
  const lastCalledRef = useRef(0); 
  const [loading, setloading] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const timeoutRef = useRef(null);


  const handleMouseEnter = (index) => {
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(index);
    }, 800); // 1 second delay
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    setHoveredIndex(null);
  };



  // what all needs to be fixed first thing first i have to implement the web-container that is the first task 
  // 
  const context = useContext(MsgContext);
  if (!context) {
    throw new Error("context not present");
  }
  const { message, setMessage } = context;
  const [isHovered, setIsHovered] = useState(false);

    const Previewcontext = useContext(PreviewContext);
    if (!Previewcontext) {
      throw new Error("context not defined");
    }
    const { preview, setPreview } = Previewcontext;

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


useEffect(()=>{
  const getChat = async()=>{
    const now = Date.now();
    if (now - lastCalledRef.current < 10000) {
      console.log("Rate limiter active, skipping call.");
      return; 
    }
    lastCalledRef.current = now; 
    console.log("Calling the get AI response here");
    try{

      const MESSAGE = JSON.stringify(message) + Prompt.CHAT_PROMPT
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/chat/getChat` , {
        prompt: MESSAGE
      })
      const result = sanitizeAndParseJSON(response.data.res)
      setMessage((prev) => [
        ...(Array.isArray(prev) ? prev : []),
        {
          role: "ai",
          msg: result.response?.description ?? result.response

        },
      ]);

      console.log(result)
    }catch(err){
      console.log(err)
      throw err; 
    }
    finally{

      setloading(false)
    }

  }
  console.log("request send to get chat")
   getChat()

},[message])



  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey && userInput.length > 1) {
      event.preventDefault();
      followUpChat();
    }
  };
  const [userInput, setuserInput] = useState("");
  const [isToggled, setIsToggled] = useState(false);
  const [activeTab, setActiveTab] = useState("Chat");

  return (
    <div className="w-full h-screen overflow-hidden bg-[#20282D] flex ">
      {/* this is the left most  nav bar  */}
      <div className="w-[3.1%] py-4 border-r-[0.5px] border-[#37454E]/20 bg-[#293138] ">
        <div className="w-full flex flex-col h-full items-center justify-between border-r-[0.5px] border-[#37454E] bg-[#293138] ">
          {/* top nav bar */}
          <div className="w-full  flex flex-col  items-center gap-5 ">
            <div>
              <svg
                className="w-[20px]  text-[#8F989E] hover:text-white transition-transform duration-300 hover:scale-110"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5192 1.91235L17.0537 4.53232L18.1874 5.18731M21.5883 7.15228V12.2914V13.5762M21.5883 17.4306L17.0537 20.0506L15.9201 20.7056M12.5192 22.6705L7.98463 20.0506L6.85099 19.3956M3.45007 17.4306V12.2914V11.0067M3.45007 7.15228L7.98463 4.53232L9.11826 3.87733"
                  stroke="#fff"
                  strokeWidth="1.25"
                  strokeLinejoin="round"
                ></path>
                <circle
                  cx="12.5192"
                  cy="1.91235"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="21.5882"
                  cy="7.15234"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="21.5882"
                  cy="13.5771"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="21.5882"
                  cy="17.4307"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="15.9191"
                  cy="20.7056"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="12.5192"
                  cy="22.6704"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="6.84997"
                  cy="19.3955"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="3.45007"
                  cy="17.4307"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="3.45007"
                  cy="11.0076"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="3.45007"
                  cy="7.15234"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="9.11724"
                  cy="3.87743"
                  r="1.28759"
                  fill="#fff"
                ></circle>
                <circle
                  cx="18.1863"
                  cy="5.18725"
                  r="1.28759"
                  fill="#fff"
                ></circle>
              </svg>
            </div>

            <div
      className='relative inline-block'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        className='w-[20px] text-[#8F989E] relative hover:text-white transition-transform duration-300 hover:scale-110'
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z'></path>
        <path d='M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z'></path>
        <path d='M3 5a2 2 0 0 0 2 2h3'></path>
        <path d='M3 3v13a2 2 0 0 0 2 2h3'></path>
      </svg>
      {isHovered && (
        <div className='absolute -left-[-120%] w-fit text-nowrap top-1/2 -translate-y-1/2 text-white px-2 py-1 bg-[#293138] z-[100] border border-white/10 rounded-md text-sm '>
          Explorer
        </div>
      )}
            </div>

    
      <div
        className='relative inline-block'
        onMouseEnter={() => setHoveredIndex(0)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg
          className='w-[20px] text-[#8F989E] hover:text-white transition-transform duration-300 hover:scale-110'
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z'></path>
          <path d='M12 22V12'></path>
          <path d='m3.3 7 7.703 4.734a2 2 0 0 0 1.994 0L20.7 7'></path>
          <path d='m7.5 4.27 9 5.15'></path>
        </svg>
        {hoveredIndex === 0 && (
          <div className='absolute -left-[-120%] top-1/2 -translate-y-1/2 z-[100] text-white px-2 py-1 bg-[#293138] rounded-md text-sm whitespace-nowrap shadow-lg border border-gray-700'>
            Packages
          </div>
        )}
      </div>


      <div
        className='relative inline-block'
        onMouseEnter={() => setHoveredIndex(1)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg
          className='w-[20px] text-[#8F989E] hover:text-white transition-transform duration-300 hover:scale-110'
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M18 22H4a2 2 0 0 1-2-2V6'></path>
          <path d='m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18'></path>
          <circle cx='12' cy='8' r='2'></circle>
          <rect width='16' height='16' x='6' y='2' rx='2'></rect>
        </svg>
        {hoveredIndex === 1 && (
          <div className='absolute z-[100] -left-[-120%] top-1/2 -translate-y-1/2 text-white px-2 py-1 bg-[#293138] rounded-md text-sm whitespace-nowrap shadow-lg border border-gray-700'>
            Assets
          </div>
        )}
      </div>


      <div className='w-[50%] -my-[2px] border-t-[1px] border-white/10'></div>

      <div
        className='relative inline-block'
        onMouseEnter={() => setHoveredIndex(2)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg
          className='w-[20px] text-[#8F989E] hover:text-white transition-transform duration-300 hover:scale-110'
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M12 7v14'></path>
          <path d='M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z'></path>
        </svg>
        {hoveredIndex === 2 && (
          <div className='absolute z-[100] -left-[-120%] top-1/2 -translate-y-1/2 text-white px-2 py-1 bg-[#293138] rounded-md text-sm whitespace-nowrap shadow-lg border border-gray-700'>
            All Projects
          </div>
        )}
      </div>

      <div
        className='relative inline-block'
        onMouseEnter={() => setHoveredIndex(3)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        <svg
          className='w-[25px] text-[#8F989E] hover:text-white transition-transform duration-300 hover:scale-110'
          xmlns='http://www.w3.org/2000/svg'
          width='18'
          height='18'
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        >
          <path d='M5 12h14'></path>
          <path d='M12 5v14'></path>
        </svg>
        {hoveredIndex === 3 && (
          <div className='absolute z-[100] -left-[-120%] top-1/2 -translate-y-1/2 text-white px-2 py-1 bg-[#293138] rounded-md text-sm whitespace-nowrap shadow-lg border border-gray-700'>
            Create new app
          </div>
        )}
      </div>
          </div>
          {/* bottom nav bar */}

          <div className="w-full flex flex-col items-center gap-5">
         

           
      <div
        className='relative inline-block'
        onMouseEnter={() => handleMouseEnter(4)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
       
       <svg
                className="w-[20px] text-[#8F989E] hover:text-white transition-transform duration-300 hover:scale-110"
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke="#8F989E"
              >
                <path
                  d="M20.3303 4.26907C18.757 3.53302 17.0926 3.01017 15.381 2.71436C15.1475 3.14216 14.9356 3.58144 14.7462 4.03052C12.9288 3.75234 11.0796 3.75234 9.26221 4.03052C9.0716 3.58083 8.85743 3.1415 8.62058 2.71436C6.90679 3.01041 5.24037 3.53468 3.66578 4.27318C0.866764 8.33565 -0.394456 13.2619 0.108033 18.1696C1.93632 19.5501 3.99043 20.6027 6.17883 21.2804C6.6706 20.6053 7.10534 19.8903 7.47853 19.1431C6.76739 18.8726 6.08189 18.5391 5.43026 18.1463C5.60163 18.0188 5.77027 17.8859 5.93205 17.7501C7.82569 18.6611 9.9001 19.1341 12.0015 19.1341C14.1028 19.1341 16.1772 18.6611 18.0709 17.7501C18.234 17.8872 18.4027 18.0243 18.5727 18.1463C17.9185 18.5401 17.2302 18.8742 16.5162 19.1444C16.8881 19.8937 17.3229 20.6101 17.8159 21.2859C20.006 20.6086 22.0616 19.5555 23.8908 18.1738C24.3967 13.2628 23.1342 8.33249 20.3303 4.26907ZM8.01734 15.3742C7.40793 15.3295 6.84045 15.0472 6.43709 14.5882C6.03373 14.1292 5.82677 13.5302 5.86075 12.9201C5.82278 12.309 6.02834 11.7078 6.43249 11.2479C6.83663 10.788 7.40646 10.5069 8.01734 10.466C8.32058 10.4845 8.61716 10.5628 8.88999 10.6964C9.16282 10.83 9.4065 11.0164 9.60698 11.2446C9.80745 11.4729 9.96076 11.7386 10.0581 12.0264C10.1554 12.3142 10.1947 12.6184 10.1739 12.9215C10.2126 13.5327 10.0073 14.1343 9.60304 14.5944C9.19875 15.0545 8.62848 15.334 8.01734 15.3742ZM15.9883 15.3742C15.3789 15.3295 14.8114 15.0472 14.4081 14.5882C14.0047 14.1292 13.7978 13.5302 13.8318 12.9201C13.7934 12.3088 13.9988 11.7072 14.403 11.247C14.8072 10.7868 15.3772 10.5055 15.9883 10.4646C16.2916 10.4831 16.5882 10.5614 16.861 10.695C17.1338 10.8287 17.3775 11.015 17.578 11.2432C17.7785 11.4715 17.9318 11.7372 18.0291 12.025C18.1264 12.3128 18.1657 12.617 18.1449 12.9201C18.1836 13.5315 17.9784 14.1333 17.5741 14.5935C17.1699 15.0538 16.5996 15.3337 15.9883 15.3742Z"
                  fill="currentColor"
                ></path>
              </svg>

       
        {hoveredIndex === 4 && (
          <div className='absolute z-[100] -left-[-120%] top-1/2 -translate-y-1/2 text-white px-2 py-1 bg-[#293138] rounded-md text-sm whitespace-nowrap shadow-lg border border-gray-700'>
            Discord
          </div>
        )}
      </div>















            <div
        className='relative inline-block'
        onMouseEnter={() => handleMouseEnter(5)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
       
       <svg
                className="w-[20px] text-[#8F989E] hover:text-white transition-transform duration-300 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 8h.01"></path>
                <path d="M12 12h.01"></path>
                <path d="M14 8h.01"></path>
                <path d="M16 12h.01"></path>
                <path d="M18 8h.01"></path>
                <path d="M6 8h.01"></path>
                <path d="M7 16h10"></path>
                <path d="M8 12h.01"></path>
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              </svg>

       
        {hoveredIndex === 5 && (
          <div className='absolute z-[100] -left-[-120%] top-1/2 -translate-y-1/2 text-white px-2 py-1 bg-[#293138] rounded-md text-sm whitespace-nowrap shadow-lg border border-gray-700'>
            Keyboard shortcuts
          </div>
        )}
      </div>











          




            <div
        className='relative inline-block'
        onMouseEnter={() => handleMouseEnter(6)}
        onMouseLeave={() => setHoveredIndex(null)}
      >
       
       
       <svg
                className="w-[20px] text-[#8F989E] hover:text-white transition-transform duration-300 hover:scale-110"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
                <line x1="4" x2="4" y1="22" y2="15"></line>
              </svg>
       
        {hoveredIndex === 6 && (
          <div className='absolute z-[100] -left-[-120%] top-1/2 -translate-y-1/2 text-white px-2 py-1 bg-[#293138] rounded-md text-sm whitespace-nowrap shadow-lg border border-gray-700'>
            Leave feedback
          </div>
        )}
      </div>






            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-200 to-yellow-200 flex items-center justify-center text-black/50 font-bold">
              Id
            </div>
          </div>
        </div>
      </div>



{/* have to add the loader in the initial screen */}





      {/* middle part */}

      <div className="w-[67.2%] border-r-[0.5px] border-[#37454E]  h-full flex flex-col">
        {/* top nav bar  */}

        <div className="w-full text-white  h-[6.4%] border-b-[0.5px] flex items-center justify-between px-5 border-[#37454E] ">
          {/* first part */}
          <div className="flex items-center gap-[6px]">
            <h1 className="text-sm f7 tracking-tighter">NikoTuner</h1>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </div>
          {/* second part */}
          <div
            className="flex text-sm w-[20%] h-[62%] border-white/10 rounded border-[1px] cursor-pointer"
            onClick={() => setIsToggled(!isToggled)}
          >
            <div
              className={`w-[50%] px-2 h-full flex items-center justify-center gap-2 transition-all duration-300 ${
                isToggled ? "bg-transparent" : "bg-[#313D45]"
              }`}
              onClick={() => setPreview("code")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m18 16 4-4-4-4"></path>
                <path d="m6 8-4 4 4 4"></path>
                <path d="m14.5 4-5 16"></path>
              </svg>
              <h1>Code</h1>
            </div>
            <div
              className={`w-[50%] px-2 h-full flex items-center gap-2 justify-center transition-all duration-300 ${
                isToggled ? "bg-[#313D45]" : "bg-transparent"
              }`}
              onClick={() => setPreview("preview")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="6 3 20 12 6 21 6 3"></polygon>
              </svg>
              <h1>Preview</h1>
            </div>
          </div>
          {/* third part */}

          <div className="flex items-center gap-5">
            


            <div
        className='relative  inline-block'
        onMouseEnter={() => handleMouseEnter(7)}
        onMouseLeave={() => handleMouseLeave()}
      >
       <FaPlay className="opacity-90"/>
        {hoveredIndex === 7 && (
          <div className='absolute -bottom-[200%] z-[100] -right-[50%] text-white px-3 py-2 bg-black rounded-md text-xs whitespace-nowrap shadow-lg border border-gray-700'>
            Run lua 
          </div>
        )}
      </div>

            <div
        className='relative inline-block'
        onMouseEnter={() => handleMouseEnter(8)}
        onMouseLeave={() => handleMouseLeave()}
      >
      <FiLink className="opacity-80"/>
        {hoveredIndex === 8 && (
          <div className='absolute -bottom-[200%] z-[200]  -right-[50%] text-white px-3 py-2 bg-black rounded-md text-xs whitespace-nowrap shadow-lg border border-gray-700'>
            Deploy
          </div>
        )}
      </div>



          </div>
        </div>

        {/* code & preview part */}

        <div className="w-full h-[93.6%] text-white ">
        <Codeview />

        </div>
      </div>

      {/* last part chat section  */}





      <div className="w-[29.7%] h-full flex flex-col">
  <div className="relative w-full h-[6.4%] border-b border-[#37454E] flex px-9">
    <div className="flex w-full tracking-wider gap-7">
      <div
        className={`flex items-center justify-center cursor-pointer text-[14px] px-1 transition-opacity duration-300 ${
          activeTab === "Chat" ? "opacity-100 text-white" : "opacity-60 text-white"
        }`}
        onClick={() => setActiveTab("Chat")}
      >
        Chat
      </div>
      <div
        className={`flex items-center justify-center cursor-pointer text-[14px] px-1 transition-opacity duration-300 ${
          activeTab === "Setting" ? "opacity-100 text-white" : "opacity-60 text-white"
        }`}
        onClick={() => setActiveTab("Setting")}
      >
        Settings
      </div>
    </div>
    <div
      className="absolute bottom-0 h-[2px] bg-pink-400 transition-transform duration-300"
      style={{
        width: "10%",
        transform: activeTab === "Chat" ? "translateX(0%)" : "translateX(165%)",
      }}
    ></div>
  </div>

  {/* Conditional Content */}
  {activeTab === "Chat" ? (
    <div className="w-full h-[77%] text-[#FFFFFF] gap-5 border-b border-[#37454E] justify-end px-4 flex flex-col">
      {/* Chat Section */}
      <div className="flex flex-col py-5 gap-5 justify-end items-end">
        {message.map((msg, index) => (
          <div key={index} className="w-full flex flex-col gap-3 justify-end items-end">
            {msg.role === "user" && (
              <div className="min-w-[70%] max-w-[80%] py-2 px-2 text-sm rounded-lg bg-[#313D45]">
                {msg.msg}
              </div>
            )}

            {loading ? (
              <div className="w-full flex items-start gap-2">
                <div className="w-[12%] flex justify-center h-full">
                  <div className="w-8 h-8 rounded-full bg-[#313D45] flex items-center justify-center">
                    <svg
                      className="w-[20px] text-[#8F989E]"
                      width="20"
                      height="20"
                      viewBox="0 0 25 25"
                      fill="#fff"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.5192 1.91235L17.0537 4.53232L18.1874 5.18731M21.5883 7.15228V12.2914V13.5762M21.5883 17.4306L17.0537 20.0506L15.9201 20.7056M12.5192 22.6705L7.98463 20.0506L6.85099 19.3956M3.45007 17.4306V12.2914V11.0067M3.45007 7.15228L7.98463 4.53232L9.11826 3.87733"
                        stroke="#fff"
                        strokeWidth="1.25"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </div>
                </div>

                <div className="w-[85%] flex gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-200"></span>
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse delay-400"></span>
                </div>
              </div>
            ) : (
              msg.role === "ai" && (
                <div className="w-full gap-2 flex items-start">
                  <div className="w-[12%] flex justify-center h-full">
                    <div className="w-8 h-8 rounded-full bg-[#313D45] flex items-center justify-center">
                      <svg
                        className="w-[20px] text-[#8F989E]"
                        width="20"
                        height="20"
                        viewBox="0 0 25 25"
                        fill="#fff"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.5192 1.91235L17.0537 4.53232L18.1874 5.18731M21.5883 7.15228V12.2914V13.5762M21.5883 17.4306L17.0537 20.0506L15.9201 20.7056M12.5192 22.6705L7.98463 20.0506L6.85099 19.3956M3.45007 17.4306V12.2914V11.0067M3.45007 7.15228L7.98463 4.53232L9.11826 3.87733"
                          stroke="#fff"
                          strokeWidth="1.25"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-[85%] f4 text-sm">

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
  <div className="w-full h-[16.5%] flex items-center justify-start px-4">
    <div className="w-[96%] h-[76%] justify-between flex flex-col border-[#37454E] border rounded-lg">
      <div className="w-full py-2">
        <input
          value={userInput}
          onChange={(e) => setuserInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full text-white/80 outline-none f4 bg-transparent placeholder:text-[#45544D] text-sm px-3"
          type="text"
          placeholder="What do you want to change..."
        />
      </div>
      <div className="w-full flex justify-end items-center px-4">
        <div className="p-2 text-sm rounded flex items-center justify-center text-white/50 bg-[#313D45]">
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
export default page;
