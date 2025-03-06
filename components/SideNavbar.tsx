import React from "react";
import NavLink from "./NavLinks.";
import { RiContractLeftLine } from "react-icons/ri";
import { FaGg } from "react-icons/fa";

const SideNavbar = () => {
  return (
    <div className="h-full w-[14%] relative flex flex-col py-5 pl-5 pr-2 ">
      {/* logo */}
      <div className="flex transition-all duration-200 hover:text-cyan-600 gap-1 items-center relative w-full text-[#E8E8E6] text-2xl f11 ">
        <FaGg className="text-3xl text-cyan-700 hover:text-cyan-500" />
        <h1 className="tracking-tight">ANON</h1>
        <div className="absolute top-1/2 right-2 text-lg opacity-70 -translate-y-1/2">
          <RiContractLeftLine />
        </div>
      </div>
      {/* new thread */}

      
      <div className="w-full mt-8 mb-7 hover:border-cyan-500 border-[#d3d3d1]/20 border-[1px] transition-all duration-200 text-sm f4  opacity-70 items-center justify-between px-5 rounded-full py-[6px] bg-[#191A1A] flex">
        <h1>New Thread</h1>
        <div className="flex  gap-1">
          <span className="px-[2px] text-xs py-[2px] border-[1px] f7 border-gray-300/30 hover:border-cyan-500 rounded">
            Ctrl
          </span>
          <span className="px-[2px] text-xs py-[2px] border-[1px] f7 border-gray-300/30 hover:border-cyan-500 rounded">
            I
          </span>
        </div>
      </div>

      {/* links Section */}
      <NavLink />

      <div className=" flex flex-col absolute bottom-10 px-3 left-0  gap-[6px] w-full">
        <div className="flex cursor-pointer bg-[#202222] hover:bg-[#417980] duration-200 text-white f10 items-center justify-center w-full p-2 rounded-lg">
          Connect wallet
        </div>
        <div className="flex cursor-pointer bg-[#2D2F2F] text-[#E8E8E6] f11 items-center justify-center w-full p-2 rounded-lg f10">
          Docs
        </div>
      </div>
    </div>
  );
};

export default SideNavbar;
