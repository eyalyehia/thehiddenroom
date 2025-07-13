import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInComputerGameArea, getComputerGameClickableAreas } from '../../../../components/constant/clickableAreas';
import getBase64 from '../../../../components/common/getBase64';

const InsideGame5_3 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [showClickableAreas, setShowClickableAreas] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomImageLoaded, setZoomImageLoaded] = useState(false);
  const [modalImageLoaded, setModalImageLoaded] = useState(false);
  const navigate = useNavigate();

  // קונפיגורציה לתמונות מוגדלות
  const zoomConfigs = useMemo(() => ({
    4: { 
      zoomSize: 'w-[450px]', 
      zoomHeight: 'h-[310px]', 
      zoomOffset: { x: 120, y: -150 } 
    }
  }), []);

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all([
          getBase64('/computer/pictures/page2/game1/regular/04.png'),
          getBase64('/computer/pictures/page2/game1/zoomBitIn/04.png'),
          getBase64('/computer/pictures/page2/game1/zoomIn/04.png')
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

    const isInArea = isPointInComputerGameArea('game5', 4, x, y, rect.width, rect.height);
    
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

  const renderClickableAreasDebug = () => {
    if (!showClickableAreas) return null;

    const areas = getComputerGameClickableAreas('game5', 4);
    return areas.map((area, index) => (
      <div
        key={`debug-${index}`}
        style={{
          position: 'absolute',
          left: `${area.x * 100}%`,
          top: `${area.y * 100}%`,
          width: `${area.width * 100}%`,
          height: `${area.height * 100}%`,
          border: '2px solid rgba(255, 0, 0, 0.8)',
          backgroundColor: 'rgba(255, 0, 0, 0.2)',
          pointerEvents: 'none',
          zIndex: 15,
        }}
      />
    ));
  };

  return (
    <div style={{ 
      position: 'relative',
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
      background: '#1D1C1A'
    }}>
      {/* כפתור להצגת אזורים לחיצים */}
      <button
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          padding: '8px 16px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 20
        }}
        onClick={() => setShowClickableAreas(!showClickableAreas)}
      >
        {showClickableAreas ? 'הסתר אזורים' : 'הראה אזורים'}
      </button>

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
          src="/computer/pictures/page2/game1/regular/04.png"
          alt="Game 5 Inside 4"
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
        {renderClickableAreasDebug()}
      </div>
      
      {/* תמונה מוגדלת בעת hover */}
      {isHovering && (
        <div
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: `translate(${zoomConfigs[4].zoomOffset.x}px, ${zoomConfigs[4].zoomOffset.y}px)`,
            zIndex: 30,
            pointerEvents: 'none',
            width: zoomConfigs[4].zoomSize.replace('w-[', '').replace('px]', '') + 'px',
            height: zoomConfigs[4].zoomHeight.replace('h-[', '').replace('px]', '') + 'px',
            cursor: 'pointer',
            boxSizing: 'border-box',
            border: '2px solid #FFFFFF'
          }}
        >
          <img
            src="/computer/pictures/page2/game1/zoomBitIn/04.png"
            alt="Zoomed Game 5"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: zoomImageLoaded ? 'none' : 'blur(20px)',
              transition: 'filter 0.3s ease-in-out',
              cursor: 'pointer'
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
              width: '809px',
              height: '663px',
              display: 'flex',
              flexDirection: 'column',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/computer/pictures/page2/game1/zoomIn/04.png"
              alt="Modal Game 5"
              style={{
                width: '100%',
                height: '100%',
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
                }}>APPROXIMATELY 3-5 HOURS INTO THE GAME</div>
                <div style={{
                  fontWeight: 400,
                  fontSize: '20px',
                  height: '40px',
                  lineHeight: '20px',
                  opacity: 0.7,
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: '2',
                  WebkitBoxOrient: 'vertical',
                  whiteSpace: 'pre-line'
                }}>On a small island, there's a tall tower styled like Assassin's Creed. At the top, you hear the eagle screech and spot a hay pile below.</div>
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

export default InsideGame5_3;
