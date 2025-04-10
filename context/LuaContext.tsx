import { createContext, Dispatch, SetStateAction } from 'react';

interface LuaContextType {
  LuaMsg: string;
  setLuaMsg: Dispatch<SetStateAction<string>>;
}

export const RunLuaContextt = createContext<LuaContextType>({
  LuaMsg: '',
  setLuaMsg: () => {},
});
