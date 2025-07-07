import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../components/common/getBase64';

const Game1 = () => {
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviews, setImagePreviews] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState({});
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/game2');
  };

  const handleImageClick = (index) => {
    setSelectedImage(selectedImage === index ? null : index);
  };

  // Generate base64 previews for all images
  useEffect(() => {
    const loadImagePreviews = async () => {
      const previews = {};
      const loaded = {};
      
      for (let i = 0; i < imagePaths.length; i++) {
        const path = imagePaths[i];
        const preview = await getBase64(path);
        if (preview) {
          previews[path] = preview;
          setImagePreviews({...previews});
          
          // Preload the actual image
          const img = new Image();
          img.src = path;
          img.onload = () => {
            loaded[path] = true;
            setImagesLoaded({...loaded});
          };
        }
      }
    };

    loadImagePreviews();
  }, []);

  // Image paths
  const imagePaths = [
    '/computer/pictures/page1/game1/regular/01.png',
    '/computer/pictures/page1/game1/regular/02.png',
    '/computer/pictures/page1/game1/regular/03.png',
    '/computer/pictures/page1/game1/regular/04.png'
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
            onClick={() => navigate('/inside-game1')}
          >
            <img 
              src={imagePaths[0]}
              alt="Game screenshot 1"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'pointer',
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
            width: '461px',
            height: '26px',
            left: '0',
            top: '333px' // 318px (image height) + 15px gap
          }}>
            APPROXIMATELY 15 MINUTES INTO THE GAME
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
            onClick={() => navigate('/inside-game1-2')}
          >
            <img 
              src={imagePaths[1]}
              alt="Game screenshot 2"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'pointer',
                filter: imagesLoaded[imagePaths[1]] ? 'none' : 'blur(20px)',
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
            width: '462px',
            height: '26px',
            left: '0',
            top: '333px' // 318px (image height) + 15px gap
          }}>
            APPROXIMATELY 17 MINUTES INTO THE GAME
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
            onClick={() => navigate('/inside-game1-3')}
          >
            <img 
              src={imagePaths[2]}
              alt="Game screenshot 3"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'pointer',
                filter: imagesLoaded[imagePaths[2]] ? 'none' : 'blur(20px)',
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
            width: '603px',
            height: '26px',
            left: '0',
            top: '333px' // 318px (image height) + 15px gap
          }}>
            APPROXIMATELY 2 HOURS AND 41 MINUTES INTO THE GAME
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
            onClick={() => navigate('/inside-game1-4')}
          >
            <img 
              src={imagePaths[3]}
              alt="Game screenshot 4"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                cursor: 'pointer',
                filter: imagesLoaded[imagePaths[3]] ? 'none' : 'blur(20px)',
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
            width: '586px',
            height: '26px',
            left: '0',
            top: '333px' // 318px (image height) + 15px gap
          }}>
            APPROXIMATELY 1 HOUR AND 13 MINUTES INTO THE GAME
          </div>
        </div>
      </div>

      {/* Navigation Arrow */}
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
        onMouseEnter={() => setIsHoveringArrowButton(true)}
        onMouseLeave={() => setIsHoveringArrowButton(false)}
      >
        {isHoveringArrowButton ? (
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

export default Game1; 