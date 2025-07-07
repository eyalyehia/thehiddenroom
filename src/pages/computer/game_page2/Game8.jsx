import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Game8 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
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

  const handleBackClick = () => {
    navigate('/game7');
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

      {/* Left Navigation Arrow - Top Left */}
      <div 
        style={{
          position: 'absolute',
          left: '50px',
          top: '50px',
          cursor: 'pointer',
          zIndex: 10
        }}
        onMouseEnter={() => setIsHoveringBackButton(true)}
        onMouseLeave={() => setIsHoveringBackButton(false)}
        onClick={handleBackClick}
      >
        <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M24.6045 47L1 24.524L24.6045 2L31 8.354L14.797 24.47L31 40.646L24.6045 47Z" 
            fill={isHoveringBackButton ? 'white' : 'none'} 
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