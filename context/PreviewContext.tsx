import { setPriority } from "os";
import { createContext , Dispatch, SetStateAction } from "react";
interface PreviewContextInterface {
  preview: string;
  setPreview: Dispatch<SetStateAction<string>>;
}


export const PreviewContext = createContext<PreviewContextInterface>({
               preview:"code",
               setPreview:()=>{}
 })
