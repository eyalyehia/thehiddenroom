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
  const navigate = useNavigate();

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
    navigate('/game6');
  };

  return (
    <div style={{
      position: 'relative',
      width: '1920px',
      height: '1080px',
      backgroundColor: '#1D1C1A',
      margin: 0,
      padding: '100px 150px',
      overflow: 'hidden',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '40px',
      boxSizing: 'border-box'
    }}>
      {/* Image 1 - Top Left */}
      <div style={{
        width: '765px',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
      onClick={() => navigate('/inside-game5')}>
        <div style={{
          width: '100%',
          height: '318px',
          position: 'relative'
        }}>
          <img 
            src={imagePaths[0]} 
            alt="Game 1" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: imagesLoaded[imagePaths[0]] ? 'none' : 'blur(20px)',
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
          textAlign: 'left',
          paddingLeft: '10px',
          marginTop: '10px'
        }}>
          APPROXIMATELY 15 MINUTES INTO THE GAME
        </div>
      </div>

      {/* Image 2 - Top Right */}
      <div style={{
        width: '765px',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
      onClick={() => navigate('/inside-game5-1')}>
        <div style={{
          width: '100%',
          height: '318px',
          position: 'relative'
        }}>
          <img 
            src={imagePaths[1]} 
            alt="Game 2" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: imagesLoaded[imagePaths[1]] ? 'none' : 'blur(20px)',
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
          textAlign: 'left',
          paddingLeft: '10px',
          marginTop: '10px'
        }}>
          APPROXIMATELY 17 MINUTES INTO THE GAME
        </div>
      </div>

      {/* Image 3 - Bottom Left */}
      <div style={{
        width: '765px',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
      onClick={() => navigate('/inside-game5-2')}>
        <div style={{
          width: '100%',
          height: '318px',
          position: 'relative'
        }}>
          <img 
            src={imagePaths[2]} 
            alt="Game 3" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: imagesLoaded[imagePaths[2]] ? 'none' : 'blur(20px)',
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
          textAlign: 'left',
          paddingLeft: '10px',
          marginTop: '10px'
        }}>
          APPROXIMATELY 2 HOURS AND 41 MINUTES INTO THE GAME
        </div>
      </div>

      {/* Image 4 - Bottom Right */}
      <div style={{
        width: '765px',
        position: 'relative',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}
      onClick={() => navigate('/inside-game5-3')}>
        <div style={{
          width: '100%',
          height: '318px',
          position: 'relative'
        }}>
          <img 
            src={imagePaths[3]} 
            alt="Game 4" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: imagesLoaded[imagePaths[3]] ? 'none' : 'blur(20px)',
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
          textAlign: 'left',
          paddingLeft: '10px',
          marginTop: '10px'
        }}>
          APPROXIMATELY 1 HOUR AND 13 MINUTES INTO THE GAME
        </div>
      </div>

      {/* Right Navigation Arrow - Top Right */}
      <div 
        style={{
          position: 'absolute',
          right: '50px',
          top: '50px',
          cursor: 'pointer',
          zIndex: 10
        }}
        onMouseEnter={() => setIsHoveringNextButton(true)}
        onMouseLeave={() => setIsHoveringNextButton(false)}
        onClick={handleNextClick}
      >
        <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" 
            fill={isHoveringNextButton ? 'white' : 'none'} 
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
};

export default Game5;