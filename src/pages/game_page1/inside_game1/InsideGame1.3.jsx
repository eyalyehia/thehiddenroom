import React, { useState, useEffect, useMemo } from 'react';
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

const InsideGame1_3 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  // הסרתי את showClickableAreas
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // קונפיגורציה לתמונה מוגדלת
  const zoomConfig = useMemo(() => ({
    zoomSize: 'w-[81px]',
    zoomHeight: 'h-[63px]',
    zoomOffset: { x: 0, y: 225 }
  }), []);

  // קונפיגורציה למודאל
  const modalConfig = useMemo(() => ({
    maxWidth: 'max-w-[1079px]',
    maxHeight: 'max-h-[663px]',
    position: 'flex items-center justify-center',
    marginTop: '0',
    marginLeft: '0'
  }), []);

  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const isInArea = isPointInComputerGameArea('game1', 3, x, y, rect.width, rect.height);
    
    if (isInArea) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  const handleImageClick = () => {
    setSelectedImage(3);
  };

  // הסרתי את renderClickableAreasDebug

  return (
    <div className="relative w-full h-screen bg-white overflow-hidden">
      {/* הסרתי את כפתור הצגת האזורים האדומים */}

      <div 
        className="relative w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setIsHovering(false)}
      >
        <MemoizedImage
          src="/computer/pictures/page1/game1/regular/03.png"
          alt="Easter egg 03"
          className="w-full h-full object-fill"
          style={{
            cursor: isHovering ? 'pointer' : 'default',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            willChange: 'transform',
            transition: 'all 0.3s ease-in-out'
          }}
        />
        {/* הסרתי את renderClickableAreasDebug */}
      </div>
      
      {/* תמונה מוגדלת בעת hover */}
      {isHovering && !selectedImage && (
        <div
          className="fixed z-40 cursor-pointer"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(${zoomConfig.zoomOffset.x}px, ${zoomConfig.zoomOffset.y}px)`,
            willChange: 'transform',
            pointerEvents: 'auto',
            background: 'transparent',
            zIndex: 40
          }}
          onClick={handleImageClick}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div style={{
            width: zoomConfig.zoomSize.replace('w-[', '').replace(']', ''),
            height: zoomConfig.zoomHeight.replace('h-[', '').replace(']', ''),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}>
            <MemoizedImage
              src="/computer/pictures/page1/game1/zoonBitIn/03.png"
              alt="Zoomed Easter egg"
              className="border border-white shadow-2xl"
              style={{ 
                width: '100%',
                height: '100%',
                objectFit: 'fill',
                willChange: 'transform, opacity',
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                opacity: 1,
                transition: 'all 0.3s ease-in-out'
              }}
              draggable={false}
            />
          </div>
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
              src="/computer/pictures/page1/game1/zoomIn/03.png"
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
    width: '800px', // הרחבתי מ-645px ל-800px
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
    }}>APPROXIMATELY 2 HOURS AND 41 MINUTES INTO THE GAME</div>
    <div style={{
      width: '800px', // הרחבתי מ-645px ל-800px
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
        whiteSpace: 'nowrap'
      }}>The Dr. Uckmann trading card is modeled after Neil Druckmann, the game's director.</div>
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
    </div>
  );
};

export default InsideGame1_3;
