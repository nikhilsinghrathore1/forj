"use client";

import React, { useContext, useState } from "react";
import { FaGg } from "react-icons/fa";
import { MsgContext } from "../../context/MsgContext";
import { redirect } from "next/navigation";
import NavLink from "../../components/NavLinks.";
import { RiContractLeftLine } from "react-icons/ri";



export default function Home() {
  const startChat = () => {
    setMessage([{ msg: prompt, role: "user" }]);
    redirect("/newGenerating");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && prompt.length > 1) {
      event.preventDefault();
      startChat();
    }
  };
  const { setMessage } = useContext(MsgContext);

  const [prompt, setprompt] = useState("");

  return (
    <div className="w-full h-full flex overflow-hidden bg-[#202222] text-[#888C8C] ">
      {/* side nav bar  */}
      <div className="h-full w-[14%] relative flex flex-col py-5 pl-5 pr-2 ">
      {/* logo */}
      <div className="flex transition-all duration-200 hover:text-cyan-600 gap-1 items-center relative w-full text-[#E8E8E6] text-2xl f11 ">
        <FaGg className="text-3xl text-cyan-700 hover:text-cyan-500" />
        <h1 className="tracking-tight">ANON</h1>
        <div className="absolute top-1/2 right-2 text-lg opacity-70 -translate-y-1/2">
          <RiContractLeftLine />
        </div>
      </div>
      {/* new thread */}

      
      <div className="w-full mt-8 mb-7 hover:border-cyan-500 border-[#d3d3d1]/20 border-[1px] transition-all duration-200 text-sm f4  opacity-70 items-center justify-between px-5 rounded-full py-[6px] bg-[#191A1A] flex">
        <h1>New Thread</h1>
        <div className="flex  gap-1">
          <span className="px-[2px] text-xs py-[2px] border-[1px] f7 border-gray-300/30 hover:border-cyan-500 rounded">
            Ctrl
          </span>
          <span className="px-[2px] text-xs py-[2px] border-[1px] f7 border-gray-300/30 hover:border-cyan-500 rounded">
            I
          </span>
        </div>
      </div>

      {/* links Section */}
      <NavLink />

      <div className=" flex flex-col absolute bottom-10 px-3 left-0  gap-[6px] w-full">
        <div className="flex cursor-pointer bg-[#202222] hover:bg-[#417980] duration-200 text-white f10 items-center justify-center w-full p-2 rounded-lg">
          Connect wallet
        </div>
        <div className="flex cursor-pointer bg-[#2D2F2F] text-[#E8E8E6] f11 items-center justify-center w-full p-2 rounded-lg f10">
          Docs
        </div>
      </div>
    </div>
              <div className="w-[86%]  overflow-hidden h-full py-2 px-[5px]">

    <div className="w-full h-full border-l-[1px] border-white/10 relative rounded-lg pt-16 bg-[#191A1A] flex flex-col items-center justify-center">
      <h1 className="text-[35px]  text-[#E8E8E6] mb-7  f4 text">
        What do you want to build?
      </h1>
      <div className="w-full flex justify-center">
        <div className="w-[48%] bg-[#202222] backdrop: border-[#d3d3d1]/10 border-[3px] relative p-2 rounded-lg flex-col ">
          {/* textarea */}
          <div className="w-full h-14   ">
            <textarea
              value={prompt}
              onChange={(e) => setprompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-2 bg-transparent f11 text-sm h-full resize-none outline-none"
              placeholder="build anything..."
            />
          </div>
          {/* below textarea */}
          <div className="w-full py-1 px-2 flex items-center justify-between">
            <div className="flex items-center gap-5">
              {/* fist auto thingy */}
              <div className="px-[7px] text-sm flex items-center gap-[6px] py-[2px] border-[1px] f4 border-gray-300/20 rounded">
                <svg
                  className="opacity-70 cursor-pointer"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.875"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 4l3 3l-3 3"></path>
                  <path d="M18 20l3 -3l-3 -3"></path>
                  <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"></path>
                  <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3"></path>
                </svg>
                <h1 className="opacity-70 cursor-default">Auto</h1>
                <svg
                  className="opacity-70 cursor-pointer"
                  width="12"
                  height="12"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="chevron-down"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"
                  ></path>
                </svg>
              </div>
              {/*  */}
              <div>
                <svg
                  className="opacity-80"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.875"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                  <path d="M3.6 9h16.8"></path>
                  <path d="M3.6 15h16.8"></path>
                  <path d="M11.5 3a17 17 0 0 0 0 18"></path>
                  <path d="M12.5 3a17 17 0 0 1 0 18"></path>
                </svg>
              </div>
            </div>

            <div className="flex items-center gap-5">
              {/* svg icon */}
              <div>
                <svg
                  width="16"
                  height="16"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="paperclip"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M375 73c-26-26-68.1-26-94.1 0L89 265C45.3 308.6 45.3 379.4 89 423s114.4 43.6 158.1 0L399 271c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L281 457c-62.4 62.4-163.5 62.4-225.9 0S-7.4 293.4 55 231L247 39C291.7-5.7 364.3-5.7 409 39s44.7 117.2 0 161.9L225.2 384.7c-31.6 31.6-83.6 28.7-111.5-6.2c-23.8-29.8-21.5-72.8 5.5-99.8L271 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L153.2 312.7c-9.7 9.7-10.6 25.1-2 35.8c10 12.5 28.7 13.6 40 2.2L375 167c26-26 26-68.1 0-94.1z"
                  ></path>
                </svg>
              </div>

              <div
                onClick={startChat}
                className="w-8 h-8 rounded-full bg-[#2F302F] flex items-center justify-center"
              >
                <svg
                  className="opacity-70"
                  height="14"
                  width="14"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="far"
                  data-icon="arrow-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M440.6 273.4c4.7-4.5 7.4-10.8 7.4-17.4s-2.7-12.8-7.4-17.4l-176-168c-9.6-9.2-24.8-8.8-33.9 .8s-8.8 24.8 .8 33.9L364.1 232 24 232c-13.3 0-24 10.7-24 24s10.7 24 24 24l340.1 0L231.4 406.6c-9.6 9.2-9.9 24.3-.8 33.9s24.3 9.9 33.9 .8l176-168z"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[48%] relative pl-3 overflow-hidden mt-5 bg-[#202222] py-2 border-black/20 border rounded-lg flex ">
        <div className="flex items-center gap-4">
          <div className="p-1 rounded bg-[#EDEDE9] flex items-center justify-center ">
            <FaGg className="text-xl" />
          </div>
          <div className="flex flex-col f4">
            <h1 className="text-sm text-[#E8E8E6] ">
              Introducing the deep research
            </h1>
            <p className="text-xs opacity-90 w-[80%]">
              the most powerfull way to conduct in-depth research and analysis.
            </p>
          </div>
        </div>
        <div className="w-[30%] absolute right-5">
          <img
            className="w-full scale-125  object-contain"
            src="https://r2cdn.perplexity.ai/deep_research_dark_3.jpeg"
            alt="not showing"
          />
        </div>
      </div>
      
      <div className="w-[48%] relative   overflow-hidden mt-2   border-black/20 border rounded-lg flex items-center gap-2 ">
            <div className="w-[32%] py-2 px-3 gap-1 rounded-lg h-full bg-[#202222] flex flex-col ">
              <div className="w-full items-center gap-1 h-1/2 flex">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8D9191" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l18 0"></path><path d="M3 10l18 0"></path><path d="M5 6l7 -3l7 3"></path><path d="M4 10l0 11"></path><path d="M20 10l0 11"></path><path d="M8 14l0 3"></path><path d="M12 14l0 3"></path><path d="M16 14l0 3"></path></svg>

              <h1 className="text-sm">history</h1>
              </div>
              <div className="w-full items-center gap-1 h-1/2 flex">

                <h1 className="text-[12px] text-[#E8E8E6] f11 ">see your build history</h1>
              </div>

            </div>
            <div className="w-[32%] py-2 px-3 gap-1 rounded-lg h-full bg-[#202222] flex flex-col ">
              <div className="w-full items-center gap-1 h-1/2 flex">
              <svg width="13" height="13" aria-hidden="true" focusable="false" data-prefix="far" data-icon="gear"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0c17 0 33.6 1.7 49.8 4.8c7.9 1.5 21.8 6.1 29.4 20.1c2 3.7 3.6 7.6 4.6 11.8l9.3 38.5C350.5 81 360.3 86.7 366 85l38-11.2c4-1.2 8.1-1.8 12.2-1.9c16.1-.5 27 9.4 32.3 15.4c22.1 25.1 39.1 54.6 49.9 86.3c2.6 7.6 5.6 21.8-2.7 35.4c-2.2 3.6-4.9 7-8 10L459 246.3c-4.2 4-4.2 15.5 0 19.5l28.7 27.3c3.1 3 5.8 6.4 8 10c8.2 13.6 5.2 27.8 2.7 35.4c-10.8 31.7-27.8 61.1-49.9 86.3c-5.3 6-16.3 15.9-32.3 15.4c-4.1-.1-8.2-.8-12.2-1.9L366 427c-5.7-1.7-15.5 4-16.9 9.8l-9.3 38.5c-1 4.2-2.6 8.2-4.6 11.8c-7.7 14-21.6 18.5-29.4 20.1C289.6 510.3 273 512 256 512s-33.6-1.7-49.8-4.8c-7.9-1.5-21.8-6.1-29.4-20.1c-2-3.7-3.6-7.6-4.6-11.8l-9.3-38.5c-1.4-5.8-11.2-11.5-16.9-9.8l-38 11.2c-4 1.2-8.1 1.8-12.2 1.9c-16.1 .5-27-9.4-32.3-15.4c-22-25.1-39.1-54.6-49.9-86.3c-2.6-7.6-5.6-21.8 2.7-35.4c2.2-3.6 4.9-7 8-10L53 265.7c4.2-4 4.2-15.5 0-19.5L24.2 218.9c-3.1-3-5.8-6.4-8-10C8 195.3 11 181.1 13.6 173.6c10.8-31.7 27.8-61.1 49.9-86.3c5.3-6 16.3-15.9 32.3-15.4c4.1 .1 8.2 .8 12.2 1.9L146 85c5.7 1.7 15.5-4 16.9-9.8l9.3-38.5c1-4.2 2.6-8.2 4.6-11.8c7.7-14 21.6-18.5 29.4-20.1C222.4 1.7 239 0 256 0zM218.1 51.4l-8.5 35.1c-7.8 32.3-45.3 53.9-77.2 44.6L97.9 120.9c-16.5 19.3-29.5 41.7-38 65.7l26.2 24.9c24 22.8 24 66.2 0 89L59.9 325.4c8.5 24 21.5 46.4 38 65.7l34.6-10.2c31.8-9.4 69.4 12.3 77.2 44.6l8.5 35.1c24.6 4.5 51.3 4.5 75.9 0l8.5-35.1c7.8-32.3 45.3-53.9 77.2-44.6l34.6 10.2c16.5-19.3 29.5-41.7 38-65.7l-26.2-24.9c-24-22.8-24-66.2 0-89l26.2-24.9c-8.5-24-21.5-46.4-38-65.7l-34.6 10.2c-31.8 9.4-69.4-12.3-77.2-44.6l-8.5-35.1c-24.6-4.5-51.3-4.5-75.9 0zM208 256a48 48 0 1 0 96 0 48 48 0 1 0 -96 0zm48 96a96 96 0 1 1 0-192 96 96 0 1 1 0 192z"></path></svg>
              <h1 className="text-sm">Setting</h1>
              </div>
              <div className="w-full items-center gap-1 h-1/2 flex">

                <h1 className="text-[12px] text-[#E8E8E6] f11 ">open your settings</h1>
              </div>

            </div>
            <div className="w-[32%] py-2 px-3 gap-1 rounded-lg h-full bg-[#202222] flex flex-col ">
              <div className="w-full items-center gap-1 h-1/2 flex">
              <h1 className="text-sm">Try Pro</h1>
              </div>
              <div className="w-full items-center  h-1/2 flex">

                <h1 className="text-[12px] text-[#E8E8E6] f11 ">try pro for free</h1>
              </div>

            </div>
      </div>

      <div className="w-full f11 opacity-90 text-sm flex items-center justify-center gap-6 absolute bottom-3 ">
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
    </div>
    </div>
  );
}
