import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game8 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState({});
  const navigate = useNavigate();

  const imagePaths = [
    "/computer/pictures/page2/game4/regular/01.png",
    "/computer/pictures/page2/game4/regular/02.png",
    "/computer/pictures/page2/game4/regular/03.png",
    "/computer/pictures/page2/game4/regular/04.png",
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

  const handleButtonClick = () => {
    navigate('/computer2');
  };

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
      onClick={() => navigate('/inside-game8')}>
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
          APPROXIMATELY 20–30 MINUTES INTO THE GAME
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
      onClick={() => navigate('/inside-game8-1')}>
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
          APPROXIMATELY 3–5 HOURS INTO THE GAME
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
      onClick={() => navigate('/inside-game8-2')}>
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
          UNLOCKED AROUND 6–7 HOURS INTO THE GAME
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
      onClick={() => navigate('/inside-game8-3')}>
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
          APPROXIMATELY 6–8 HOURS INTO THE GAME
        </div>
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

export default Game8;