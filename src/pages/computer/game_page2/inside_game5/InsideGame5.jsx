import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInComputerGameArea } from '../../../../components/constant/clickableAreas';
import getBase64 from '../../../../components/common/getBase64';

const InsideGame5 = () => {
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
    1: { 
      zoomSize: 'w-[65px]', 
      zoomHeight: 'h-[85px]', 
      zoomOffset: { x: 0, y: -135 } 
    }
  }), []);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all([
          getBase64('/computer/pictures/page2/game1/regular/01.png'),
          getBase64('/computer/pictures/page2/game1/zoomBitIn/01.png'),
          getBase64('/computer/pictures/page2/game1/zoomIn/01.png')
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

    const isInArea = isPointInComputerGameArea('game5', 1, x, y, rect.width, rect.height);
    
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
          src="/computer/pictures/page2/game1/regular/01.png"
          alt="Game 5 Inside 1"
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
            transform: `translate(${zoomConfigs[1].zoomOffset.x}px, ${zoomConfigs[1].zoomOffset.y}px)`,
            zIndex: 30,
            pointerEvents: 'auto',
            width: zoomConfigs[1].zoomSize.replace('w-[', '').replace('px]', '') + 'px',
            height: zoomConfigs[1].zoomHeight.replace('h-[', '').replace('px]', '') + 'px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
          onMouseEnter={() => setIsHoveringZoomImage(true)}
          onMouseLeave={() => setIsHoveringZoomImage(false)}
          onClick={() => setShowModal(true)}
        >
          <img
            src="/computer/pictures/page2/game1/zoomBitIn/01.png"
            alt="Zoomed Game 5"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill',
              filter: zoomImageLoaded ? 'none' : 'blur(20px)',
              transition: 'filter 0.3s ease-in-out',
              cursor: 'pointer',
              border: '2px solid #FFFFFF',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            onLoad={() => setZoomImageLoaded(true)}
          />
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
              width: '526px',
              height: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/computer/pictures/page2/game1/zoomIn/01.png"
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
                bottom: '-110px',
                fontFamily: 'Work Sans'
              }}
            >
              <div className="text-left">
                <div style={{
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  marginBottom: '0'
                }}>APPROXIMATELY 7 HOURS INTO THE GAME</div>
                <div style={{
                  width: '907px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0px'
                }}>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>A missing person poster written in Hebrew appears</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>on a bulletin board. Scanning its barcode redirects</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>you to Rick Astley's "Never Gonna Give You Up."</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Button */}
      <button
        className="transition-all duration-200 ease-in-out border-0 outline-none focus:outline-none cursor-pointer"
        style={{
          position: 'absolute',
          width: '33px',
          height: '49px',
          right: '30px',
          top: '30px',
          background: 'none',
          padding: 0,
          zIndex: 1000,
          transform: isHoveringButton ? 'scale(0.90)' : 'scale(1)',
          backgroundColor: 'transparent'
        }}
        onClick={() => navigate('/game5')}
        onMouseEnter={() => setIsHoveringButton(true)}
        onMouseLeave={() => setIsHoveringButton(false)}
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
            fill={isHoveringButton ? "white" : "none"}
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </button>
    </div>
  );
};

export default InsideGame5;
