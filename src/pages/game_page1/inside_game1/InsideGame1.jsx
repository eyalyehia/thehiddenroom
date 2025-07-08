import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInComputerGameArea, getComputerGameClickableAreas } from '../../../components/constant/clickableAreas';
import getBase64 from '../../../components/common/getBase64';

// Memoized image component with loading state
const MemoizedImage = React.memo(({ src, alt, className, onClick, style, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadImage = async () => {
      try {
        const base64Data = await getBase64(src);
        if (isMounted) {
          setBase64(base64Data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error loading image:', error);
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadImage();

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <img 
      src={loading ? base64 : src}
      alt={alt || 'Image'} 
      className={`${className} ${loading ? 'blur-sm' : ''}`}
      onClick={onClick}
      loading="lazy"
      decoding="async"
      style={{
        ...style,
        transition: 'filter 0.3s ease-in-out',
      }}
      {...props}
    />
  );
});

const InsideGame1 = () => {
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [showClickableAreas, setShowClickableAreas] = useState(false);
  const [hoveredArea, setHoveredArea] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();
  const hoverTimeoutRef = useRef(null);
  const mainImageRef = useRef(null);

  // Clean up hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const isInArea = isPointInComputerGameArea('game1', 1, x, y, rect.width, rect.height);
    
    if (isInArea && !hoveredArea) {
      setHoveredArea(true);
    } else if (!isInArea && hoveredArea) {
      // Add a small delay before removing hover state
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredArea(false);
      }, 50);
    }

    // Change cursor based on clickable area
    if (mainImageRef.current) {
      mainImageRef.current.style.cursor = isInArea ? 'pointer' : 'default';
    }
  };

  const handleImageClick = () => {
    setSelectedImage(1);
  };

  const renderClickableAreasDebug = () => {
    if (!showClickableAreas) return null;

    const areas = getComputerGameClickableAreas('game1', 1);
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

  // קונפיגורציה לתמונה מוגדלת
  const zoomConfig = useMemo(() => ({
    zoomSize: 'w-[450px]',
    zoomHeight: 'h-[310px]',
    zoomOffset: { x: 120, y: -150 }
  }), []);

  // קונפיגורציה למודאל
  const modalConfig = useMemo(() => ({
    maxWidth: 'max-w-[959px]',
    maxHeight: 'max-h-[663px]',
    position: 'flex items-center justify-center',
    marginTop: '0',
    marginLeft: '0'
  }), []);

  return (
    <div className="relative w-[1920px] h-[1080px] bg-white overflow-hidden">
      {/* כפתור להצגת אזורים לחיצים */}
      <button
        className="absolute top-5 left-5 bg-red-500 text-white px-3 py-1 rounded text-sm z-50"
        onClick={() => setShowClickableAreas(!showClickableAreas)}
      >
        {showClickableAreas ? 'הסתר אזורים' : 'הראה אזורים'}
      </button>

      <div 
        className="relative w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
          }
          setHoveredArea(false);
        }}
      >
        <MemoizedImage
          ref={mainImageRef}
          src="/computer/pictures/page1/game1/regular/01.png"
          alt="Easter egg 01"
          className="w-full h-full object-cover"
          style={{
            cursor: hoveredArea ? 'pointer' : 'default',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            transition: 'all 0.3s ease-in-out'
          }}
        />
        {renderClickableAreasDebug()}
      </div>
      
      {/* תמונה מוגדלת בעת hover */}
      {hoveredArea && !selectedImage && (
        <div
          className="fixed z-40 cursor-pointer"
          style={{
            left: `50%`,
            top: `50%`,
            transform: `translate(${zoomConfig.zoomOffset.x}px, ${zoomConfig.zoomOffset.y}px)`,
            willChange: 'transform',
            pointerEvents: 'auto'
          }}
          onClick={handleImageClick}
          onMouseEnter={() => {
            if (hoverTimeoutRef.current) {
              clearTimeout(hoverTimeoutRef.current);
            }
            setHoveredArea(true);
          }}
          onMouseLeave={() => {
            hoverTimeoutRef.current = setTimeout(() => {
              setHoveredArea(false);
            }, 50);
          }}
        >
          <MemoizedImage
            src="/computer/pictures/page1/game1/zoonBitIn/01.png"
            alt="Zoomed Easter egg"
            className={`${zoomConfig.zoomSize} ${zoomConfig.zoomHeight} object-cover border border-white shadow-2xl bg-black/90`}
            style={{ 
              willChange: 'transform, opacity',
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              opacity: 1,
              transition: 'all 0.3s ease-in-out'
            }}
          />
        </div>
      )}

      {/* Modal Display */}
      {selectedImage && (
        <div 
          className={`fixed inset-0 bg-black/80 z-50 p-8 ${modalConfig.position}`}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedImage(null);
            }
          }}
          style={{
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <div className={`relative w-full h-auto bg-transparent ${modalConfig.maxWidth} mx-auto`}>
            <MemoizedImage
              src="/computer/pictures/page1/game1/zoomIn/01.png"
              alt="Full screen Easter egg"
              className={`w-full h-auto object-cover ${modalConfig.maxHeight} border border-white shadow-2xl`}
              style={{ 
                imageRendering: 'crisp-edges',
                animation: 'scaleIn 0.3s ease-in-out'
              }}
            />
            
            <div 
              className="absolute text-white"
              style={{
                position: 'absolute',
                width: '645px',
                height: '92px',
                left: '0',
                bottom: '-110px',
                fontFamily: 'Work Sans',
                fontStyle: 'normal',
                fontWeight: 900,
                fontSize: '20px',
                lineHeight: '128.04%',
                color: '#FFFFFF',
                animation: 'fadeIn 0.5s ease-in-out'
              }}
            >
              <div className="text-left">
                <div className="font-bold text-xl mb-1">APPROXIMATELY 15 MINUTES INTO THE GAME</div>
                <div className="font-normal text-base opacity-70 text-gray-300">
                  The toy robot is a reminder of a boy named Sam, who died in the first game. Ellie meant to leave it at his grave, but never did.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation Arrow */}
      <button
        className="absolute right-[30px] top-[30px] bg-transparent border-none cursor-pointer p-0 z-[60]"
        style={{ width: '29px', height: '45px' }}
        onClick={() => navigate('/game1')}
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

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
          from { 
            transform: scale(0.95);
            opacity: 0;
          }
          to { 
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default InsideGame1;