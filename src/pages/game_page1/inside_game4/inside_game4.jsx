import React, { useState, useEffect, useMemo } from 'react';
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

const InsideGame4 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [showClickableAreas, setShowClickableAreas] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // קונפיגורציה לתמונה מוגדלת
  const zoomConfig = useMemo(() => ({
    zoomSize: 'w-[450px]',
    zoomHeight: 'h-[310px]',
    zoomOffset: { x: 120, y: -150 }
  }), []);

  // קונפיגורציה למודאל
  const modalConfig = useMemo(() => ({
    width: '726px',
    height: '663px',
    position: 'flex items-center justify-center'
  }), []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const isInArea = isPointInComputerGameArea('game4', 1, x, y, rect.width, rect.height);
    
    if (isInArea) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  const handleImageClick = () => {
    setSelectedImage(1);
  };

  const renderClickableAreasDebug = () => {
    if (!showClickableAreas) return null;

    const areas = getComputerGameClickableAreas('game4', 1);
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
    <div className="relative w-full h-screen bg-white overflow-hidden">
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
        onMouseLeave={() => setIsHovering(false)}
      >
        <MemoizedImage
          src="/computer/pictures/page1/game4/regular/01.png"
          alt="Game 4 Detail 1"
          className="w-full h-full object-cover"
          style={{
            cursor: isHovering ? 'pointer' : 'default',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            transition: 'all 0.3s ease-in-out'
          }}
        />
        {renderClickableAreasDebug()}
      </div>
      
      {/* תמונה מוגדלת בעת hover */}
      {isHovering && !selectedImage && (
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
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <MemoizedImage
            src="/computer/pictures/page1/game4/zoomBitIn/01.png"
            alt="Zoomed Game 4"
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
          <div className="relative" style={{ width: modalConfig.width, height: modalConfig.height }}>
            <MemoizedImage
              src="/computer/pictures/page1/game4/zoomIn/01.png"
              alt="Full screen Game 4"
              className="w-full h-full object-cover"
              style={{ 
                imageRendering: 'crisp-edges',
                animation: 'scaleIn 0.3s ease-in-out'
              }}
            />
            
            <div 
              style={{
                position: 'absolute',
                left: '0',
                bottom: '-92px',
                width: '649px',
                color: '#FFFFFF',
                fontFamily: 'Work Sans',
                textAlign: 'left'
              }}
            >
              <div 
                style={{
                  fontSize: '20px',
                  fontWeight: 900,
                  lineHeight: '128.04%',
                  marginBottom: '4px'
                }}
              >
                APPROXIMATELY 20–30 MINUTES INTO THE GAME
              </div>
              <div 
                style={{
                  fontSize: '16px',
                  lineHeight: '128.04%',
                  opacity: 0.7
                }}
              >
                Kratos knocks out one of Thor's teeth during their fight. No matter when or how often you return, the tooth will always remain on the ground.
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Navigation Arrow */}
      <button
        className="absolute right-[30px] top-[30px] bg-transparent border-none cursor-pointer p-0 z-[60]"
        style={{ width: '29px', height: '45px' }}
        onClick={() => navigate('/game4')}
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

export default InsideGame4;
