import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NootBookIcon = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const navigate = useNavigate();

  // Function to navigate back to home
  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="relative w-[1920px] h-[1080px] bg-[#1D1C1A] overflow-hidden flex items-center justify-center">
      {/* Close Button */}
      <button
        className="fixed top-6 right-6 w-10 h-10 transition-opacity z-50 border-0 focus:outline-none cursor-pointer"
        aria-label="Close"
        onClick={handleClose}
        onMouseEnter={() => setIsHoveringCloseButton(true)}
        onMouseLeave={() => setIsHoveringCloseButton(false)}
      >
        {isHoveringCloseButton ? (
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.8233 2L36 8.205L25.2381 19.0189L36 29.795L29.795 36L18.9811 25.2381L8.205 36L2 29.795L12.7619 19.0189L2 8.205L8.23333 2C8.23333 2 15.5103 9.10694 19.0331 12.5919L29.8233 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.8233 2L36 8.205L25.2381 19.0189L36 29.795L29.795 36L18.9811 25.2381L8.205 36L2 29.795L12.7619 19.0189L2 8.205L8.23333 2C8.23333 2 15.5103 9.10694 19.0331 12.5919L29.8233 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* Page Content - The Hidden Room */}
      <div 
        className="absolute w-[908px] h-[234px] text-white font-['Work_Sans'] font-bold text-[48px] leading-[128.04%] text-left"
        style={{
          left: 'calc(50% - 908px/2 - 355px)',
          top: '270px'
        }}
      >
        <div className="space-y-6">
          <h1 className="mb-6">
            THE HIDDEN ROOM
          </h1>
          <div className="font-normal text-[20px] leading-[26px]">
            <p className="opacity-90">
              This room is an exploration of visual Easter eggs: those small, hidden messages.
            </p>
            <p className="opacity-90">
              From films and posters to brand logos and video games, each section invites you to look closer and uncover what's been hiding in plain sight.
            </p>
            <p className="opacity-90" style={{ marginTop: '27px' }}>
              Hidden messages are all around us, all it takes is a closer look.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NootBookIcon;