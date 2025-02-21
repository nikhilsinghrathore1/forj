"use client"
import React, { useContext, useState } from "react";
import { useRouter } from 'next/router'
import { FaGg } from "react-icons/fa";
import Link from "next/link";

import { MsgContext } from "../../context/MsgContext";
import { redirect } from "next/navigation";
import { PreviewContext } from "../../context/PreviewContext";

export default function Home() {

 
  const startChat = () => {
    setMessage([{ msg: prompt, role: "user" }]);

    setTimeout(() => {
      redirect('/luaBackend');

    }, 100);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && prompt.length>1) {
      event.preventDefault(); 
      startChat();
    }
  };
  
  const {setMessage} = useContext(MsgContext)

  const [prompt, setprompt] = useState("")



  return (
    <div className="w-full h-full relative rounded-lg bg-[#FCFCF9] flex flex-col items-center justify-center">
      <h1 className="text-[35px]  text-cyan-950 mb-7 f4 text">What do you want to build?</h1>
        <div className="w-full flex justify-center">
          <div className="w-[48%] border-[#d3d3d1] border-[3px] p-2 rounded-lg flex-col ">
            {/* textarea */}
            <div className="w-full h-16 ">
              <textarea 
              value={prompt}
              onChange={(e)=>setprompt(e.target.value)} 
              onKeyDown={handleKeyDown}
              className="w-full px-2 bg-transparent f11 text-sm h-full resize-none outline-none" 
              placeholder="build anything..."/>
            </div>
            {/* below textarea */}
            <div className="w-full py-1 px-2 flex items-center justify-between">

              <div className="flex items-center gap-5">
                {/* fist auto thingy */}
                              <div  className="px-[7px] text-sm flex items-center gap-[6px] py-[2px] border-[1px] f4 border-gray-300 rounded">
                              <svg className="opacity-70 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" class="tabler-icon tabler-icon-arrows-shuffle shrink-0"><path d="M18 4l3 3l-3 3"></path><path d="M18 20l3 -3l-3 -3"></path><path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"></path><path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3"></path></svg>
                              <h1 className="opacity-70 cursor-default">Auto</h1>
                              <svg className="opacity-70 cursor-pointer" width="12" height="12"  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>
                              </div>
                {/*  */}
                <div>
                <svg className="opacity-80" width="16" height="16"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.875" stroke-linecap="round" stroke-linejoin="round" ><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path><path d="M3.6 9h16.8"></path><path d="M3.6 15h16.8"></path><path d="M11.5 3a17 17 0 0 0 0 18"></path><path d="M12.5 3a17 17 0 0 1 0 18"></path></svg>
                </div>

              </div>

              <div className="flex items-center gap-5">
                {/* svg icon */}
                <div>
                <svg width="16" height="16" aria-hidden="true" focusable="false" data-prefix="far" data-icon="paperclip"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M375 73c-26-26-68.1-26-94.1 0L89 265C45.3 308.6 45.3 379.4 89 423s114.4 43.6 158.1 0L399 271c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L281 457c-62.4 62.4-163.5 62.4-225.9 0S-7.4 293.4 55 231L247 39C291.7-5.7 364.3-5.7 409 39s44.7 117.2 0 161.9L225.2 384.7c-31.6 31.6-83.6 28.7-111.5-6.2c-23.8-29.8-21.5-72.8 5.5-99.8L271 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L153.2 312.7c-9.7 9.7-10.6 25.1-2 35.8c10 12.5 28.7 13.6 40 2.2L375 167c26-26 26-68.1 0-94.1z"></path></svg>
                </div>

                <div onClick={startChat} className="w-8 h-8 rounded-full bg-[#EEEEEA] flex items-center justify-center">
                <svg className="opacity-70" height="14" width="14" aria-hidden="true" focusable="false" data-prefix="far" data-icon="arrow-right"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"></path></svg>
                </div>


              </div>
            </div>
          </div>

        </div>
        <div className="w-[48%] relative pl-3 overflow-hidden mt-5 bg-[#F5F5F1] py-2 border rounded-lg flex ">
          <div className="flex items-center gap-4">
              <div className="p-1 rounded bg-[#EDEDE9] flex items-center justify-center ">
            <FaGg className="text-xl"/>
              </div>
            <div className="flex flex-col f4">
              <h1 className="text-sm text-cyan-800 ">Introducing the deep research</h1>
              <p className="text-xs opacity-70 w-[80%]">the most powerfull way to conduct in-depth research and analysis.</p>
            </div>
          </div>
          <div className="w-[30%] absolute right-5">
            <img  className="w-full scale-125  object-contain" src="https://r2cdn.perplexity.ai/deep_research_light_2.png" alt="not showing" />
          </div>
        </div>
        <div className="w-full f11 opacity-70 text-sm flex items-center justify-center gap-6 absolute bottom-3 ">
          <h1>Pro</h1>
          <h1>Enterprise</h1>
          <h1>Store</h1>
          <h1>Blog</h1>
          <h1>Career</h1>
          <h1>Education</h1>
          <h1>Finance</h1>
          <h1>English</h1>
        </div>
    </div>
  );
}
