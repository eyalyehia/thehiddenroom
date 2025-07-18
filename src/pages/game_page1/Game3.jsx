import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game3 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const [hoveredImage, setHoveredImage] = useState(null);
  const navigate = useNavigate();
  const [disappearingImage, setDisappearingImage] = useState(null);

  const handleButtonClick = () => {
    navigate('/computer');
  };

  const handleImageClick = (index, route) => {
    setDisappearingImage(index);
    setTimeout(() => {
      navigate(route);
    }, 300);
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
    '/computer/pictures/page1/game3/regular/01.png',
    '/computer/pictures/page1/game3/regular/02.png',
    '/computer/pictures/page1/game3/regular/03.png',
    '/computer/pictures/page1/game3/regular/04.png'
  ];

  // Image configurations for the grid
  const imageConfigs = [
    { path: imagePaths[0], caption: 'APPROXIMATELY 5–6 HOURS INTO THE GAME', route: '/inside-game3' },
    { path: imagePaths[1], caption: 'AVAILABLE A FEW HOURS INTO THE GAME DURING FREE EXPLORATION', route: '/inside-game3-1' },
    { path: imagePaths[2], caption: 'CAN BE FOUND EARLY IN THE GAME DURING FREE RIDE NEAR THE BRIDGE', route: '/inside-game3-2' },
    { path: imagePaths[3], caption: 'APPROXIMATELY 15–20 MINUTES INTO THE GAME', route: '/inside-game3-3' }
  ];



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
        {/* Images rendered in 2x2 grid */}
        {imageConfigs.map((config, index) => (
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
            onClick={() => handleImageClick(index, config.route)}
          >
            <div 
              style={{
                width: '100%',
                height: '318px',
                position: 'relative',
                                 border: 'none',
                boxSizing: 'border-box',
                marginBottom: '10px'
              }}
            >
              <img 
                src={config.path}
                alt={`Game 3 screenshot ${index + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  cursor: 'pointer',
                  filter: imagesLoaded[config.path] ? 'none' : 'blur(20px)',
                  transition: 'filter 0.5s ease-out',
                  display: 'block'
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
              {config.caption}
            </div>
          </div>
        ))}
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

export default Game3;