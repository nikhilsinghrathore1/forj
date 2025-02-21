"use client";
import { MsgContext } from "../context/MsgContext";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { useContext, useRef, useState, useEffect } from "react";
import { PreviewContext } from "../context/PreviewContext";

const Codeview = () => {
  const [loading, setloading] = useState(false);
  const context = useContext(PreviewContext);
  if (!context) {
    throw new Error("context not defined");
  }

  const { preview } = context;

  const previewRef = useRef(null);
  
  const [previewStyle, setPreviewStyle] = useState({
    transform: "translateX(100vw)",
    opacity: 0,
  });

  useEffect(() => {
    if (preview === "preview") {
      setPreviewStyle({
        transform: "translateX(0)",
        opacity: 1,
        transition: "transform 0.2s ease-in-out, 0.4s ease-in-out",
      });
    } else {
      setPreviewStyle({
        transform: "translateX(100vw)",
        opacity: 0,
        transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
      });
    }
  }, [preview]);

  return (
    <div className="relative">
      <SandpackProvider
        className="relative w-full rounded-3xl"
        customSetup={{
          dependencies: {},
        }}
        options={{
          externalResources: ["https://cdn.tailwindcss.com"],
        }}
        template="react-ts"
        theme={"light"}
      >
        <SandpackLayout>
          <SandpackFileExplorer style={{ height: "78vh" }} />
          <SandpackCodeEditor style={{ height: "78vh" }} />
          <div
            className="absolute w-full"
            style={{ ...previewStyle }}
            ref={previewRef}
          >
            <SandpackPreview
              className="absolute w-full"
              ref={previewRef}
              showNavigator={true}
              style={{ height: "78vh" }}
            />
          </div>
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default Codeview;
