import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game7 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();
  const [disappearingImage, setDisappearingImage] = useState(null);

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
            'APPROXIMATELY 15–30 MINUTES INTO THE GAME',
            'APPROXIMATELY 3-4 HOURS INTO THE GAME',
            'APPROXIMATELY 40 MINUTES INTO THE GAME',
            'APPROXIMATELY 3–5 HOURS INTO THE GAME'
          ];
          const routes = ['/inside-game7', '/inside-game7-1', '/inside-game7-2', '/inside-game7-3'];

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
                marginTop: '10px',
                maxHeight: '40px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical'
              }}>
                {captions[index]}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow - Top Right */}
      <button
        className="transition-all duration-200 ease-in-out border-0 outline-none focus:outline-none cursor-pointer"
        style={{
          position: 'absolute',
          right: '30px',
          top: '30px',
          width: '29px',
          height: '45px',
          zIndex: 10,
          transform: isHoveringButton ? 'scale(0.90)' : 'scale(1)',
          backgroundColor: 'transparent'
        }}
        onMouseEnter={() => setIsHoveringButton(true)}
        onMouseLeave={() => setIsHoveringButton(false)}
        onClick={handleButtonClick}
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
            fill={isHoveringButton ? 'white' : 'none'} 
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </button>
    </div>
  );
};

export default Game7;