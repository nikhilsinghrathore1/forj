'use client';
import { MsgContext } from '../../context/MsgContext';
import { useState, ReactNode } from 'react';
import { PreviewContext } from '../../context/PreviewContext';
import { RunLuaContextt } from '../../context/LuaContext';

const Provider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessage] = useState<{ msg: string; role: string; }[]>([]); // Ensuring it's an array of objects
  const [preview, setPreview] = useState<boolean>(true);
  const [LuaMsg, setLuaMsg] = useState<string>("");

  return (
    <RunLuaContextt.Provider value={{LuaMsg , setLuaMsg}}>
    <MsgContext.Provider value={{ messages, setMessage }}>
      <PreviewContext.Provider value={{ preview, setPreview }}>
        {children}
      </PreviewContext.Provider>
    </MsgContext.Provider> 
    </RunLuaContextt.Provider>
  );
};

export default Provider;
