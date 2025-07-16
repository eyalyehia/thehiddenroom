import React, { useState, useRef, useEffect, useMemo } from 'react'; // Removed unused useCallback
import { useNavigate } from 'react-router-dom';
import { isPointInClickableArea, getClickableAreas } from '../../components/constant/clickableAreas';
import getBase64 from '../../components/common/getBase64';

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
      alt={alt || 'Logo'} 
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

const Logo2 = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [clickedLogos, setClickedLogos] = useState(new Set());
  const [showNotebookModal, setShowNotebookModal] = useState(false);


  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Clean up hover timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, []);

  const handleClose = () => {
    navigate('/');
  };

  const handleNotebookClick = () => {
    setShowNotebookModal(true);
  };

  const handleBackClick = () => {
    navigate('/logo');
  };

  // Add debug mode state for showing clickable areas
  const [showClickableAreas, setShowClickableAreas] = useState(false);

  // Hover handler for logo hotspots - simplified to match poster behavior
  const handleLogoEnter = useMemo(() => (logoId) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (clickedLogos.has(logoId)) {
      setSelectedLogo(logoId);
    } else {
      setHoveredLogo(logoId);
    }
  }, [clickedLogos]);

  const handleLogoLeave = useMemo(() => () => {
    // Add a small delay before removing the hover state
    // This helps when moving quickly between hotspots
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLogo(null);
    }, 50); // 50ms delay to maintain hover during quick mouse movements
  }, []);



  // Handle mouse movement on logo to check clickable areas continuously
  const handleLogoMouseMove = useMemo(() => (logoId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Check if mouse is in clickable area
    const inClickableArea = isPointInClickableArea(logoId, mouseX, mouseY, rect.width, rect.height, 2);
    
    // Change cursor based on clickable area
    event.currentTarget.style.cursor = inClickableArea ? 'pointer' : 'default';
    
    // If we were hovering and moved out of clickable area, hide hover
    if (hoveredLogo === logoId && !inClickableArea) {
      setHoveredLogo(null);
    }
    // If we weren't hovering and moved into clickable area, show hover
    else if (hoveredLogo !== logoId && inClickableArea && !clickedLogos.has(logoId)) {
      setHoveredLogo(logoId);
    }
  }, [hoveredLogo, clickedLogos]);

  const handleLogoClick = useMemo(() => (logoId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Check if click is in clickable area
    const inClickableArea = isPointInClickableArea(logoId, mouseX, mouseY, rect.width, rect.height, 2);
    
    // Only open modal if click is in clickable area
    if (inClickableArea) {
      setClickedLogos(prev => new Set([...prev, logoId]));
      setSelectedLogo(logoId);
    }
  }, []);



  // Memoized zoom configurations for better performance (same as page 1 for consistency)
  const logoZoomConfigs = useMemo(() => ({
      1: { zoomSize: 'w-25', zoomHeight: 'h-21', zoomOffset: { x: -80, y:-50 } },
      2: { zoomSize: 'w-9', zoomHeight: 'h-32', zoomOffset: { x: 35, y:-46 } },
      3: { zoomSize: 'w-47', zoomHeight: 'h-15', zoomOffset: { x: -98, y: -53 } },
      4: { zoomSize: 'w-13', zoomHeight: 'h-auto', zoomOffset: { x: 20, y: -40 } },
      5: { zoomSize: 'w-12', zoomHeight: 'h-10', zoomOffset: { x: -68, y: -19 } },
      6: { zoomSize: 'w-65', zoomHeight: 'h-22', zoomOffset: { x: -130, y: -75 } },
      7: { zoomSize: 'w-40', zoomHeight: 'h-8', zoomOffset: { x: -90, y:5 } },
      8: { zoomSize: 'w-45', zoomHeight: 'h-25', zoomOffset: { x: -90, y: -85 } },
      9: { zoomSize: 'w-18', zoomHeight: 'h-22', zoomOffset: { x: -94, y: -45 } },
      10: { zoomSize: 'w-25', zoomHeight: 'h-12', zoomOffset: { x: -87, y:-25 } },
      11: { zoomSize: 'w-35', zoomHeight: 'h-auto', zoomOffset: { x: -70, y: -95 } },
      12: { zoomSize: 'w-23', zoomHeight: 'h-12', zoomOffset: { x: -135, y: -30 } },
      13: { zoomSize: 'w-10', zoomHeight: 'h-27', zoomOffset: { x: 15, y: -55 } },
      14: { zoomSize: 'w-20', zoomHeight: 'h-12', zoomOffset: { x: 5, y: -45 } },
      15: { zoomSize: 'w-45', zoomHeight: 'h-23', zoomOffset: { x: -135, y:-25 } },
  }), []);

  const logoModalConfigs = useMemo(() => ({
    1: { maxWidth: 'max-w-[1238px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    2: { maxWidth: 'max-w-[152px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    3: { maxWidth: 'max-w-[1416px]', maxHeight: 'max-h-[413]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    4: { maxWidth: 'max-w-[372px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    5: { maxWidth: 'max-w-[653px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    6: { maxWidth: 'max-w-[1479px]', maxHeight: 'max-h-[518px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    7: { maxWidth: 'max-w-[1467px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    8: { maxWidth: 'max-w-[1175px]', maxHeight: 'max-h-[664px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    9: { maxWidth: 'max-w-[497px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    10: { maxWidth: 'max-w-[688px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    11: { maxWidth: 'max-w-[639px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    12: { maxWidth: 'max-w-[1019px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    13: { maxWidth: 'max-w-[1592px]', maxHeight: 'max-h-[662px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    14: { maxWidth: 'max-w-[707px]', maxHeight: 'max-h-[662px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    15: { maxWidth: 'max-w-[1236px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' }
  }), []);

  const getLogoZoomConfig = (logoId) => {
    return logoZoomConfigs[logoId] || { zoomSize: 'w-40', zoomHeight: 'h-auto', zoomOffset: { x: -90, y: -90 } };
  };

  const getLogoModalConfig = (logoId) => {
    return logoModalConfigs[logoId] || { 
      maxWidth: 'max-w-2xl', 
      maxHeight: 'max-h-[70vh]',
      position: 'flex items-center justify-center',
      marginTop: '0',
      marginLeft: '0'
    };
  };

  // Memoized logo grid for performance
  const logoGrid = useMemo(() => {
    return Array.from({ length: 15 }, (_, index) => {
      const logoNum = index + 1;
      const imageSrc = `/logo/pictures/page2regular/${logoNum.toString().padStart(2, '0')}.png`;
      
      return (
        <div key={logoNum} className="relative">
          <MemoizedImage
            src={imageSrc}
            alt={`Logo ${logoNum}`}
            className="logo-item will-change-transform transition-transform duration-100 hover:scale-105"
            data-logo-id={logoNum}
            style={{
              width: '168px',
              height: '146px',
              objectFit: 'contain',
              imageRendering: 'crisp-edges',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden',
              cursor: 'default',
            }}
            onMouseEnter={() => handleLogoEnter(logoNum)}
            onMouseLeave={handleLogoLeave}
            onMouseMove={(e) => handleLogoMouseMove(logoNum, e)}
            onClick={(e) => handleLogoClick(logoNum, e)}
          />
          {showClickableAreas && (() => {
            const areas = getClickableAreas(logoNum, 2);
            return areas.map((area, areaIndex) => (
              <div
                key={`debug-${logoNum}-${areaIndex}`}
                className="absolute pointer-events-none z-15"
                style={{
                  left: `${area.x * 168}px`,
                  top: `${area.y * 146}px`,
                  width: `${area.width * 168}px`,
                  height: `${area.height * 146}px`,
                  border: '2px solid rgba(255, 0, 0, 0.8)',
                  backgroundColor: 'rgba(255, 0, 0, 0.2)',
                }}
              />
            ));
          })()}
        </div>
      );
    });
  }, [handleLogoEnter, handleLogoLeave, handleLogoMouseMove, handleLogoClick, showClickableAreas]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1D1C1A' }}>
      <div 
        className="relative overflow-hidden w-full h-screen" 
        style={{ 
          backgroundColor: '#1D1C1A'
        }}
      >
      
      {/* כפתור לתצוגת אזורים לחיצים */}
      <button
        className="fixed top-6 left-6 bg-red-500 text-white px-3 py-1 rounded text-sm z-50"
        onClick={() => setShowClickableAreas(!showClickableAreas)}
      >
        {showClickableAreas ? 'הסתר אזורים' : 'הראה אזורים'}
      </button>

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

      {/* כפתור חזור */}
      <button
        className="fixed left-6 top-1/2 transform -translate-y-1/2 transition-opacity z-50 cursor-pointer"
        style={{ width: '29px', height: '45px' }}
        aria-label="Back to Page 1"
        onClick={handleBackClick}
        onMouseEnter={() => setIsHoveringArrowButton(true)}
        onMouseLeave={() => setIsHoveringArrowButton(false)}
      >
        {isHoveringArrowButton ? (
          <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.81 1.5L1.5 22.5L21.81 43.5L27.5 37.94L12.97 22.55L27.5 7.06L21.81 1.5Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.81 1.5L1.5 22.5L21.81 43.5L27.5 37.94L12.97 22.55L27.5 7.06L21.81 1.5Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* תמונות הלוגואים - Flexbox centered grid */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-5 gap-x-[100px] gap-y-[80px]">
          {logoGrid}
        </div>
      </div>

      {/* Instant Zoomed Image Display - RELATIVE POSITION */}
      {hoveredLogo && !selectedLogo && (() => {
        const cfg = getLogoZoomConfig(hoveredLogo);
        const zoomImageSrc = `/logo/pictures/page2zoomBit2/${hoveredLogo.toString().padStart(2, '0')}.png`;
        
        // Find the logo element to position relative to it
        const logoElement = document.querySelector(`[data-logo-id="${hoveredLogo}"]`);
        if (!logoElement) return null;
        
        const rect = logoElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        return (
          <div
            className="fixed z-40 pointer-events-none"
            style={{
              left: `${centerX + cfg.zoomOffset.x}px`,
              top: `${centerY + cfg.zoomOffset.y}px`,
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          >
            <MemoizedImage
              src={zoomImageSrc}
              alt={`Zoomed Logo ${hoveredLogo}`}
              className={`${cfg.zoomSize} ${cfg.zoomHeight} object-cover border border-white shadow-2xl bg-black/90 pointer-events-none`}
              style={{ 
                willChange: 'transform',
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                opacity: 1,
                transition: 'none'
              }}
            />
          </div>
        );
      })()}

      {/* Modal Display */}
      {selectedLogo && (
        <div 
          className={`fixed inset-0 bg-black/80 z-50 p-8 ${getLogoModalConfig(selectedLogo).position}`}
          onMouseMove={(e) => {
            const logoElements = document.querySelectorAll('.logo-item');
            const clickedLogo = Array.from(logoElements).find(
              (el) => Number(el.getAttribute('data-logo-id')) === selectedLogo
            );
            
            if (clickedLogo) {
              const rect = clickedLogo.getBoundingClientRect();
              
              if (
                e.clientX < rect.left || 
                e.clientX > rect.right || 
                e.clientY < rect.top || 
                e.clientY > rect.bottom
              ) {
                setSelectedLogo(null);
              }
            }
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSelectedLogo(null);
            }
          }}
        >
          <div className={`relative w-full h-auto bg-transparent ${getLogoModalConfig(selectedLogo).maxWidth}`}>
            <MemoizedImage
              src={`/logo/pictures/page2zoomIn/${selectedLogo.toString().padStart(2, '0')}.png`}
              alt={`Logo ${selectedLogo}`}
              className={`w-full h-auto object-cover ${getLogoModalConfig(selectedLogo).maxHeight} shadow-2xl`}
              style={{ 
                marginTop: getLogoModalConfig(selectedLogo).marginTop,
                marginLeft: getLogoModalConfig(selectedLogo).marginLeft,
                imageRendering: 'crisp-edges'
              }}
            />
            
            {selectedLogo === 1 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-105px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>ROXY</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    // מרחק בין התמונה לכותרת 
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>Two Quiksilver logos are mirrored to form a heart,</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>highlighting Roxy's identity as Quiksilver's women's brand.</div>
                </div>
              </div>
            )}

            {selectedLogo === 2 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>APPLE</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The bitten apple references the Tree of Knowledge, </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>a symbol of curiosity and the pursuit of wisdom.</div>
                </div>
              </div>
            )}

            {selectedLogo === 3 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>CISCO</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The vertical bars are designed to resemble the Golden Gate </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>Bridge, a symbol of San Francisco, where Cisco was founded.</div>
                </div>
              </div>
            )}

            {selectedLogo === 4 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>LAFAYETTE</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The two t's in "Lafayette" form the shape of the Eiffel </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>Tower, a subtle nod to the brand's Parisian roots.</div>
                </div>
              </div>
            )}

            {selectedLogo === 5 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>EL AL</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The letter “ל” is shaped like an ascending airplane.</div>
                  {/* <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}></div> */}
                </div>
              </div>
            )}

            {selectedLogo === 6 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>AUDI</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The four rings represent the 1932 merger of Audi, DKW, </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>Horch, and Wanderer, the foundation of Audi's legacy.</div>
                </div>
              </div>
            )}

            {selectedLogo === 7 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>AMAZON</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The arrow from A to Z suggests the brand sells everything, </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>and forms a smile to convey customer satisfaction.</div>
                </div>
              </div>
            )}

            {selectedLogo === 8 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>NBC</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The feathers form a peacock, with its body </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>and beak visible in the negative space.</div>
                </div>
              </div>
            )}

            {selectedLogo === 9 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>MUL-T-LOCK</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The keyhead forms a strong male </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>figure, a symbol of power and security.</div>
                </div>
              </div>
            )}

            {selectedLogo === 10 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>VAIO</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The "VA" forms an analog wave, while "IO" represents </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>binary code, blending analog and digital in one logo.</div>
                </div>
              </div>
            )}

            {selectedLogo === 11 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>UNILEVER</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The large "U" is built from dozens of icons, each </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>symbolizing one of the brand's product categories.</div>
                </div>
              </div>
            )}

            {selectedLogo === 12 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>TOYOTA</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The ovals spell out every letter in “Toyota”.</div>
                  {/* <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>"Toyota".</div> */}
                </div>
              </div>
            )}

            {selectedLogo === 13 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>RAY-BAN</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The letter “R” resembles the shape of a sunglass frame.</div>
                  {/* <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>resemble the shape of a sunglass frame.</div> */}
                </div>
              </div>
            )}

            {selectedLogo === 14 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>NEW MAN</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The logo reads the same upside down.</div>
                  {/* <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>upside down.</div> */}
                </div>
              </div>
            )}

            {selectedLogo === 15 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  bottom: '-85px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>QUIKSILVER</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                    whiteSpace: 'pre-line'
                  }}>The wave and mountain are inspired by Hokusai's "The ,</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '20px',
                    opacity: 0.7,
                    height: '20px',
                    marginTop: '-5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>Great Wave off Kanagawa" merging nature and surf culture.</div>
                </div>
              </div>
            )}
            
            {selectedLogo !== 1 && selectedLogo !== 2 && selectedLogo !== 3 && selectedLogo !== 4 && selectedLogo !== 5 && selectedLogo !== 6 && selectedLogo !== 7 && selectedLogo !== 8 && selectedLogo !== 9 && selectedLogo !== 10 && selectedLogo !== 11 && selectedLogo !== 12 && selectedLogo !== 13 && selectedLogo !== 14 && selectedLogo !== 15 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '580px',
                  height: '92px',
                  left: '0',
                  bottom: '-80px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">LOGO {selectedLogo}</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">Hidden message will be revealed here...</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">Page 2 - More secrets await discovery.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notebook Modal */}
      {showNotebookModal && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-start"
          style={{ backgroundColor: 'rgba(29, 28, 26, 0.95)' }}
          onClick={() => setShowNotebookModal(false)}
        >
          <div 
            className="w-full h-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="fixed top-6 right-6 transition-opacity z-50 border-0 focus:outline-none cursor-pointer"
              style={{ width: '34px', height: '34px' }}
              aria-label="Close"
              onClick={() => setShowNotebookModal(false)}
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

            {/* Page Content */}
            <div className="absolute text-white font-['Work_Sans']" style={{ left: '122px' }}>
              {/* Title */}
              <h1 
                className="w-[670px] h-[50px] font-bold text-[39px] leading-[128.04%]"
                style={{
                  top: '122px',
                  position: 'absolute',
                  opacity: 1
                }}
              >
                HIDDEN DETAILS IN BRAND LOGOS
              </h1>
              
              {/* Description */}
              <div 
                className="w-[827px] h-[221px] font-normal text-[32px]"
                style={{
                  top: '172px',
                  position: 'absolute',
                  opacity: 1,
                  fontFamily: 'Work Sans',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  lineHeight: '103%',
                  letterSpacing: '0%'
                }}
              >
                <p>Each logo contains a hidden detail.</p>
                <p>move your cursor to uncover it.</p>
                <p>can you spot them all?</p>
              </div>
            </div>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Logo2; 