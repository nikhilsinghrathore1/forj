"use client";
import { atomDark } from "@codesandbox/sandpack-themes";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

import {
  spawn,
  message,
  createDataItemSigner,
  result
} from "@permaweb/aoconnect"

const AOModule = "Do_Uc2Sju_ffp6Ev0AnLVdPtot15rvMjP-a9VVaA5fM"; // aos 2.0.1
const AOScheduler = "_GQ33BkPtZrqxA84vM8Zk-N2aO0toNNu_C-l-rawrBA";
const CommonTags = [
  { name: "Name", value: "Anon" },
  { name: "Version", value: "0.2.1" },
];

import React, { useContext, useRef, useState, useEffect } from "react";
import { PreviewContext } from "../context/PreviewContext";
import Extra from "../data/Extra";
import { MsgContext } from "../context/MsgContext";
import axios from "axios";
import Extras from "../data/Extras";
import { RunLuaContextt } from "../context/LuaContext";
import { json } from "stream/consumers";

// Professional Loading Component
const ProfessionalLoader = () => {
  const [progress, setProgress] = useState(0);

  const scrollingMessages = [
    "Initializing workspace environment...",
    "Installing required dependencies...",
    "Configuring build tools...",
    "Setting up development server...",
    "Generating project structure...",
    "Applying styling frameworks...",
    "Analyzing code patterns...",
    "Optimizing performance...",
    "Compiling source files...",
    "Finalizing setup...",
    "Almost ready to code...",
    "Preparing your workspace...",
    "Loading project templates...",
    "Securing connections...",
    "Launching development environment..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + Math.random() * 8, 95));
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-800 text-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div
  style={{ backgroundColor: "#1a1a1a" }}
  className="relative z-10 flex h-full w-full justify-center gap-3 flex-col items-center space-y-8"
>
  {/* Loading Text */}
  <h2 className="text-3xl font-semibold text-white">
    Loading
  </h2>

  {/* Vertical Scrolling Carousel - 30% height */}
  <div className="relative w-96 overflow-hidden" style={{ height: '30vh' }}>
    {/* Fade gradient at top */}
    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-800 to-transparent z-10"></div>
    
    {/* Fade gradient at bottom */}
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-800 to-transparent z-10"></div>
    
    {/* Scrolling content */}
    <div className="animate-scroll-up flex flex-col space-y-4 py-16">
      {[...Array(3)].map((_, setIndex) => (
        <div key={setIndex}>
          {scrollingMessages.map((message, index) => (
            <div key={`${setIndex}-${index}`} className="text-center py-3 text-base text-gray-300 font-medium">
              {message}
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
</div>


      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scroll-up {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        
        .animate-scroll-up {
          animation: scroll-up 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export const Codeview = () => {
  // loading logic
  const [progress, setProgress] = useState(0);
  
  
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("context not defined");
  }
  const [files, setfiles] = useState(Extras.DEFAULT_FILE);
  
  
  const lastCalledRefCode = useRef(0);
  const lastProcessedMsgRef = useRef<string | null>(null);

  const { preview } = context;
  const previewRef = useRef(null);
  const [Loading, setLoading] = useState(true);
  
  const msgcontext = useContext(MsgContext);
  if (!msgcontext) {
    throw new Error("context not present");
  }
  const { messages } = msgcontext;
  
  const [previewStyle, setPreviewStyle] = useState({
    transform: "translateX(110vw)",
    opacity: 0,
  });
  
  useEffect(() => {
    setPreviewStyle((prev) => ({
      ...prev,
      transform: preview === false ? "translateX(0)" : "translateX(100vw)",
      opacity: preview === false ? 1 : 0,
      transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
    }));
  }, [preview]);
      
  const GetCode = async () => {
    console.log("runnign the gencode function")
    setLoading(true);
    const PROMPT = messages[messages.length - 1].msg;
    console.log(PROMPT);
    
    try {
      const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/code/genCode`, {
        role: "user",
        prompt: PROMPT,
      });
      console.log(result)

      const aiResp = result.data.resp;
      console.log("this are the airesp files ", aiResp.files);
      const mergedFile = { ...aiResp.files };
      console.log("these are teh merged files ", mergedFile);
      setfiles(mergedFile);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  
 const LuaContext = useContext(RunLuaContextt);  
  if (!LuaContext) {
    throw new Error("context not present");
  }
  const { LuaMsg } = LuaContext 


  useEffect(()=>{
    runLua()
  },[LuaMsg])

  const runLua = async () => {
 
   const pId = await spawnProcess("AnonProcess")
 

 
   const luaFilePaths = [
     '/index.lua',
     '/src/lib/index.lua',
     'index.lua',
   ];
 
   const luaCodeToBeEval: string | undefined = luaFilePaths
   .map((path) => files?.[path])
   .find((code): code is string => typeof code === "string");
 
   if (!luaCodeToBeEval) return;
   //@ts-ignore
   console.log(luaCodeToBeEval.code)
   //@ts-ignore
   if (typeof window === 'undefined' || !window.arweaveWallet) return;
 
   try {



     const messageId = await message({
      //@ts-ignore
       data:`${luaCodeToBeEval.code}`,
       process:pId!,
       tags:  [
         { name: 'Name', value: 'Anon' },
         { name: 'Version', value: '0.2.1' },
         {
           name: 'Authority',
           value: 'fcoN_xJeisVsPXA-trzVAuIiqO3ydLQxM-L4XbrQKzY',
         },
         { name: 'Action', value: 'Eval' },
       ],
       signer: createDataItemSigner(globalThis.arweaveWallet)
     });
 
     const res = await result({
       process: pId!,
       message: messageId,
     });
     console.log(result)
     //@ts-ignore
     res.id = messageId;
 
   } catch (error) {
     console.error('Lua execution error:', error);
   }
 };

 const spawnProcess = async (name: string) => {
  try {
    const allTags = [...CommonTags];
    if (name) {
      allTags.push({ name: "Name", value: name });
    }

    console.log(allTags);

    const processId = await spawn({
      module: AOModule,
      scheduler: AOScheduler,
      //@ts-ignore
      signer: createDataItemSigner(window.arweaveWallet),
      tags: allTags,
    });

    const newExportLine = `\nconst pId = "${processId}";`;

    const existingUtils = files?.["/arweaveUtils.js"];
    const existingUtilsContent = existingUtils?.code;
    
      console.log(files)
      console.log(existingUtilsContent)


    const updatedUtilsContent = existingUtilsContent + newExportLine;

    const updatedFiles = {
      ...files,
      "arweaveUtils.js": {
        code: updatedUtilsContent,
      },
    };

    setfiles(updatedFiles);

    return processId;
  } catch (error) {
    console.error("Error spawning process:", error);
    throw error;
  }
};

  useEffect(() => {
    if (messages?.length > 0) {
      const latest = messages[messages.length - 1];
      const role = latest.role;
      const msgKey = `${latest.role}:${latest.msg}`;

      if (role === "user" && lastProcessedMsgRef.current !== msgKey) {
        const now = Date.now();

        if (now - lastCalledRefCode.current >= 10000) {
          lastCalledRefCode.current = now;
          lastProcessedMsgRef.current = msgKey;
          console.log("Generating code again");
          GetCode();
        } else {
          console.log("Rate limiter active, skipping GetCode call.");
        }
      }
    }
  }, [messages]);

  return (
    <div className="relative w-full h-full">
   
      {Loading ? (
        <ProfessionalLoader />
      ) : (
        <SandpackProvider
          className="relative w-full h-full "
          files={files}
          customSetup={{
            dependencies: {
              ...Extra.DEPENDANCY,
            },
          }}
          options={{
            externalResources: ["https://cdn.tailwindcss.com"],
          }}
          template="react"
        >
          <SandpackLayout>
            <SandpackFileExplorer style={{ height: "93vh" }} />
            <SandpackCodeEditor
              style={{ height: "93vh", fontSize: "12px", lineHeight: "30px" }}
            />
            <div
              className="absolute w-full"
              style={{ ...previewStyle }}
              ref={previewRef}
            >
              <SandpackPreview
                className="absolute w-full"
                ref={previewRef}
                showNavigator={false}
                style={{ height: "93vh" }}
              />
            </div>
          </SandpackLayout>
        </SandpackProvider>
      )}
    </div>
  );
};