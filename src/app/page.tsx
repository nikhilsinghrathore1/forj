"use client";

import React, { useContext, useState } from "react";
import { FaGg } from "react-icons/fa";
import { MsgContext } from "../../context/MsgContext";
import { redirect } from "next/navigation";
import NavLink from "../../components/NavLinks.";
import { RiContractLeftLine } from "react-icons/ri";
import LandingNavbar from "./Landing/Components/LandingNavbar"



export default function Home() {
  const startChat = () => {
    setMessage([{ msg: prompt, role: "user" }]);
    redirect("/newGenerating");
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey && prompt.length > 1) {
      event.preventDefault();
      startChat();
    }
  };
  
  const { setMessage } = useContext(MsgContext);

  const [prompt, setprompt] = useState("");

  return (
    <div className='bg-[#FFFFFA] h-fit relative w-full'>
      <LandingNavbar/>
      {/* outer div */}
      <div className='w-full h-[93vh] flex items-end justify-center relative '>
    {/* inner div */}
          <div className='w-[94%] pt-6 h-[87%] bg-[#F2F2E8] rounded-[20px] flex flex-col items-center justify-center'>
    {/* main heading */}
            <div className='w-full f19 text-[6.2rem] text-[#213130]  leading-[6.8rem] text-center'>
              <h1>Your products,</h1>
              <h1>everywhere</h1>
            </div>
    {/* input div */}
      <div className='f18  w-full text-center text-[#515E5B] mt-10'>
          <p className='text-lg'>Plan, create, and share content with the most flexible social media toolkit.</p>
          {/* input area */}
          <div className='flex mt-10 mb-8 items-center justify-center w-full  gap-2'>

            {/* input field */}
            <div className='w-[32%] shadow-xl shadow-black/10 px-5 bg-[#FFFFFA]  duration-200   f18 py-[16px] rounded-full border-[1px] text-lg border-black'>
                    <input onKeyDown={handleKeyDown} onChange={(e)=>setprompt(e.target.value)} className='w-full h-full outline-none' type="text" placeholder='vibe code...' />                             
            </div>

            <div className='px-5 w-[15%] bg-[#B0EC9C] flex items-center gap-2 justify-center f18 py-[16px] rounded-full border-[1px]   text-lg border-black '>
                                             Get started now
                                             <svg className="ButtonBrand_icon__mayHb" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M11.47 4.47a.75.75 0 0 1 1.06 0l7 7a.75.75 0 0 1 0 1.06l-7 7a.75.75 0 1 1-1.06-1.06l5.72-5.72H5a.75.75 0 0 1 0-1.5h12.19l-5.72-5.72a.75.75 0 0 1 0-1.06Z"></path></svg>
            </div>
          </div>

          <p className='opacity-70'>By entering your email, you agree to receive emails from Anon.</p>

      </div>
      {/* absolute images */}
      <div className='absolute top-[19%] -left-[1%] w-[290px] '>
        <img src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-schedule.webp&w=640&q=75" alt="not showing" />
      </div>
      <div className='absolute top-[27%] right-[1%] w-[260px] '>
        <img src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-add-images.webp&w=640&q=75" alt="not showing" />
      </div>
      <div className='absolute top-[58%] left-[1%] w-[300px] '>
        <img src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-analyze.webp&w=640&q=75" alt="not showing" />
      </div>

      <div className='absolute bottom-[0%] right-[6%] w-[210px] '>
        <img src="https://buffer.com/_next/image?url=%2Fstatic%2Fimages%2Fhomepage%2Fhero-tag.webp&w=640&q=75" alt="not showing" />
      </div>

          </div>
      </div>
      </div>

  );
}
