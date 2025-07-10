import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game2 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/computer');
  };

  // Generate base64 previews for all images
  useEffect(() => {
    const loadImagePreviews = async () => {
      const loaded = {};
      
      for (let i = 0; i < imagePaths.length; i++) {
        const path = imagePaths[i];
        
        // Preload the actual image
        const img = new Image();
        img.src = path;
        img.onload = () => {
          loaded[path] = true;
          setImagesLoaded({...loaded});
        };
      }
    };

    loadImagePreviews();
  }, []);

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
              border: 'none',
              boxSizing: 'border-box',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/inside-game2')}
          >
            <img 
              src={imagePaths[0]}
              alt="Game 2 screenshot 1"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: imagesLoaded[imagePaths[0]] ? 'none' : 'blur(20px)',
                transition: 'filter 0.5s ease-out',
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
              border: 'none',
              boxSizing: 'border-box',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/inside-game2-1')}
          >
            <img 
              src={imagePaths[1]}
              alt="Game 2 screenshot 2"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: imagesLoaded[imagePaths[0]] ? 'none' : 'blur(20px)',
                transition: 'filter 0.5s ease-out',
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
              border: 'none',
              boxSizing: 'border-box',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/inside-game2-2')}
          >
            <img 
              src={imagePaths[2]}
              alt="Game 2 screenshot 3"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: imagesLoaded[imagePaths[0]] ? 'none' : 'blur(20px)',
                transition: 'filter 0.5s ease-out',
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
              border: 'none',
              boxSizing: 'border-box',
              marginBottom: '10px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/inside-game2-3')}
          >
            <img 
              src={imagePaths[3]}
              alt="Game 2 screenshot 4"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: imagesLoaded[imagePaths[0]] ? 'none' : 'blur(20px)',
                transition: 'filter 0.5s ease-out',
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

      {/* Navigation Arrow */}
      <button
        style={{
          position: 'absolute',
          width: '29px',
          height: '45px',
          right: '30px',
          top: '30px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          zIndex: 10
        }}
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHoveringButton(true)}
        onMouseLeave={() => setIsHoveringButton(false)}
      >
        {isHoveringButton ? (
          <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Game2;