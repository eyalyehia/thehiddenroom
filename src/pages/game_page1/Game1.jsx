import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../components/common/getBase64';

const Game1 = () => {
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [_imagePreviews, setImagePreviews] = useState({});
  const [imagesLoaded, setImagesLoaded] = useState({});
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/computer');
  };

  const _handleImageClick = (index) => {
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
        {/* Top Left Image */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '765px' }}>
          <div 
            style={{
              width: '100%',
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
            APPROXIMATELY 15 MINUTES INTO THE GAME
          </div>
        </div>

        {/* Top Right Image */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '765px' }}>
          <div 
            style={{
              width: '100%',
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
            APPROXIMATELY 17 MINUTES INTO THE GAME
          </div>
        </div>

        {/* Bottom Left Image */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '765px' }}>
          <div 
            style={{
              width: '100%',
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
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: '20px',
            lineHeight: '128.04%',
            color: '#FFFFFF',
            marginTop: '10px'
          }}>
            APPROXIMATELY 2 HOURS AND 41 MINUTES INTO THE GAME
          </div>
        </div>

        {/* Bottom Right Image */}
        <div style={{ position: 'relative', width: '100%', maxWidth: '765px' }}>
          <div 
            style={{
              width: '100%',
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
            fontFamily: 'Work Sans',
            fontStyle: 'normal',
            fontWeight: 900,
            fontSize: '20px',
            lineHeight: '128.04%',
            color: '#FFFFFF',
            marginTop: '10px'
          }}>
            APPROXIMATELY 1 HOUR AND 13 MINUTES INTO THE GAME
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
        onClick={handleNextClick}
        onMouseEnter={() => setIsHoveringArrowButton(true)}
        onMouseLeave={() => setIsHoveringArrowButton(false)}
      >
        {isHoveringArrowButton ? (
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

export default Game1; 