// import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

// interface Message {
//   id?: string;
//   content?: string;
//   role?: 'user' | 'assistant';
//   timestamp?: number;
  
//   animation: string;
//   facialExpression: 'default' | 'smile' | 'funnyFace' | 'sad' | 'surprised' | 'angry' | 'crazy';
//   lipsync: {
//     mouthCues: Array<{
//       start: number;
//       end: number;
//       value: string;
//     }>;
//   };
//   audio: string; 
// }

// interface ChatContextValue {
//   chat: (message: string) => Promise<void>;
//   message: Message | null;
//   onMessagePlayed: () => void;
//   loading: boolean;
//   cameraZoomed: boolean;
//   setCameraZoomed: (zoomed: boolean) => void;
// }

// interface ChatProviderProps {
//   children: ReactNode;
// }
// interface ChatResponse {
//   messages: Message[];
// }

// const ChatContext = createContext<ChatContextValue | undefined>(undefined);

// export const ChatProvider = ({ children }: ChatProviderProps) => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [message, setMessage] = useState<Message | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [cameraZoomed, setCameraZoomed] = useState<boolean>(true);

//   const chat = async (message: string): Promise<void> => {
//     setLoading(true);
//     try {
//       const response = await fetch(`${backendUrl}/chat`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ message }),
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
      
//       const data: ChatResponse = await response.json();
//       const resp = data.messages;
//       setMessages((prevMessages) => [...prevMessages, ...resp]);
//     } catch (error) {
//       console.error('Error sending message:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onMessagePlayed = (): void => {
//     setMessages((prevMessages) => prevMessages.slice(1));
//   };

//   useEffect(() => {
//     if (messages.length > 0) {
//       setMessage(messages[0]);
//     } else {
//       setMessage(null);
//     }
//     // task for today, frontend finalisation , agent finalisation, chanages in smart contract finalisation, have to figure out a way in which peoople can create thier own custom application 
//     // ig itna bhot hai aaj ke liye now let's work on the 3d figure in the forj thingy     
//   }, [messages]);

//   return (
//     <ChatContext.Provider
//       value={{
//         chat,
//         message,
//         onMessagePlayed,
//         loading,
//         cameraZoomed,
//         setCameraZoomed,
//       }}
//     >
//       {children}
//     </ChatContext.Provider>
//   );
// };


// export const useChat = (): ChatContextValue => {

//   const context = useContext(ChatContext);

//   if (!context) {

//     throw new Error("useChat must be used within a ChatProvider");

//   }

//   return context;

// };