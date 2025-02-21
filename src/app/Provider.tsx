'use client';
import { MsgContext } from '../../context/MsgContext';
import { useState, ReactNode } from 'react';
import { PreviewContext } from '../../context/PreviewContext';

const Provider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<{ msg: string; role: string; }[]>([]); // Ensuring it's an array of objects
  const [preview, setPreview] = useState<string>("code");

  return (
    <MsgContext.Provider value={{ message, setMessage }}>
      <PreviewContext.Provider value={{ preview, setPreview }}>
        {children}
      </PreviewContext.Provider>
    </MsgContext.Provider>
  );
};

export default Provider;
