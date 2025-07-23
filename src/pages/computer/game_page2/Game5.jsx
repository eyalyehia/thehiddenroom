import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const imagePaths = [
  "/computer/pictures/page2/game1/regular/01.png",
  "/computer/pictures/page2/game1/regular/02.png",
  "/computer/pictures/page2/game1/regular/03.png",
  "/computer/pictures/page2/game1/regular/04.png",
];

const Game5 = () => {
  const [isHoveringNextButton, setIsHoveringNextButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();
  const [disappearingImage, setDisappearingImage] = useState(null);

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

  const handleNextClick = () => {
    navigate('/computer2');
  };

  const handleImageClick = (index, route) => {
    setDisappearingImage(index);
    setTimeout(() => {
      navigate(route);
    }, 300);
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
            'APPROXIMATELY 7 HOURS INTO THE GAME',
            'APPROXIMATELY 4 HOURS INTO THE GAME',
            'APPROXIMATELY 2 HOURS INTO THE GAME',
            'APPROXIMATELY 3-5 HOURS INTO THE GAME'
          ];
          const routes = ['/inside-game5', '/inside-game5-1', '/inside-game5-2', '/inside-game5-3'];

          return (
            <div 
              key={index} 
              style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '765px',
                transform: hoveredImage === index ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-out',
                zIndex: hoveredImage === index ? 10 : 1,
                cursor: 'pointer',
                opacity: disappearingImage === index ? 0 : 1,
              }}
              onMouseEnter={() => setHoveredImage(index)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => handleImageClick(index, routes[index])}
            >
              <div style={{
                width: '100%',
                height: '318px',
                position: 'relative',
              }}>
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

      {/* Right Navigation Arrow - Top Right */}
      <button
        className="transition-all duration-200 ease-in-out border-0 outline-none focus:outline-none cursor-pointer"
        style={{
          position: 'absolute',
          right: '30px',
          top: '30px',
          width: '29px',
          height: '45px',
          zIndex: 10,
          transform: isHoveringNextButton ? 'scale(0.90)' : 'scale(1)',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={() => setIsHoveringNextButton(true)}
        onMouseLeave={() => setIsHoveringNextButton(false)}
        onClick={handleNextClick}
      >
        <svg 
          width="29" 
          height="45" 
          viewBox="0 0 29 45" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <path 
            d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" 
            fill={isHoveringNextButton ? 'white' : 'none'} 
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </button>
    </div>
  );
};

export default Game5;