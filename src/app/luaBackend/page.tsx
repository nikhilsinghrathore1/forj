"use client";
import React, { useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { MsgContext } from '../../../context/MsgContext';
import Codeview from '../../../components/CodeView';
import { PreviewContext } from '../../../context/PreviewContext';
import { gsap, Linear } from "gsap";
import { Expo } from 'gsap/all';

const Page = () => {
  const context = useContext(MsgContext);
  if (!context) {
    throw new Error("context not present");
  }
  
  const Previewcontext = useContext(PreviewContext);
  if (!Previewcontext) {
    throw new Error("context not defined");
  }

  const { preview, setPreview } = Previewcontext;
  const { message, setMessage } = context;

  const [userInput, setUserInput] = useState("");
  const codeViewRef = useRef(null);
  
  const followUpChat = () => {
    if (userInput.length > 2) {
      setMessage((prev) => [
        ...(Array.isArray(prev) ? prev : []), 
        {
          role: "ai",
          msg: userInput,
        },
      ]);
      setUserInput("");
    } else {
      alert("empty input fields");
    }
  };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && !event.shiftKey && userInput.length>1) {
        event.preventDefault(); 
        followUpChat();
      }
    };
    

  useEffect(() => {
    gsap.set(codeViewRef.current,{
      x:"100%",
     })
   if(message.length == 2){

     gsap.set(codeViewRef.current,{
       x:"100%",
      })
      gsap.to(codeViewRef.current,{
        x:"0%",
      })
    }
  }, [message.length])
  


  return (
    <div className="w-full overflow-hidden bg-[#FCFCF9] relative overflow-y-auto h-full rounded-lg">
      <div className="w-full flex items-center py-3 px-5 border-b-[1px] border-black/10 justify-between">
        <div className="flex gap-1 f4 text-xs opacity-70 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="1" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="tabler-icon tabler-icon-clock-hour-5 shrink-0 size-4">
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
            <path d="M12 12l2 3"></path>
            <path d="M12 7v5"></path>
          </svg>
          <h1>Now</h1>
        </div>
      </div>
      
      <div className="w-full relative flex">
        <div className="w-[40%] h-full"></div>

        <div className="w-[60%] full">
          {/* {message.length > 1 && ( */}
            <div  ref={codeViewRef}>
              <div className="w-full py-2">
                <div className="w-[15%] h-full border-[2px] text-sm flex items-center justify-between px-[5px] py-[2px] rounded-full">
                  <h1 onClick={() => setPreview("code")} className={`${preview === "code" && "bg-cyan-900 rounded-full text-white"} px-2 py-[2px]`}>code</h1>
                  <h1 onClick={() => setPreview("preview")} className={`${preview === "preview" && "bg-cyan-900 rounded-full text-white"} px-2 py-[2px]`}>preview</h1>
                </div>
              </div>
              <div >
                <Codeview />
              </div>
            </div>
          {/* )} */}
        </div>
      </div>

      <div className="absolute bg-[#F3F3EE] bottom-10 left-[15%] w-[45%] p-2 rounded-full">
        <div className="w-full px-5 h-14 flex justify-between items-center rounded-full border-[#d3d3d1] border-[2px] bg-[#FCFCF9]">
          <div className="flex items-center gap-3">
            <div className="w-8 p-[2px] h-8 rounded-full border-[1px] border-[#d3d3d1] flex items-center">
              <svg className="opacity-70" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 4l3 3l-3 3"></path>
                <path d="M18 20l3 -3l-3 -3"></path>
                <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"></path>
                <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3"></path>
              </svg>
            </div>
            <input
             onChange={(e) => setUserInput(e.target.value)}
             onKeyDown={handleKeyDown} 
             value={userInput} className="f4 outline-none text-cyan-950/90" type="text" placeholder="Ask follow up..." />
          </div>
          <div className="flex items-center gap-3">
            <div 
            onClick={followUpChat} 
            className="bg-[#EEEEEA] w-7 h-7 rounded-full flex items-center justify-center">
              <svg className="opacity-70" width="14" height="14" aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-up" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path fill="currentColor" d="M209.4 39.4C204.8 34.7 198.6 32 192 32s-12.8 2.7-17.4 7.4l-168 176c-9.2 9.6-8.8 24.8 .8 33.9s24.8 8.8 33.9-.8L168 115.9 168 456c0 13.3 10.7 24 24 24s24-10.7 24-24l0-340.1L342.6 248.6c9.2 9.6 24.3 9.9 33.9 .8s9.9-24.3 .8-33.9l-168-176z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;