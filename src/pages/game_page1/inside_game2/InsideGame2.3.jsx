import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInComputerGameArea, getComputerGameClickableAreas } from '../../../components/constant/clickableAreas';
import getBase64 from '../../../components/common/getBase64';

const InsideGame2_3 = () => {
  const [isHoveringLeftArrow, setIsHoveringLeftArrow] = useState(false);
  const [showClickableAreas, setShowClickableAreas] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomImageLoaded, setZoomImageLoaded] = useState(false);
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
          getBase64('/computer/pictures/page1/game2/regular/04.png'),
          getBase64('/computer/pictures/page1/game2/zoomBitIn/04.png')
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

    const isInArea = isPointInComputerGameArea('game2', 4, x, y, rect.width, rect.height);
    
    if (isInArea) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  const renderClickableAreasDebug = () => {
    if (!showClickableAreas) return null;

    const areas = getComputerGameClickableAreas('game2', 4);
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
      width: '1920px',
      height: '1080px',
      background: '#FFFFFF',
      overflow: 'hidden'
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
      >
        <img 
          src="/computer/pictures/page1/game2/regular/04.png"
          alt="Game 2 screenshot 4"
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
            src="/computer/pictures/page1/game2/zoomBitIn/04.png"
            alt="Zoomed Game 2"
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

      {/* Left Navigation Arrow */}
      <button
        style={{
          position: 'absolute',
          width: '29px',
          height: '45px',
          left: '30px',
          top: '30px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          transform: 'scaleX(-1)', // הופך את החץ לכיוון שמאל
          zIndex: 40
        }}
        onClick={() => navigate('/inside-game2-2')}
        onMouseEnter={() => setIsHoveringLeftArrow(true)}
        onMouseLeave={() => setIsHoveringLeftArrow(false)}
      >
        {isHoveringLeftArrow ? (
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

export default InsideGame2_3;
