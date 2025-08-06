"use client";

import React, { useContext, useState, useEffect } from "react";
import { redirect } from "next/navigation";
import LocomotiveScroll from "locomotive-scroll";
import { MsgContext } from "../../../../context/MsgContext";
import LandingNavbar from "./LandingNavbar";
import HoriCards from "./HoriCards";
import ExpandedComp from "./ExpandedComp";
import VerticalExpand from "./VerticalExpand";
import img1 from "../../../../public/hero1.webp"
import img2 from "../../../../public/hero2.webp"
import img3 from "../../../../public/hero3.webp"
import img4 from "../../../../public/hero4.webp"
import Image from "next/image";
import useSpeechToText from "react-hook-speech-to-text";

export default function Home() {
  const locomotiveScroll = new LocomotiveScroll();
  const { setMessage } = useContext(MsgContext);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });

  const startChat = () => {
    const finalTranscript = results.map(result => result.transcript).join(' ');
    if (finalTranscript.trim().length > 0) {
      setMessage([{ msg: finalTranscript, role: "user" }]);
      console.log("saving audio done ");
      redirect("/newGenerating");
    }
  };

  const handleVoiceInput = () => {
    if (isRecording) {
      stopSpeechToText();
      setShowNotification(true);
      setIsLoading(true);
      
      setTimeout(() => {
        setShowNotification(false);
        startChat();
        setIsLoading(false);
      }, 1500);
    } else {
      setResults([]);
      startSpeechToText();
    }
  };

  // Get the current transcript with proper fallback
  const currentTranscript = results.map(result => result.transcript).join(' ') + (interimResult || '');

  const getDisplayText = () => {
    if (isLoading) {
      return "Building your dApp...";
    }
    if (isRecording) {
      return currentTranscript.trim() || "Listening for your dApp idea...";
    }
    return currentTranscript.trim() || "Describe the dApp you want to build...";
  };

  const getTextColor = () => {
    if (isLoading) return "text-blue-600";
    if (isRecording) return "text-red-500";
    return "text-gray-500";
  };

  return (
    <div className="bg-[#FFFFFA] h-fit relative w-full">
      <LandingNavbar />
      
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          dApp idea captured! 🚀
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-lg font-medium text-gray-700">Processing your request...</p>
            <p className="text-sm text-gray-500">Please wait while we prepare your chat</p>
          </div>
        </div>
      )}

      {/* outer div */}
      <div className="w-full h-[93vh] flex items-end justify-center relative ">
        {/* inner div */}
        <div className="w-[94%] pt-6 h-[87%] bg-[#F2F2E8] rounded-[20px] flex flex-col items-center justify-center">
          {/* main heading */}
          <div className="w-full f19 text-[6.2rem] text-[#213130]  leading-[6.8rem] text-center">
            <h1>Build dApps with</h1>
            <h1>your voice</h1>
          </div>
          {/* input div */}
          <div className="f18  w-full text-center text-[#515E5B] mt-10">
            <p className="text-lg">
              Speak your ideas and watch them transform into powerful decentralized applications.
            </p>
            {/* voice input area */}
            <div className="flex mt-10 mb-8 items-center justify-center w-full  gap-2">
              {/* voice input display */}
              <div className="w-[32%] shadow-xl shadow-black/10 px-5 bg-[#FFFFFA]  duration-200   f18 py-[16px] rounded-full border-[1px] text-lg border-black">
                <div className="w-full h-full outline-none flex items-center">
                  {isRecording && (
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse mr-2"></div>
                  )}
                  {isLoading && (
                    <div className="w-3 h-3 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mr-2"></div>
                  )}
                  <span className={getTextColor()}>
                    {getDisplayText()}
                  </span>
                </div>
              </div>

              <button
                onClick={handleVoiceInput}
                disabled={isLoading}
                className={`px-5 w-[15%] ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : isRecording 
                      ? 'bg-red-400 hover:bg-red-500' 
                      : 'bg-[#B0EC9C] hover:bg-green-400'
                } flex items-center gap-2 justify-center f18 py-[16px] rounded-full border-[1px] text-lg border-black transition-colors duration-200`}
              >
                {isLoading ? (
                  <>
                    Building dApp...
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </>
                ) : isRecording ? (
                  <>
                    Stop Recording
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                  </>
                ) : (
                  <>
                    Start Recording
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <line x1="8" y1="23" x2="16" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                )}
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mb-4">
                Voice input error: {error}
              </p>
            )}

            <p className="opacity-70">
              By entering your request, you agree to terms and services of Forj.
            </p>
          </div>
          {/* absolute images */}
          <div className="absolute top-[19%] -left-[1%] w-[290px] ">
            <Image
              src={img1}
              alt="not showing"
            />
          </div>
          <div className="absolute top-[27%] right-[1%] w-[260px] ">
            <Image
              src={img2}
              alt="not showing"
            />
          </div>
          <div className="absolute top-[58%] left-[1%] w-[300px] ">
            <Image
              src={img3}
              alt="not showing"
            />
          </div>

          <div className="absolute bottom-[0%] right-[6%] w-[210px] ">
            <Image
              src={img4}
              alt="not showing"
            />
          </div>
        </div>
      </div>

      {/* second section */}

      <div className="w-full h-[30vh] flex items-center gap-10 justify-center ">
        <HoriCards mainText={"182738"} subtext={"Token Limit"} />
        <HoriCards
          mainText={"7,858,881"}
          subtext={"products created last month"}
        />
        <HoriCards mainText={"4"} subtext={"languages supported"} />
      </div>

      {/* third section  */}
     
    </div>
  );
}