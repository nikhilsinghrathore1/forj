"use client"

import Image from "next/image";

;
import { BsStars } from "react-icons/bs";
import { IoIosUnlock } from "react-icons/io"
import { GoDatabase } from "react-icons/go";
import { FiExternalLink } from 'react-icons/fi'

import { RiExchange2Fill } from "react-icons/ri";
import { TbChartDots } from "react-icons/tb";
import Navbar from "../../../components/Navbar";
export default function Home() {               

               
 return (
  <div className=  "bg-white f16  relative ">

{/* navbar section   */}
    <div className="fixed flex items-center gap-2  bottom-10 right-5 px-4 py-3 rounded-full bg-black text-gray-100 ">
      <h1>Ask AI</h1>
      <BsStars className="text-xl"/>
    </div>
  <Navbar/>


 

  <div className="w-full h-[70vh]   flex flex-col  items-center justify-end  ">
        <Image src='https://block.github.io/goose/img/logo_light.png' width={120} height={120} alt="not showing"/>
        <div className="text-[2.2rem] -mt-2 leading-[1.85rem] text-center f16u">
          <h1>codename</h1>
          <h1>goose</h1>
        </div>

        <div className="text-[1.7rem] f16 font-light opacity-80 leading-[2.3rem] mt-8 text-center">
          <p>Your on-machine AI agent , automating</p>
          <p>engineering tasks seamlessly.</p>
        </div>

        <div className="px-5 py-2 mt-5 bg-black text-white rounded-full flex items-center justify-center f16 ">
          meow meow
        </div>




  </div>

  <div className="w-full h-screen flex items-center justify-center">
    <video 
      className="w-full h-full "
      autoPlay
      muted
      loop
      src="https://block.github.io/goose/assets/medias/hero_light-8a53bf12244a5883e2253ca02c2d6a15.mp4"
      />
  </div>
  


  <div className="w-full h-[40vh] mt-10 flex justify-between px-28">

    {[{logo:IoIosUnlock , heading:"Open Source" , para :"Built with transparency and collaboration in mind, Anon empowers developers to contribute, customize, and innovate freely." } , {logo:GoDatabase , heading:"Runs Locally" , para:"Anon runs locally to execute task efficiently, keeping control in your hands."} , {logo:RiExchange2Fill , heading:"Extensible" , para:"Customize Anon with your preferred LLM and enhance its capabilities by connecting it to any exteranl MCP server or API"} , {logo:TbChartDots , heading :"Autonomous" , para:"Anon Independently handles complex tasks, from debugging to deployment, freeing you to focus on what matters most."}].map((e,i)=>(

      
      <div key={i} className="w-[21%] tracking-wide h-full flex flex-col items-start gap-1 ">
        <e.logo className="size-10"/>
        <h1 className="f2 text-2xl leading-none">Open Source</h1>
        <p className="f16 text-md mt-6">Built with transparency and collaboration in mind, Anon empowers developers to contribute, customize, and innovate freely.</p>
    </div>
    ))}
  

  </div>
  
    {/* loved my engineers section */}

  <div className="w-full px-28 ">
          <div className="w-full text-center f16">
            <h1>Loved by engineers</h1>
          </div>

          <div className="w-full px-10 mt-10 flex items-center justify-between gap-10 flex-wrap ">
            <div className="w-[45%] h-[25vh] f16 flex flex-col items-start ">
              <p>With Anon, i feel i am Maverick, Thanks a ton for creating this.🙏 I have been having way too much fun today. </p>
              <div className="flex items-center mt-5 gap-2">
                <div className="w-14 h-14 rounded-full bg-red-400"></div>
                <div>
                  <h1 className="f2">Prem Pillai</h1>
                  <h2 className="f16 text-sm">software Engineer</h2>
                </div>
              </div>
            </div>

            <div className="w-[45%] h-[25vh] f16 flex flex-col items-start ">
              <p>I wanted to construct some fake data for an API with a large request body and business rules I haven't memorized. So I told Goose which object to update and a test to run that calls the vendor. Got it to use the errors descriptions from the vendor response to keep correcting the request until it was successful. So good!</p>
              <div className="flex items-center mt-5 gap-2">
                <div className="w-14 h-14 rounded-full bg-red-400"></div>
                <div>
                  <h1 className="f2">Prem Pillai</h1>
                  <h2 className="f16 text-sm">software Engineer</h2>
                </div>
              </div>
            </div>
            <div className="w-[45%] h-[25vh] mt-5 f16 flex flex-col items-start ">
              <p>I asked Goose to write up a few Google Scripts that mimic Clockwise's functionality (particularly, creating blocks on my work calendar based on events in my personal calendar, as well as color-coding calendar entries based on type and importance). Took me under an hour. If you haven't tried Goose yet, I highly encourage you to do so!</p>
              <div className="flex items-center mt-5 gap-2">
                <div className="w-14 h-14 rounded-full bg-red-400"></div>
                <div>
                  <h1 className="f2">Prem Pillai</h1>
                  <h2 className="f16 text-sm">software Engineer</h2>
                </div>
              </div>
            </div>
            <div className="w-[45%] h-[25vh] mt-5 f16 flex flex-col items-start ">
              <p>If anyone was looking for another reason to check it out: I just asked Goose to break a string-array into individual string resources across eleven localizations, and it performed amazingly well and saved me a bunch of time doing it manually or figuring out some way to semi-automate it.</p>
              <div className="flex items-center mt-5 gap-2">
                <div className="w-14 h-14 rounded-full bg-red-400"></div>
                <div>
                  <h1 className="f2">Prem Pillai</h1>
                  <h2 className="f16 text-sm">software Engineer</h2>
                </div>
              </div>
            </div>
          </div>
  </div>

  {/* this is the footer section  */}

  <div className="w-full mt-32 border-t-[1px] px-28 py-5 border-black">

    <div className="w-[70%] flex items-start justify-between">
      <div className="flex flex-col ">
        <h1 className="f2 text-lg">Quick Links</h1>
        <div className="flex mt-5 f16 flex-col gap-2">
          <h1>try ANON</h1>
          <h1>Extension</h1>
        </div>
      </div>
      <div className="flex flex-col ">
        <h1 className="f2 text-lg">community</h1>
        <div className="flex mt-5 f16 flex-col gap-2">
          <div className="flex items-center gap-1">

          <h1>discord</h1>
          <FiExternalLink/>
          </div>
          <div className="flex items-center gap-1">

          <h1>Youtube</h1>
          <FiExternalLink/>
          </div>
          <div className="flex items-center gap-1">

          <h1>LinkedIn</h1>
          <FiExternalLink/>
          </div>
          <div className="flex items-center gap-1">

          <h1>Twitter</h1>
          <FiExternalLink/>
          </div>
     
        </div>
      </div>
      <div className="flex flex-col ">
        <h1 className="f2 text-lg">more</h1>
        <div className="flex mt-5 f16 flex-col gap-2">
          <h1>Blog</h1>
        <div className="flex items-center gap-1">

<h1>Github</h1>
<FiExternalLink/>
</div>
         
          
        </div>
      </div>
    </div>

    <div className="w-full text-center pt-5 pb-2">
        <h1>Copyright © 2025 Block, Inc.</h1>
    </div>
    
  </div>

  </div>

  );
}
