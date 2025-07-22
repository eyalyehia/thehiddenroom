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
    <div className="min-h-screen w-full flex bg-[#1D1C1A] relative overflow-hidden">
      {/* Container for text content - this helps maintain responsive layout */}
      <div className="w-full h-full relative">
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
        <div className="absolute text-white font-['Work_Sans']" style={{ left: '122px' }}>
          {/* Title */}
          <h1 
            className="w-[372px] h-[50px]"
            style={{
              top: '122px',
              position: 'absolute',
              opacity: 1,
              fontFamily: 'Work Sans',
              fontWeight: 900,
              fontStyle: 'Black',
              fontSize: '39px',
              lineHeight: '128%',
              letterSpacing: '0%',
              color: '#FFFFFF',
            }}
          >
            THE HIDDEN ROOM
          </h1>
          
          {/* Description */}
          <p 
            className="w-[827px] h-[221px]"
            style={{
              top: '172px',
              position: 'absolute',
              // opacity: 1,
              fontFamily: 'Work Sans',
              fontWeight: 400,
              fontStyle: 'normal',
              fontSize: '32px',
              lineHeight: '103%',
              letterSpacing: '0%',
              color: '#FFFFFF',
              whiteSpace: 'pre-line',
            }}
          >
            {`This room is an exploration of visual easter eggs:
secret messages and hidden details. From films
and posters to brand logos and video games,
each section invites you to look closer and
uncover what’s been hiding in plain sight.`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NootBookIcon;