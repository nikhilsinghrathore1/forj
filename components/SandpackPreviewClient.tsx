"use client"
import { SandpackPreview } from '@codesandbox/sandpack-react'
import React, { useRef } from 'react'


const SandPackPreviewClient = () => {
              //  const {sandpack} = useSandpack()

               const previewRef = useRef(null)
  
               
              
               
  return (
               <SandpackPreview ref={previewRef}   showNavigator={true} style={{height:"78vh"}} />
)
}

export default SandPackPreviewClient