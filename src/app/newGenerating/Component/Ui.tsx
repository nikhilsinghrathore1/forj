"use client"
import { useRef } from "react";
import type { FC } from "react";

interface UIProps extends React.HTMLAttributes<HTMLDivElement> {
  hidden?: boolean;
  userInput?: string;
  setUserInput?: (value: string) => void;
  followUpChat?: () => void;
  handleKeyDown?: (event: React.KeyboardEvent) => void;
  loading?: boolean;
  messages?: Array<{ role: string; msg: string }>;
}

export const UI: FC<UIProps> = ({ 
  hidden, 
  userInput = "",
  setUserInput,
  followUpChat,
  handleKeyDown,
  loading = false,
  messages = [],
  ...props 
}) => {
  const input = useRef<HTMLInputElement>(null);

  if (hidden) return null;

  return (
    <div
      {...props}
      className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none"
    >
      {/* Header */}
      <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
        <h1 className="font-black text-xl">Safira your personal assistant</h1>
        <p>I will always help u</p>
        {loading && (
          <div className="mt-2 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-pink-500"></div>
            <span className="text-sm text-gray-600">Thinking...</span>
          </div>
        )}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto max-h-96 mb-4 pointer-events-auto">
        <div className="space-y-3 p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-pink-500 text-white'
                    : 'bg-white bg-opacity-80 backdrop-blur-md text-gray-800'
                }`}
              >
                <p className="text-sm">{message.msg}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="w-full flex flex-col items-end justify-center gap-4">
        <button
          onClick={() => {
            // Camera zoom logic would go here
            console.log("Zoom button clicked");
          }}
          className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md transition-colors"
        >
          <ZoomInIcon />
        </button>

        <button
          onClick={() => {
            const body = document.querySelector("body");
            if (body) {
              body.classList.toggle("greenScreen");
            }
          }}
          className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md transition-colors"
        >
          <VideoToggleIcon />
        </button>
      </div>

      {/* Input Section */}
      <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto">
        <input
          className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
          placeholder="Type a message..."
          ref={input}
          value={userInput}
          onChange={(e) => setUserInput?.(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          onClick={followUpChat}
          disabled={loading || !userInput.trim()}
          className="bg-pink-500 hover:bg-pink-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-4 px-10 font-semibold uppercase rounded-md transition-colors"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

// Extracted icons for better type safety and cleaner JSX
const ZoomOutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
    />
  </svg>
);

const ZoomInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
    />
  </svg>
);

const VideoToggleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);
