import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InsideGame3 = () => {
  const [isHoveringNextButton, setIsHoveringNextButton] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{
      width: '1920px',
      height: '1080px',
      position: 'relative',
      backgroundColor: 'white',
      overflow: 'hidden'
    }}>
      <img
        src="/computer/pictures/page1/game3/regular/01.png"
        alt="Game 3 Detail 1"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: '0',
          left: '0'
        }}
      />
      
      {/* Next Arrow */}
      <button
        style={{
          position: 'absolute',
          width: '33px',
          height: '49px',
          right: '30px',
          top: '30px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          zIndex: 10
        }}
        onClick={() => navigate('/inside-game3-1')}
        onMouseEnter={() => setIsHoveringNextButton(true)}
        onMouseLeave={() => setIsHoveringNextButton(false)}
      >
        {isHoveringNextButton ? (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" fill="black" stroke="black" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" stroke="black" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default InsideGame3;
