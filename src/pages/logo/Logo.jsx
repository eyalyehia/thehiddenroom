import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleNotebookClick = () => {
    navigate('/notebook');
  };

  // Helper configuration for zoomed logos
  function getLogoZoomConfig(logoId) {
    const configs = {
      1: { zoomSize: 'w-17', zoomHeight: 'h-22', zoomOffset: { x: -45, y: -37 } },
      2: { zoomSize: 'w-20', zoomHeight: 'h-15', zoomOffset: { x: -32, y: -47 } },
      3: { zoomSize: 'w-22', zoomHeight: 'h-15', zoomOffset: { x: -78, y: -80 } },
      4: { zoomSize: 'w-13', zoomHeight: 'h-auto', zoomOffset: { x: 10, y: -15 } },
      5: { zoomSize: 'w-26', zoomHeight: 'h-auto', zoomOffset: { x: -92, y: -55 } },
      6: { zoomSize: 'w-20', zoomHeight: 'h-13', zoomOffset: { x: -41, y: -30 } },
      7: { zoomSize: 'w-29', zoomHeight: 'h-29', zoomOffset: { x: -65, y: -82 } },
      8: { zoomSize: 'w-16', zoomHeight: 'h-15', zoomOffset: { x: -90, y: -29 } },
      9: { zoomSize: 'w-18', zoomHeight: 'h-22', zoomOffset: { x: -35, y: -80 } },
      10: { zoomSize: 'w-52', zoomHeight: 'h-7', zoomOffset: { x: -100, y:15 } },
      11: { zoomSize: 'w-15', zoomHeight: 'h-auto', zoomOffset: { x: -80, y: 2 } },
      12: { zoomSize: 'w-28', zoomHeight: 'h-17', zoomOffset: { x: -75, y: 15 } },
      13: { zoomSize: 'w-36', zoomHeight: 'h-27', zoomOffset: { x: -62, y: -70 } },
      14: { zoomSize: 'w-32', zoomHeight: 'h-18', zoomOffset: { x: -65, y: -38 } },
      15: { zoomSize: 'w-20', zoomHeight: 'h-7', zoomOffset: { x: -80, y:-15 } },
    };
    return configs[logoId] || { zoomSize: 'w-40', zoomHeight: 'h-auto', zoomOffset: { x: -90, y: -90 } };
  }

  const handleLogoEnter = (logoId, event) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    const rect = event.currentTarget.getBoundingClientRect();
    setMousePosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    setHoveredLogo(logoId);
  };

  const handleLogoLeave = () => {
    // Add a small delay before removing the hover state
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLogo(null);
    }, 50); // 50ms delay to maintain hover during quick mouse movements
  };

  const handleZoomedImageEnter = () => {
    // Clear timeout when hovering over zoomed image
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleZoomedImageLeave = () => {
    setHoveredLogo(null);
  };

  const handleLogoClick = (logoId) => {
    console.log('Logo clicked:', logoId);
    // TODO: navigate or perform action in future
  };

  

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1D1C1A' }}>
      <div 
        className="relative overflow-hidden" 
        style={{ 
          width: '1920px', 
          height: '1080px', 
          backgroundColor: '#1D1C1A' 
        }}
      >
      
      {/* תמונות נסתרות לטעינה מיידית */}
      <div className="hidden">
        {Array.from({ length: 15 }, (_, i) => (
          <img
            key={`preload-${i}`}
            className="preload-zoom-image"
            src={`/logo/pictures/zoomInBit/${(i + 1).toString().padStart(2, '0')}.png`}
            alt={`Preload ${i + 1}`}
            loading="eager"
            decoding="sync"
          />
        ))}
      </div>
      
      {/* כפתור סגירה X */}
      <button
        className="fixed top-6 right-6 transition-opacity z-50 cursor-pointer"
        style={{ width: '34px', height: '34px' }}
        aria-label="Close"
        onClick={handleClose}
        onMouseEnter={() => setIsHoveringCloseButton(true)}
        onMouseLeave={() => setIsHoveringCloseButton(false)}
      >
        {isHoveringCloseButton ? (
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.7411 1.79167L32.2083 7.28371L22.6641 17.0169L32.2083 26.7151L26.7151 32.2083L17.0169 22.6641L7.28371 32.2083L1.79167 26.7151L11.4199 17.0169L1.79167 7.28371L7.41111 1.79167C7.41111 1.79167 13.9592 8.16621 17.0297 11.2325L26.7411 1.79167Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26.7411 1.79167L32.2083 7.28371L22.6641 17.0169L32.2083 26.7151L26.7151 32.2083L17.0169 22.6641L7.28371 32.2083L1.79167 26.7151L11.4199 17.0169L1.79167 7.28371L7.41111 1.79167C7.41111 1.79167 13.9592 8.16621 17.0297 11.2325L26.7411 1.79167Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

        {/* תמונות הלוגואים */}
      {Array.from({ length: 15 }, (_, index) => {
        const logoNum = index + 1;
        // חישוב מיקום - 5 תמונות בשורה
        const row = Math.floor(index / 5);
        const col = index % 5;
        
        // חישוב מרכוז - רוחב דף 1920px
        // 5 תמונות של 168px + 4 רווחים של 200px = 1640px כולל
        // margin משמאל: (1920-1640)/2 = 140px
        const horizontalSpacing = 200;
        const leftMargin = 140;
        
        const top = 139 + (row * 250);
        const left = leftMargin + (col * (168 + horizontalSpacing));
        
        return (
          <img
            key={logoNum}
            src={`/logo/pictures/regular/${logoNum.toString().padStart(2, '0')}.png`}
            alt={`Logo ${logoNum}`}
            className="absolute cursor-pointer"
            style={{
              width: '168px',
              height: '146px',
              top: `${top}px`,
              left: `${left}px`,
              objectFit: 'contain'
            }}
            onMouseEnter={(e) => handleLogoEnter(logoNum, e)}
            onMouseLeave={handleLogoLeave}
            loading="lazy"
          />
        );
      })}

      {/* Zoomed image */}
      {hoveredLogo && (() => {
        const cfg = getLogoZoomConfig(hoveredLogo);
        return (
          <div
            className="fixed z-50"
            style={{
              left: `${mousePosition.x + cfg.zoomOffset.x}px`,
              top: `${mousePosition.y + cfg.zoomOffset.y}px`,
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden'
            }}
            onMouseEnter={handleZoomedImageEnter}
            onMouseLeave={handleZoomedImageLeave}
          >
            <div
              className={`${cfg.zoomSize} ${cfg.zoomHeight} border border-white shadow-2xl bg-black/90 opacity-0 animate-fadeIn cursor-pointer pointer-events-auto flex items-center justify-center`}
              style={{
                willChange: 'transform, opacity',
                animation: 'fadeIn 0.1s ease-out forwards',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden'
              }}
              onClick={() => handleLogoClick(hoveredLogo)}
            >
              <img
                src={`/logo/pictures/zoomInBit/${hoveredLogo.toString().padStart(2, '0')}.png`}
                alt={`Zoomed Logo ${hoveredLogo}`}
                className={`object-cover pointer-events-none`}
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block'
                }}
                loading="eager"
                decoding="sync"
              />
            </div>
          </div>
        );
      })()}

      {/* כפתור היומן */}
      <button
        className="fixed bottom-6 left-6 transition-opacity z-50 cursor-pointer"
        style={{ width: '47px', height: '36px' }}
        aria-label="Notebook"
        onClick={handleNotebookClick}
        onMouseEnter={() => setIsHoveringNotebookButton(true)}
        onMouseLeave={() => setIsHoveringNotebookButton(false)}
      >
        {isHoveringNotebookButton ? (
          <svg width="47" height="36" viewBox="0 0 47 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.15 6.6H0.96V35.04H46.08V6.6H39.46" fill="white"/>
            <path d="M7.15 6.6H0.96V35.04H46.08V6.6H39.46" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M7.69 0.95H40.22V28.68H7.69V0.95Z" fill="white" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M23.95 1.12V28.55" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M10.73 6.82H20.93" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M10.73 12.18H20.93" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M10.73 17.55H20.93" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M10.73 22.92H20.93" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M26.98 6.82H37.18" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M26.98 12.18H37.18" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M26.98 17.55H37.18" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M26.98 22.92H37.18" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="47" height="36" viewBox="0 0 47 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.95 1.12V28.55" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M7.69 0.95H40.22V28.68H7.69V0.95Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M10.73 6.82H20.93" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M10.73 12.18H20.93" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M10.73 17.55H20.93" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M10.73 22.92H20.93" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M26.98 6.82H37.18" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M26.98 12.18H37.18" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M26.98 17.55H37.18" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M26.98 22.92H37.18" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M7.15 6.6H0.96V35.04H46.08V6.6H39.46" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      

      </div>
    </div>
  );
};

export default Logo;