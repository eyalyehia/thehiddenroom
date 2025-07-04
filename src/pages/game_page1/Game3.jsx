import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Game3 = () => {
  const [isHoveringNextButton, setIsHoveringNextButton] = useState(false);
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/game4');
  };

  const handleBackClick = () => {
    navigate('/game2');
  };

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '1920px',
        height: '1080px',
        background: '#1D1C1A'
      }}
    >
      {/* חץ ימינה למעלה */}
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
          padding: 0
        }}
        onClick={handleNextClick}
        onMouseEnter={() => setIsHoveringNextButton(true)}
        onMouseLeave={() => setIsHoveringNextButton(false)}
      >
        {isHoveringNextButton ? (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* חץ שמאלה למעלה */}
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
          transform: 'scaleX(-1)' // הופך את החץ לכיוון שמאל
        }}
        onClick={handleBackClick}
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

export default Game3; 