import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game7 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const navigate = useNavigate();

  const imagePaths = [
    "/computer/pictures/page2/game3/regular/01.png",
    "/computer/pictures/page2/game3/regular/02.png",
    "/computer/pictures/page2/game3/regular/03.png",
    "/computer/pictures/page2/game3/regular/04.png",
  ];

  useEffect(() => {
    // Set document background color when component mounts
    document.body.style.backgroundColor = '#1D1C1A';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.overflow = 'hidden';
    
    // Cleanup function to reset styles when component unmounts
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
    };
  }, []);

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loaded = {};
      
      for (let i = 0; i < imagePaths.length; i++) {
        const path = imagePaths[i];
        const img = new Image();
        img.src = path;
        img.onload = () => {
          loaded[path] = true;
          setImagesLoaded({...loaded});
        };
      }
    };

    loadImages();
  }, []);

  const handleButtonClick = () => {
    navigate('/computer2');
  };

  return (
    <div 
      className="relative overflow-hidden w-full h-screen" 
      style={{ 
        backgroundColor: '#1D1C1A' 
      }}
    >
      {/* Images Grid with Captions */}
      <div style={{ 
        position: 'relative', 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '20px',
        padding: '40px',
        height: '100%',
        alignItems: 'center',
        justifyItems: 'center'
      }}>
        {imagePaths.map((imagePath, index) => {
          const captions = [
            'APPROXIMATELY 5–6 HOURS INTO THE GAME',
            'AVAILABLE A FEW HOURS INTO THE GAME DURING FREE EXPLORATION',
            'CAN BE FOUND EARLY IN THE GAME DURING FREE RIDE NEAR THE BRIDGE',
            'APPROXIMATELY 15–20 MINUTES INTO THE GAME'
          ];
          const routes = ['/inside-game7', '/inside-game7-1', '/inside-game7-2', '/inside-game7-3'];

          return (
            <div key={index} style={{ position: 'relative', width: '100%', maxWidth: '765px' }}>
              <div style={{
                width: '100%',
                height: '318px',
                position: 'relative',
                cursor: 'pointer'
              }}
              onClick={() => navigate(routes[index])}>
                <img 
                  src={imagePath} 
                  alt={`Game ${index + 1}`} 
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: imagesLoaded[imagePath] ? 'none' : 'blur(20px)',
                    transition: 'filter 0.5s ease-out',
                  }}
                />
              </div>
              <div style={{
                fontFamily: 'Work Sans',
                fontStyle: 'normal',
                fontWeight: 900,
                fontSize: '20px',
                lineHeight: '128.04%',
                color: '#FFFFFF',
                marginTop: '10px'
              }}>
                {captions[index]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow - Top Right */}
      <div 
        style={{
          position: 'absolute',
          right: '50px',
          top: '50px',
          cursor: 'pointer',
          zIndex: 10
        }}
        onMouseEnter={() => setIsHoveringButton(true)}
        onMouseLeave={() => setIsHoveringButton(false)}
        onClick={handleButtonClick}
      >
        <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" 
            fill={isHoveringButton ? 'white' : 'none'} 
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
};

export default Game7;