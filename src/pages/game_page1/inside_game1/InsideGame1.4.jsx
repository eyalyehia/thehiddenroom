import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsideGame1_4 = () => {
  const [isHoveringLeftArrow, setIsHoveringLeftArrow] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      position: 'relative',
      width: '1920px',
      height: '1080px',
      background: '#FFFFFF'
    }}>
      <img 
        src="/computer/pictures/page1/game1/regular/04.png"
        alt="Easter egg 04"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />

      {/* Left Navigation Arrow */}
      <button
        style={{
          position: 'absolute',
          width: '29px',
          height: '45px',
          left: '30px',
          top: '30px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          transform: 'scaleX(-1)' // הופך את החץ לכיוון שמאל
        }}
        onClick={() => navigate('/inside-game1-3')}
        onMouseEnter={() => setIsHoveringLeftArrow(true)}
        onMouseLeave={() => setIsHoveringLeftArrow(false)}
      >
        {isHoveringLeftArrow ? (
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

export default InsideGame1_4;
