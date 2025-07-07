import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsideGame7 = () => {
  const [isHoveringNextButton, setIsHoveringNextButton] = useState(false);
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
        src="/computer/pictures/page2/game3/regular/01.png"
        alt="Game 7 Scene 1"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      />

      {/* Right Navigation Arrow */}
      <div 
        style={{
          position: 'absolute',
          right: '30px',
          top: '30px',
          cursor: 'pointer',
          zIndex: 10
        }}
        onMouseEnter={() => setIsHoveringNextButton(true)}
        onMouseLeave={() => setIsHoveringNextButton(false)}
        onClick={() => navigate('/inside-game7-1')}
      >
        <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" 
            fill={isHoveringNextButton ? 'white' : 'none'} 
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
};

export default InsideGame7;
