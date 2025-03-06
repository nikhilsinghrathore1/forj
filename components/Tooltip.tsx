import React, { useState } from 'react';

const Tooltip = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className='relative inline-block'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        className='w-[20px] text-[#8F989E] relative hover:text-white transition-transform duration-300 hover:scale-110'
        xmlns='http://www.w3.org/2000/svg'
        width='18'
        height='18'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path d='M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z'></path>
        <path d='M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z'></path>
        <path d='M3 5a2 2 0 0 0 2 2h3'></path>
        <path d='M3 3v13a2 2 0 0 0 2 2h3'></path>
      </svg>
      {isHovered && (
        <div className='absolute left-[-120%] top-1/2 -translate-y-1/2 text-white px-3 py-2 bg-black rounded-md text-sm '>
          Tooltip text
        </div>
      )}
    </div>
  );
};

export default Tooltip;
