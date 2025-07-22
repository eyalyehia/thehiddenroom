import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInComputerGameArea } from '../../../../components/constant/clickableAreas';
import getBase64 from '../../../../components/common/getBase64';

const InsideGame5_2 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  // הסרתי את showClickableAreas
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomImageLoaded, setZoomImageLoaded] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const [isHoveringZoomImage, setIsHoveringZoomImage] = useState(false);
  const navigate = useNavigate();

  // קונפיגורציה לתמונות מוגדלות
  const zoomConfigs = useMemo(() => ({
    3: { 
      zoomSize: 'w-[78px]', 
      zoomHeight: 'h-[56px]', 
      zoomOffset: { x: 350, y: -265 } 
    }
  }), []);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all([
          getBase64('/computer/pictures/page2/game1/regular/03.png'),
          getBase64('/computer/pictures/page2/game1/zoomBitIn/03.png'),
          getBase64('/computer/pictures/page2/game1/zoomIn/03.png')
        ]);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    loadImages();
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const isInArea = isPointInComputerGameArea('game5', 3, x, y, rect.width, rect.height);
    
    if (isInArea) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  const handleZoomClick = () => {
    if (isHovering) {
      setShowModal(true);
    }
  };

  // הסרתי את renderClickableAreasDebug

  return (
    <div style={{ 
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#1D1C1A'
    }}>
      {/* הסרתי את כפתור הצגת האזורים האדומים */}

      <div 
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleZoomClick}
      >
        <img
          src="/computer/pictures/page2/game1/regular/03.png"
          alt="Game 5 Inside 3"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: imageLoaded ? 'none' : 'blur(20px)',
            transition: 'filter 0.3s ease-in-out',
            cursor: isHovering ? 'pointer' : 'default'
          }}
          onLoad={() => setImageLoaded(true)}
        />
        {/* הסרתי את renderClickableAreasDebug */}
      </div>
      
      {/* תמונה מוגדלת בעת hover */}
      {(isHovering || isHoveringZoomImage) && (
        <div
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: `translate(${zoomConfigs[3].zoomOffset.x}px, ${zoomConfigs[3].zoomOffset.y}px)`,
            zIndex: 30,
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
          onClick={() => setShowModal(true)}
          onMouseEnter={() => setIsHoveringZoomImage(true)}
          onMouseLeave={() => setIsHoveringZoomImage(false)}
        >
          <div style={{
            width: zoomConfigs[3].zoomSize.replace('w-[', '').replace('px]', '') + 'px',
            height: zoomConfigs[3].zoomHeight.replace('h-[', '').replace('px]', '') + 'px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
          <img
            src="/computer/pictures/page2/game1/zoomBitIn/03.png"
            alt="Zoomed Game 5"
              className="border border-white shadow-2xl"
            style={{
              width: '100%',
              height: '100%',
                objectFit: 'fill',
              filter: zoomImageLoaded ? 'none' : 'blur(20px)',
              transition: 'filter 0.3s ease-in-out',
                willChange: 'transform, opacity',
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                opacity: 1
            }}
            onLoad={() => setZoomImageLoaded(true)}
          />
          </div>
        </div>
      )}

      {/* מודאל תמונה מוגדלת */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 50,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '424px',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/computer/pictures/page2/game1/zoomIn/03.png"
              alt="Modal Game 5"
              style={{
                width: '100%',
                height: '663px',
                objectFit: 'contain',
                filter: modalImageLoaded ? 'none' : 'blur(20px)',
                transition: 'filter 0.3s ease-in-out'
              }}
              onLoad={() => setModalImageLoaded(true)}
            />
            <div
              className="absolute text-white"
              style={{
                position: 'absolute',
                width: '907px',
                left: '0',
                bottom: '-80px',
                fontFamily: 'Work Sans'
              }}
            >
              <div className="text-left">
                <div style={{
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  marginBottom: '0'
                }}>APPROXIMATELY 2 HOURS INTO THE GAME</div>
                <div style={{
                  width: '907px',
                  height: '40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0px'
                }}>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    height: '20px',
                    opacity: 0.7,
                    // overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>At one point in the game, you can find a television </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                  lineHeight: '20px',
                    height: '20px',
                  opacity: 0.7,
                  // overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>that briefly displays villains from past Far Cry games.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Button */}
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
          zIndex: 1000
        }}
        onClick={() => navigate('/game5')}
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

export default InsideGame5_2;
