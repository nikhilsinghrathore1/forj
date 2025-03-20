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

// interface CodeviewProps {
//   activeProject: any; 
// }

// interface Project {
//   codebase?: Record<string, any>;
// }



const Codeview= () => {
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("context not defined");
  }
  const [files, setfiles]= useState(Extra.DEFAULT_FILE)

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


  // let normalizedCodebase:any = {};
  // const [currentProject, setCurrentProject] = useState<Project>({});

  // useEffect(() => {
  //   const fetchProjectCode = async (projectId:string) => {
  //     try {
  //       console.log("new code called")
  //       setLoading(true);
  //       const response = await axios.get(
  //         `${process.env.NEXT_PUBLIC_TEST_URL}/projects/${projectId}`
  //       );
  //       console.log(response)


  //       if (response.data) {
  //         console.log("response recieved")
  //         // Normalize codebase array into an object with file paths as keys
  //         if (Array.isArray(response.data.codebase)) {
  //           response.data.codebase.forEach((file:any) => {
  //             // Use filePath as key, prefixed with '/' if not already
  //             const filePath = file.filePath.startsWith('/')
  //               ? file.filePath
  //               : `/${file.filePath}`;
  //             normalizedCodebase[filePath] = file.code; // Use code directly as string
  //           });
  //           // console.log('inside 1st\n', normalizedCodebase);
  //         } else if (typeof response.data.codebase === 'object') {
  //           // If it's already an object, ensure keys are proper paths
  //           normalizedCodebase = Object.entries(response.data.codebase).reduce(
  //             (acc, [key, value]) => {
  //               const path = key.startsWith('/') ? key : `/src/${key}`;
  //               (acc as any)[path] = value;
  //               return acc;
  //             },
  //             {}
  //           );
  //           // console.log('inside 2nd\n', normalizedCodebase);
  //         } else {
  //           normalizedCodebase = Extra.DEFAULT_FILE; // Fallback to default if invalid
  //           // console.log('inside 3rd\n', normalizedCodebase);
  //         }
  //         setCurrentProject({ ...response.data, codebase: normalizedCodebase });
  //         // console.log('Normalized codebase:', normalizedCodebase);
  //       }
  //     } catch (error:any) {
  //       if (error.response.data.error === 'No code found for project') {
  //      alert("error occured")
  //         return;
  //       }

  //       alert("error occured")
  //       console.error('Error loading project code:', error);
  //       return;
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProjectCode("4")
    

  // }, []);
  

 
    const GetCode = async()=>{
  
      setLoading(true)
      console.log(PromptAO.CODE_GEN_PROMPT)
      const PROMPT = message[message.length - 1].msg +" " + PromptAO.CODE_GEN_PROMPT
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

// const codebaseFiles = currentProject.codebase || {};

// const sandpackFiles = {
//   ...Extra.DEFAULT_FILE,
//   ...codebaseFiles,
// };

// now have to add a loading screen 
// have to implement the webcontainer here or maybe in a new component 
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