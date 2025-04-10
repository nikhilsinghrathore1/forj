'use client'

import Image from 'next/image'
import React from 'react'
import { FiExternalLink, FiMoon, FiSearch,  } from 'react-icons/fi'


const Navbar = () => {

  return (
       <div className="w-full items-center fixed bg-white z-[100]  justify-between top-0 py-3 flex px-6 ">
       {/*  left section */}
           <div className="flex gap-10 items-center ">
                       {/* the logo section  */}
             <div>
             <Image className="w-full h-full object-cover" src='https://block.github.io/goose/img/logo_light.png' width={32} height={32} alt="not showing "/>
             </div>
   
             {["quickstart", "docs", "blog", "extension"].map((e , i)=>(
   
               <h1 key={i} className="f16 capitalize">{e}</h1>
             ))}
             
             <div className="flex items-center gap-1">
             <h1 className="f16 capitalize">discord</h1>
             <FiExternalLink/>
             </div>
   
             <div className="flex items-center gap-1">
             <h1 className="f16 capitalize">github</h1>
             <FiExternalLink/>
             </div>
   
           </div>
       {/* right section  */}
       <div className="flex items-center gap-10">
          
               <FiMoon className="text-xl"/>
             <div className="px-5 py-[6px] border-[1px] flex gap-2 items-center border-gray-600/30 rounded-lg">
                 <FiSearch className="opacity-40"/>
                 <h1 className="f15 text-sm  opacity-60 ">Search for anything...</h1>
                 <span className="f16 opacity-35 text-xs mb-1" >ctrl k</span>
             </div>
       </div>
   
       </div>
  )
}

export default Navbar