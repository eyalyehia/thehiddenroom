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

const InsideGame2 = () => {
  const [isHoveringButton, setIsHoveringButton] = useState(false);
  const [showClickableAreas, setShowClickableAreas] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // קונפיגורציה לתמונה מוגדלת
  const zoomConfig = useMemo(() => ({
    zoomSize: 'w-[700px]', 
    zoomHeight: 'h-[400px]', 
    zoomOffset: { x: -770, y: -150 }
  }), []);

  // קונפיגורציה למודאל
  const modalConfig = useMemo(() => ({
    maxWidth: 'max-w-[1079px]',
    maxHeight: 'max-h-[663px]',
    position: 'flex items-center justify-center',
    marginTop: '0',
    marginLeft: '0'
  }), []);

  const handleImageClick = () => {
    setSelectedImage(1);
  };

  useEffect(() => {
    const loadImages = async () => {
      try {
        await Promise.all([
          getBase64('/computer/pictures/page1/game2/regular/01.png'),
          getBase64('/computer/pictures/page1/game2/zoomBitIn/01.png')
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

    const isInArea = isPointInComputerGameArea('game2', 1, x, y, rect.width, rect.height);
    
    if (isInArea) {
      setIsHovering(true);
    } else {
      setIsHovering(false);
    }
  };

  const renderClickableAreasDebug = () => {
    if (!showClickableAreas) return null;

    const areas = getComputerGameClickableAreas('game2', 1);
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
          src="/computer/pictures/page1/game2/regular/01.png"
          alt="Easter egg 01"
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
            src="/computer/pictures/page1/game2/zoomBitIn/01.png"
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
              src="/computer/pictures/page1/game2/zoomIn/01.png"
              alt="Full screen Easter egg"
              className={`w-full h-auto object-cover ${modalConfig.maxHeight} shadow-2xl`}
              style={{ 
                width: '916px',
                height: '663px',
                imageRendering: 'crisp-edges',
                animation: 'scaleIn 0.3s ease-in-out',
                opacity: 1
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
                <div className="font-bold text-xl mb-1">APPROXIMATELY 40–60 MINUTES INTO THE GAME</div>
                <div className="font-normal text-base opacity-70 text-gray-300">
                  Visit the Lemoyne region between 3:00 and 4:00 AM to see
                  a ghost train pass by.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Button */}
      <button
        className="absolute top-[30px] right-[30px] w-[29px] h-[45px] bg-transparent border-none cursor-pointer p-0 z-50"
        onClick={() => navigate('/game2')}
        onMouseEnter={() => setIsHoveringButton(true)}
        onMouseLeave={() => setIsHoveringButton(false)}
        style={{
          zIndex: 60
        }}
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

export default InsideGame2;
