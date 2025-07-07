import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsideGame8 = () => {
  const [isHoveringRightArrow, setIsHoveringRightArrow] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: '#1D1C1A',
      overflow: 'hidden'
    }}>
      <img
        src="/computer/pictures/page2/game4/regular/01.png"
        alt="Game 8 - Image 1"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />

      {/* Right Arrow */}
      <div
        style={{
          position: 'absolute',
          right: '30px',
          top: '30px',
          cursor: 'pointer',
          zIndex: 10
        }}
        onMouseEnter={() => setIsHoveringRightArrow(true)}
        onMouseLeave={() => setIsHoveringRightArrow(false)}
        onClick={() => navigate('/inside-game8-1')}
      >
        <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
          <path
            d="M24.6045 47L1 24.524L24.6045 2L31 8.354L14.797 24.47L31 40.646L24.6045 47Z"
            fill={isHoveringRightArrow ? 'white' : 'none'}
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
};

export default InsideGame8;
