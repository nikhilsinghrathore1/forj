"use client";
import { useState } from "react";


const NavLink = () => {
  const [activeLink, setActiveLink] = useState("home");

  return (
            
               <div
               className={`w-full flex flex-col gap-5 mt-7 pl-2"`}>
               <div 
               onClick={()=>setActiveLink("home")}
               className={`${activeLink ==="home"?"flex transition-all duration-300 cursor-pointer  gap-2 f10 text-[#356772]  items-center":"flex cursor-pointer opacity-70 gap-2 f10 text-[#162c31]  items-center"}`}>
               <svg aria-hidden="true" focusable="false" data-prefix="fak" data-icon="search" height={17} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M236.8 288a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 1 0 0 102.4zM434.9 398.7c-10.9 13.1-23 25.3-36.2 36.2l68.5 68.5 36.2-36.2-68.5-68.5zM236.8 32a204.8 204.8 0 1 1 0 409.6 204.8 204.8 0 1 1 0-409.6zm0 51.2a153.6 153.6 0 1 0 0 307.2 153.6 153.6 0 1 0 0-307.2z"></path></svg>
             <h1>Home</h1>
               </div>
               <div 
               onClick={()=>setActiveLink("discover")}
               className={`${activeLink ==="discover" ? "flex cursor-pointer transition-all duration-300  gap-2 f10 text-[#356772]  items-center":"flex cursor-pointer opacity-70 gap-2 f10 text-[#162c31]  items-center"}`}>
               <svg aria-hidden="true" focusable="false" data-prefix="fak" data-icon="discover" height={16} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 51.2c6.4 0 19.2 17.3 30.4 51.2c4.8 14.1 9 31.4 12.5 51.2c2.9 15.4 5.1 32.3 6.4 51.2c1.3 16 1.9 33 1.9 51.2h51.2c0-17-.6-34.2-1.9-51.2c-1.3-17.3-3.2-34.6-5.8-51.2c-2.9-17.9-6.4-35.2-10.9-51.2c-3.8-13.8-8-26.6-13.1-38.4C374.1 25.3 350.7 0 320 0s-54.1 25.3-70.7 64c-5.1 11.5-9.3 24.6-13.1 38.4h53.8c11.2-33.9 23.7-51.2 30.4-51.2H320zm0 409.6c-6.4 0-19.2-17.3-30.4-51.2c-4.8-14.1-9-31.4-12.5-51.2c-2.9-15.4-5.1-32.3-6.4-51.2c-1.3-16-1.9-33-1.9-51.2H217.6c0 17 .6 34.2 1.9 51.2c1.3 17.3 3.2 34.6 5.8 51.2c2.9 17.9 6.4 35.2 10.9 51.2c3.8 13.8 8 26.6 13.1 38.4c16.6 38.7 40 64 70.7 64s54.1-25.3 70.7-64c5.1-11.5 9.3-24.6 13.1-38.4H350.1c-11.2 33.9-23.7 51.2-30.4 51.2h.3zM550.4 145.3c-7.4-15-16-29.4-26.2-42.9c-25-33-57.6-59.8-95.4-77.8C395.8 9 359 0 320 0s-75.8 9-108.8 24.6c-37.8 17.9-70.4 44.8-95.4 77.8c-9.9 13.4-18.9 27.5-26.2 42.9C73.3 178.9 64 216.3 64 256s9.3 77.1 25.6 110.7c7.4 15 16 29.4 26.2 42.9c25 33 57.6 59.8 95.4 77.8C244.2 503 281 512 320 512s75.8-9 108.8-24.6c37.8-17.9 70.4-44.8 95.4-77.8c9.9-13.4 18.9-27.5 26.2-42.9c16.3-33.6 25.6-71 25.6-110.7s-9.3-77.1-25.6-110.7zM390.7 448c-22.1 8.3-45.8 12.8-70.7 12.8s-48.6-4.8-70.7-12.8c-23.7-9-45.4-21.8-64.3-38.4c-1-.6-1.6-1.6-2.6-2.2c-15.7-14.1-29.1-30.7-39.7-49h30.4c-2.2-16.6-4.2-33.9-5.1-51.2H121.9c-4.2-16.3-6.7-33.6-6.7-51.2s2.6-34.9 6.7-51.2H320V153.6H143c10.6-18.2 24-34.9 39.7-49c1-.6 1.6-1.6 2.6-2.2C204.2 86.1 225.6 73 249.6 64c22.1-8.3 45.8-12.8 70.7-12.8s48.6 4.8 70.7 12.8c23.7 9 45.4 21.8 64.3 38.4c1 .6 1.6 1.6 2.6 2.2c15.7 14.1 29.1 30.7 39.7 49H467.2c2.2 16.6 4.2 33.9 5.1 51.2h46.1c4.2 16.3 6.7 33.6 6.7 51.2s-2.6 34.9-6.7 51.2H320.3v51.2h177c-10.6 18.2-24 34.9-39.7 49c-1 .6-1.6 1.6-2.6 2.2c-18.9 16.3-40.3 29.4-64.3 38.4z"></path></svg>                    
             <h1>Discover</h1>
               </div>
               <div 
                 onClick={()=>setActiveLink("spaces")}
                 className={`${activeLink ==="spaces" ? "flex cursor-pointer transition-all duration-300  gap-2 f10 text-[#356772]  items-center":"flex cursor-pointer opacity-70 gap-2 f10 text-[#162c31]  items-center"}`}>
               <svg aria-hidden="true" focusable="false" data-prefix="fak" data-icon="collection-2" height={17} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M32 236.8V185.6c84.8 0 153.6-68.8 153.6-153.6h51.2C236.8 145 145 236.8 32 236.8zm460.8 0C379.8 236.8 288 145 288 32h51.2c0 84.8 68.8 153.6 153.6 153.6v51.2zm-256 256H185.6c0-84.8-68.8-153.6-153.6-153.6V288c113 0 204.8 91.8 204.8 204.8zm102.4 0H288c0-113 91.8-204.8 204.8-204.8v51.2c-84.8 0-153.6 68.8-153.6 153.6zM262.4 313.6a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 1 0 0 102.4z"></path></svg>                    
             <h1>Spaces</h1>

               </div>
               <div 
                 onClick={()=>setActiveLink("library")}
                 className={`${activeLink ==="library" ? "flex cursor-pointer transition-all duration-300  gap-2 f10 text-[#356772]  items-center":"flex cursor-pointer opacity-70 gap-2 f10 text-[#162c31]  items-center"}`}>
               <svg aria-hidden="true" focusable="false" data-prefix="fak" data-icon="library" height={17} role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M512 281.6H460.8V256C460.8 143 369 51.2 256 51.2S51.2 143 51.2 256v25.6H0V256C0 114.9 114.9 0 256 0S512 114.9 512 256v25.6zm-102.4 0H358.4V256c0-56.3-46.1-102.4-102.4-102.4s-102.4 46.1-102.4 102.4v25.6H102.4V256c0-84.8 68.8-153.6 153.6-153.6s153.6 68.8 153.6 153.6v25.6zm-51.2 51.2c-41.9 0-79 20.5-102.4 51.8c-23.4-31.4-60.5-51.8-102.4-51.8H0V384H153.6c42.2 0 76.8 34.6 76.8 76.8v25.6h51.2V460.8c0-42.2 34.6-76.8 76.8-76.8H512V332.8H358.4zM256 307.2a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 1 0 0 102.4z"></path></svg>                    
             <h1>Library</h1>
               </div>
             </div>

);
};

export default NavLink;
