import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Game2 = () => {
  const [isHoveringNextButton, setIsHoveringNextButton] = useState(false);
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/game3');
  };

  const handleBackClick = () => {
    navigate('/game1');
  };

  const handleImageClick = (index) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  // Image paths
  const imagePaths = [
    '/computer/pictures/page1/game2/regular/01.png',
    '/computer/pictures/page1/game2/regular/02.png',
    '/computer/pictures/page1/game2/regular/03.png',
    '/computer/pictures/page1/game2/regular/04.png'
  ];

  return (
    <div 
      style={{ 
        position: 'relative',
        width: '1920px',
        height: '1080px',
        background: '#1D1C1A',
        padding: '154px 186px',
        boxSizing: 'border-box',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '66px',
        alignItems: 'start'
      }}
    >
      {/* Images Grid with Captions */}
      <div style={{ position: 'relative', gridColumn: '1 / 3', display: 'contents' }}>
        {/* Top Left Image */}
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <div 
            style={{
              width: '765px',
              height: '318px',
              overflow: 'hidden',
              position: 'relative',
              border: selectedImage === 0 ? '2px solid #3498db' : 'none',
              boxSizing: 'border-box',
              marginBottom: '10px'
            }}
            onClick={() => handleImageClick(0)}
          >
            <img 
              src={imagePaths[0]}
              alt="Game 2 screenshot 1"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
          <div style={{
            position: 'absolute',
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: '20px',
            lineHeight: '128.04%',
            color: '#FFFFFF',
            width: '600px',
            height: '26px',
            left: '0',
            top: '333px' // 318px (image height) + 15px gap
          }}>
            APPROXIMATELY 40–60 MINUTES INTO THE GAME
          </div>
        </div>

        {/* Top Right Image */}
        <div style={{ position: 'relative', marginBottom: '20px', marginLeft: '23px' }}>
          <div 
            style={{
              width: '765px',
              height: '318px',
              overflow: 'hidden',
              position: 'relative',
              border: selectedImage === 1 ? '2px solid #3498db' : 'none',
              boxSizing: 'border-box',
              marginBottom: '10px'
            }}
            onClick={() => handleImageClick(1)}
          >
            <img 
              src={imagePaths[1]}
              alt="Game 2 screenshot 2"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
          <div style={{
            position: 'absolute',
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: '20px',
            lineHeight: '128.04%',
            color: '#FFFFFF',
            width: '600px',
            height: '26px',
            left: '0',
            top: '333px' // 318px (image height) + 15px gap
          }}>
            APPROXIMATELY 20–40 MINUTES INTO THE GAME
          </div>
        </div>

        {/* Bottom Left Image */}
        <div style={{ position: 'relative' }}>
          <div 
            style={{
              width: '765px',
              height: '318px',
              overflow: 'hidden',
              position: 'relative',
              border: selectedImage === 2 ? '2px solid #3498db' : 'none',
              boxSizing: 'border-box',
              marginBottom: '10px'
            }}
            onClick={() => handleImageClick(2)}
          >
            <img 
              src={imagePaths[2]}
              alt="Game 2 screenshot 3"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
          <div style={{
            position: 'absolute',
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: '20px',
            lineHeight: '128.04%',
            color: '#FFFFFF',
            width: '500px',
            height: '26px',
            left: '0',
            top: '333px' // 318px (image height) + 15px gap
          }}>
            APPROXIMATELY 20 MINUTES INTO THE GAME
          </div>
        </div>

        {/* Bottom Right Image */}
        <div style={{ position: 'relative', marginLeft: '23px' }}>
          <div 
            style={{
              width: '765px',
              height: '318px',
              overflow: 'hidden',
              position: 'relative',
              border: selectedImage === 3 ? '2px solid #3498db' : 'none',
              boxSizing: 'border-box',
              marginBottom: '10px'
            }}
            onClick={() => handleImageClick(3)}
          >
            <img 
              src={imagePaths[3]}
              alt="Game 2 screenshot 4"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
          <div style={{
            position: 'absolute',
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: '20px',
            lineHeight: '128.04%',
            color: '#FFFFFF',
            width: '700px',
            height: '26px',
            left: '0',
            top: '333px' // 318px (image height) + 15px gap
          }}>
            FIND 5 CLUES TO REVEAL THE VAMPIRE'S LOCATION.
          </div>
        </div>
      </div>

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

export default Game2;