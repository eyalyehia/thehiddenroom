import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInComputerGameArea } from '../../../components/constant/clickableAreas';
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
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  // הסרתי את showClickableAreas
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

  // הסרתי את renderClickableAreasDebug

  // קונפיגורציה לתמונה מוגדלת
  const zoomConfig = useMemo(() => ({
    zoomSize: 'w-[92px]',
    zoomHeight: 'h-[137px]',
    zoomOffset: { x: 147, y: -215 }
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
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* הסרתי את כפתור הצגת האזורים האדומים */}

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
        {/* הסרתי את renderClickableAreasDebug */}
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
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            width: zoomConfig.zoomSize.replace('w-[', '').replace(']', ''),
            height: zoomConfig.zoomHeight.replace('h-[', '').replace(']', ''),
            background: 'transparent',
            zIndex: 40
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
            style={{ 
              width: '100%',
              height: '100%',
              objectFit: 'fill',
              willChange: 'transform, opacity',
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
              opacity: 1,
              transition: 'all 0.3s ease-in-out',
              border: '2px solid #FFFFFF',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
            draggable={false}
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
              className={`w-full h-auto object-cover ${modalConfig.maxHeight} shadow-2xl`}
              style={{ 
                imageRendering: 'crisp-edges',
                animation: 'scaleIn 0.3s ease-in-out'
              }}
            />
            
            <div 
              className="absolute text-white"
              style={{
                position: 'absolute',
                width: '648px',
                left: '0',
                bottom: '-85px',
                fontFamily: 'Work Sans'
              }}
            >
              <div className="text-left">
                <div style={{
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  marginBottom: '0'
                }}>APPROXIMATELY 15 MINUTES INTO THE GAME</div>
                <div style={{
                  width: '648px',
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
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>The toy robot is a reminder of a boy named Sam, who died in</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    height: '20px',
                    opacity: 0.7,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>the first game. Ellie meant to leave it at his grave, but never did.</div>
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
        onClick={() => navigate('/game1')}
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