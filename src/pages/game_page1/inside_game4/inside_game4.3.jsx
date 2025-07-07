import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsideGame4_3 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ 
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#1D1C1A'
    }}>
      <img
        src="/computer/pictures/page1/game4/regular/04.png"
        alt="Game 4 Inside 4"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: '0',
          left: '0'
        }}
      />

      {/* Back Arrow */}
      <button
        style={{
          position: 'absolute',
          width: '33px',
          height: '49px',
          left: '30px',
          top: '30px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          transform: 'scaleX(-1)',
          zIndex: 10
        }}
        onClick={() => navigate('/inside-game4-2')}
        onMouseEnter={() => setIsHoveringBackButton(true)}
        onMouseLeave={() => setIsHoveringBackButton(false)}
      >
        {isHoveringBackButton ? (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default InsideGame4_3;
