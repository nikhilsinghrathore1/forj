import { createContext, Dispatch, SetStateAction } from 'react';

interface Message {
  msg: string;
  role: string;
}

interface MsgContextType {
  message: Message[];
  setMessage: Dispatch<SetStateAction<Message[]>>;
}

export const MsgContext = createContext<MsgContextType>({
  message: [],
  setMessage: () => {},
});
