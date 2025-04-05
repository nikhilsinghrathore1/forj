"use client";
import { atomDark  } from "@codesandbox/sandpack-themes";

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import React, { useContext, useRef, useState, useEffect } from "react";
import { PreviewContext } from "../context/PreviewContext";
import Extra from "../data/Extra";
import { MsgContext } from "../context/MsgContext";
import PromptAO from "../data/PromptAO";
import axios from "axios";
import Extras from "../data/Extras";



const Codeview= () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("context not defined");
  }
    const [files, setfiles]= useState(Extras.DEFAULT_FILE)

    const lastCalledRefCode = useRef(0); 
  
  const { preview } = context;

  const previewRef = useRef(null);
  const [Loading, setLoading] = useState(false)

   const msgcontext = useContext(MsgContext);
    if (!msgcontext) {
      throw new Error("context not present");
    }
    const { message } = msgcontext;
  
  const [previewStyle, setPreviewStyle] = useState({
    transform: "translateX(100vw)",
    opacity: 0,
  });
  useEffect(() => {
    setPreviewStyle((prev) => ({
      ...prev,
      transform: preview === "preview" ? "translateX(0)" : "translateX(100vw)",
      opacity: preview === "preview" ? 1 : 0,
      transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
    }));
  }, [preview]);

  

 
    const GetCode = async()=>{
  
      setLoading(true)
      const PROMPT = message[message.length - 1].msg 
      try{
        const result =await axios.post(`https://anon-backend-1yz9.onrender.com/code/genCode`,{
          prompt:PROMPT
        }) 
        console.log(result)
        const aiResp = result.data.resp
        const mergedFile = {...aiResp?.files}
        console.log(mergedFile)
        setfiles(mergedFile)
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }

useEffect(() => {
  if (message?.length > 0) {
    console.log("Generating code again");
    const role = message[message.length - 1].role;
    console.log(role);

    if (role === "user") {
      const now = Date.now();
      if (now - lastCalledRefCode.current >= 10000) {
        lastCalledRefCode.current = now; // Update the timestamp
        GetCode();
      } else {
        console.log("Rate limiter active, skipping GetCode call.");
      }
    }
  }
}, [message]);


  return (
    <div className="relative">
      {Loading ? (
        <div className="w-full h-screen flex items-center justify-center ">
 <p className="text-lg text-white animate-pulse">Files are loading...</p>        </div>
      ):(

      <SandpackProvider
        className="relative w-full h-full "
        files={files}
        customSetup={{
          dependencies:{
            ...Extra.DEPENDANCY
          }
        }
        }
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
           
        }}
        template="react"
        theme={atomDark}
      >
        <SandpackLayout>
          <SandpackFileExplorer style={{ height: "93vh" }} />
          <SandpackCodeEditor style={{ height: "93vh" , fontSize:"12px",lineHeight:"30px" }} />
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

export default Codeview;