import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInComputerGameArea } from '../../../../components/constant/clickableAreas';
import getBase64 from '../../../../components/common/getBase64';

const InsideGame71 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  // הסרתי את showClickableAreas
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomImageLoaded, setZoomImageLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // קונפיגורציה לתמונות מוגדלות
  const zoomConfigs = useMemo(() => ({
    2: { 
      zoomSize: 'w-[27px]', 
      zoomHeight: 'h-[56px]', 
      zoomOffset: { x: -38, y: -145 } 
    }
  }), []);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all([
          getBase64('/computer/pictures/page2/game3/regular/02.png'),
          getBase64('/computer/pictures/page2/game3/zoomBitIn/02.png'),
          getBase64('/computer/pictures/page2/game3/zoomIn/02.png')
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

    const isInArea = isPointInComputerGameArea('game7', 2, x, y, rect.width, rect.height);
    
    if (isInArea) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  const handleClick = () => {
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
        onClick={handleClick}
      >
        <img
          src="/computer/pictures/page2/game3/regular/02.png"
          alt="Game 7 Scene 2"
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
      {isHovering && (
        <div
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: `translate(${zoomConfigs[2].zoomOffset.x}px, ${zoomConfigs[2].zoomOffset.y}px)`,
            zIndex: 30,
            cursor: 'pointer',
            pointerEvents: 'auto'
          }}
          onClick={handleClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div style={{
            width: zoomConfigs[2].zoomSize.replace('w-[', '').replace('px]', '') + 'px',
            height: zoomConfigs[2].zoomHeight.replace('h-[', '').replace('px]', '') + 'px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
          <img
            src="/computer/pictures/page2/game3/zoomBitIn/02.png"
            alt="Zoomed Game 7"
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
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowModal(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '838px',
              height: '664px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/computer/pictures/page2/game3/zoomIn/02.png"
              alt="Full size Game 7"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain'
              }}
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
                }}>APPROXIMATELY 3-4 HOURS INTO THE GAME</div>
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
                  }}>On the edge of a mountain, during the late-night hours in the game,you can see</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                  lineHeight: '20px',
                    height: '20px',
                  opacity: 0.7,
                  // overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}> the ghost of a woman. If you wait long enough, you might even hear her scream.</div>
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
          width: '29px',
          height: '45px',
          right: '30px',
          top: '30px',
          background: 'none',
          padding: 0,
          zIndex: 1000,
          transform: isHoveringButton ? 'scale(0.90)' : 'scale(1)',
          backgroundColor: 'transparent'
        }}
        onClick={() => navigate('/game7')}
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

export default InsideGame71;
