import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsideGame73 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: '#1D1C1A',
    }}>
      <img
        src="/computer/pictures/page2/game3/regular/04.png"
        alt="Game 7 Scene 4"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Left Navigation Arrow */}
      <div 
        style={{
          position: 'absolute',
          left: '30px',
          top: '30px',
          cursor: 'pointer',
          zIndex: 10
        }}
        onMouseEnter={() => setIsHoveringBackButton(true)}
        onMouseLeave={() => setIsHoveringBackButton(false)}
        onClick={() => navigate('/inside-game7-2')}
      >
        <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M24.6045 47L1 24.524L24.6045 2L31 8.354L14.797 24.47L31 40.646L24.6045 47Z" 
            fill={isHoveringBackButton ? 'white' : 'none'} 
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
};

export default InsideGame73;
