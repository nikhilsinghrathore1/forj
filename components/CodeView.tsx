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
  createSigner,
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
    setLoading(true);
    const PROMPT = messages[messages.length - 1].msg;
    console.log(PROMPT);
    
    try {
      const result = await axios.post(`https://anon-backend-1yz9.onrender.com/code/genCode`, {
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
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black  text-white">
          <div className="flex items-center gap-4 animate-pulse ">
            <p className="text-lg animate-pulse mb-6">
              Your files are loading...
            </p>
            <div
              style={{
                width: "20px",
                height: "20px",
                border: "4px solid white",
                animation: "spin 3s linear infinite",
              }}
            ></div>
          </div>
        </div>
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

