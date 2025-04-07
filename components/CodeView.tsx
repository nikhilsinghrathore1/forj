"use client";
import { atomDark } from "@codesandbox/sandpack-themes";
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

const Codeview = () => {
  // loading logic
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setProgress((prev) => {
  //       if (prev >= 100) {
  //         clearInterval(interval);
  //         return 100;
  //       }
  //       return prev + 1;
  //     });
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  // loading logic ends

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
  const { message } = msgcontext;

  const [previewStyle, setPreviewStyle] = useState({
    transform: "translateX(110vw)",
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

  const GetCode = async () => {
    setLoading(true);
    const PROMPT = message[message.length - 1].msg;
    console.log(PROMPT);

    try {
      const result = await axios.post(`https://anon-backend-1yz9.onrender.com/code/genCode`, {
        role: "user",
        prompt: PROMPT,
      });

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

  useEffect(() => {
    if (message?.length > 0) {
      const latest = message[message.length - 1];
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
  }, [message]);

  return (
    <div className="relative">
      {Loading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-black  text-white">
          <div className="flex items-center gap-4 animate-pulse ">
            <p className="text-lg animate-pulse mb-6">
              Your files are loading... {progress}%
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
          theme={atomDark}
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

export default Codeview;
