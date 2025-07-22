import React, { useState, useRef, useEffect, useMemo } from 'react'; // Removed unused useCallback
import { useNavigate } from 'react-router-dom';
import { isPointInClickableArea, getClickableAreas } from '../../components/constant/clickableAreas';
import getBase64 from '../../components/common/getBase64';

// Memoized image component with loading state
const MemoizedImage = React.memo(({ src, alt, className, onClick, style, ...props }) => {
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState('');
// 
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

const Logo = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [clickedLogos, setClickedLogos] = useState(new Set());
  const [showNotebookModal, setShowNotebookModal] = useState(false);

  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  // Load placeholders for all images
  useEffect(() => {
    const loadPlaceholders = async () => {
      const newPlaceholders = {};
      
      // Load placeholders for regular logos
      for (let i = 1; i <= 15; i++) {
        const num = i.toString().padStart(2, '0');
        const regularPath = `/logo/pictures/regular2/${num}.png`;
        const zoomInPath = `/logo/pictures/zoomIn2/${num}.png`;
        const zoomBitPath = `/logo/pictures/zoomInBit2/${num}.png`;
        
        try {
          const [regularBase64, zoomInBase64, zoomBitBase64] = await Promise.all([
            getBase64(regularPath),
            getBase64(zoomInPath),
            getBase64(zoomBitPath)
          ]);
          
          newPlaceholders[regularPath] = regularBase64;
          newPlaceholders[zoomInPath] = zoomInBase64;
          newPlaceholders[zoomBitPath] = zoomBitBase64;
        } catch (error) {
          console.error(`Error loading placeholders for logo ${i}:`, error);
        }
      }
      
      // eslint-disable-next-line no-undef
      setPlaceholders(newPlaceholders);
    };

    loadPlaceholders();
  }, []);

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

  const handleNextPage = () => {
    navigate('/logo2');
  };

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
    const inClickableArea = isPointInClickableArea(logoId, mouseX, mouseY, rect.width, rect.height);
    
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
    const inClickableArea = isPointInClickableArea(logoId, mouseX, mouseY, rect.width, rect.height);
    
    // Only open modal if click is in clickable area
    if (inClickableArea) {
      setClickedLogos(prev => new Set([...prev, logoId]));
      setSelectedLogo(logoId);
    }
  }, []);

// Add debug mode state for showing clickable areas
  const [showClickableAreas, setShowClickableAreas] = useState(false);



  // Memoized zoom configurations for better performance
  const logoZoomConfigs = useMemo(() => ({
      1: { zoomSize: 'w-11', zoomHeight: 'h-11', zoomOffset: { x: -100, y: -25 } },
      2: { zoomSize: 'w-20', zoomHeight: 'h-15', zoomOffset: { x: -70, y: -80 } },
      3: { zoomSize: 'w-19', zoomHeight: 'h-19', zoomOffset: { x: -20, y: -35 } },
      4: { zoomSize: 'w-13', zoomHeight: 'h-auto', zoomOffset: { x: 5, y: -15 } },
      5: { zoomSize: 'w-26', zoomHeight: 'h-auto', zoomOffset: { x: -90, y: -55 } },
      6: { zoomSize: 'w-20', zoomHeight: 'h-13', zoomOffset: { x: -40, y: -30 } },
      7: { zoomSize: 'w-40', zoomHeight: 'h-29', zoomOffset: { x: -80, y: -82 } },
      8: { zoomSize: 'w-16', zoomHeight: 'h-15', zoomOffset: { x: -96, y: -29 } },
      9: { zoomSize: 'w-18', zoomHeight: 'h-22', zoomOffset: { x: -40, y: -80 } },
      10: { zoomSize: 'w-52', zoomHeight: 'h-7', zoomOffset: { x: -100, y:15 } },
      11: { zoomSize: 'w-15', zoomHeight: 'h-auto', zoomOffset: { x: -90, y: 2 } },
      12: { zoomSize: 'w-20', zoomHeight: 'h-25', zoomOffset: { x: -105, y:-40 } },
      13: { zoomSize: 'w-36', zoomHeight: 'h-27', zoomOffset: { x: -50, y: -73 } },
      14: { zoomSize: 'w-37', zoomHeight: 'h-18', zoomOffset: { x: -60, y: -50 } },
      15: { zoomSize: 'w-20', zoomHeight: 'h-7', zoomOffset: { x: -80, y:-15 } },
  }), []);

  const logoModalConfigs = useMemo(() => ({
    1: { maxWidth: 'max-w-[873px]', maxHeight: 'max-h-[664px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    2: { maxWidth: 'max-w-[873px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    3: { maxWidth: 'max-w-[783.74px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    4: { maxWidth: 'max-w-[663px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    5: { maxWidth: 'max-w-[673px]', maxHeight: 'max-h-[662px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    6: { maxWidth: 'max-w-[1519px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    7: { maxWidth: 'max-w-[809px]', maxHeight: 'max-h-[664px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    8: { maxWidth: 'max-w-[644px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    9: { maxWidth: 'max-w-[521px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    10: { maxWidth: 'max-w-[1351px]', maxHeight: 'max-h-[229px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    11: { maxWidth: 'max-w-[504px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    12: { maxWidth: 'max-w-[514px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    13: { maxWidth: 'max-w-[1056px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    14: { maxWidth: 'max-w-[1709px]', maxHeight: 'max-h-[663px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' },
    15: { maxWidth: 'max-w-[953px]', maxHeight: 'max-h-[662px]', position: 'flex items-center justify-center', marginTop: '0', marginLeft: '0' }
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

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1D1C1A' }}>
      <div 
        className="relative overflow-hidden w-full h-screen" 
        style={{ backgroundColor: '#1D1C1A' }}
      >
        
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

      {/* כפתור debug מוסתר - נשאר רק בהערות, מצב debug עדיין נפתח עם מקש d */}

      {/* תמונות הלוגואים - Flexbox centered grid */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid grid-cols-5 gap-x-[190px] gap-y-[130px]">
          {Array.from({ length: 15 }, (_, index) => {
            const logoNum = index + 1;
            const imageSrc = `/logo/pictures/regular2/${logoNum.toString().padStart(2, '0')}.png`;
            
            return (
              <div key={logoNum} className="relative">
                <MemoizedImage
                  src={imageSrc}
                  alt={`Logo ${logoNum}`}
                  className="logo-item transition-transform duration-100 hover:scale-105 will-change-transform"
                  data-logo-id={logoNum}
                  style={{
                    width: '168px',
                    height: '146px',
                    objectFit: 'contain',
                    imageRendering: 'crisp-edges',
                    cursor: 'default',
                  }}
                  onMouseEnter={() => handleLogoEnter(logoNum)}
                  onMouseLeave={handleLogoLeave}
                  onMouseMove={(e) => handleLogoMouseMove(logoNum, e)}
                  onClick={(e) => handleLogoClick(logoNum, e)}
                />
                {showClickableAreas && (() => {
                  const areas = getClickableAreas(logoNum);
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
          })}
        </div>
      </div>

              {/* Instant Zoomed Image Display - RELATIVE POSITION */}
        {hoveredLogo && !selectedLogo && (() => {
          const cfg = getLogoZoomConfig(hoveredLogo);
          const zoomImageSrc = `/logo/pictures/zoomInBit2/${hoveredLogo.toString().padStart(2, '0')}.png`;
          
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

      {/* כפתור החץ */}
      <button
        className="fixed right-6 top-1/2 transform -translate-y-1/2 transition-opacity z-50 cursor-pointer"
        style={{ width: '29px', height: '45px' }}
        aria-label="Next Page"
        onClick={handleNextPage}
        onMouseEnter={() => setIsHoveringArrowButton(true)}
        onMouseLeave={() => setIsHoveringArrowButton(false)}
      >
        {isHoveringArrowButton ? (
          <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* Instant Modal Display with placeholder */}
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
              src={`/logo/pictures/zoomIn2/${selectedLogo.toString().padStart(2, '0')}.png`}
              alt={`Logo ${selectedLogo}`}
              className={`w-full h-auto object-cover ${getLogoModalConfig(selectedLogo).maxHeight} shadow-2xl`}
              style={{ 
                marginTop: getLogoModalConfig(selectedLogo).marginTop,
                marginLeft: getLogoModalConfig(selectedLogo).marginLeft,
                imageRendering: 'crisp-edges'
              }}
            />
            
            {/* Logo descriptions */}
            {selectedLogo === 1 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '460px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontFamily: 'Work Sans',
                    fontStyle: 'normal',
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    color: '#FFFFFF',
                  }}>TOBLERONE</div>
                  <div style={{
                    width: '907px',
                    height: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>A bear is hidden in the mountain.</div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
a reference to Bern, where Toblerone was founded.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 2 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '440px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>YOGA AUSTRALIA</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The negative space between the arm and leg is shaped like Australia.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 3 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '632px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>TOSTITOS</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The letters T-I-T form two figures sharing</div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>a chip and dipping it into a bowl of salsa.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 4 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '440px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>FEDEX</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>A hidden arrow is formed in the negative</div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>space between the letters E and X.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 5 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '440px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>MY FONTS</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The letters "my" are designed to form the image of a hand.</div>
                   
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 6 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '632px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>WENDY'S</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The word "mom" appears within the collar of the girl's </div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>blouse, suggesting a sense of home-cooked, motherly food.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 7 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '632px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>CARREFOUR</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The letter "C" is hidden in the negative space</div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>between the two arrows, reflecting the brand's initial.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 8 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '632px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>ORBIT</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The split "O" with a vertical line suggests an </div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>orbital path, visually reflecting the brand name.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 9 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '445px',
                  left: '0',
                  top: '679px',  // 663px (גובה התמונה) + 16px (מרווח)
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    width: '341px',
                    height: '26px',
                    fontFamily: 'Work Sans',
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128%',
                    letterSpacing: '0%',
                    marginBottom: '0px'  // מרחק בין הכותרת לטקסט
                  }}>BASKIN ROBBINS</div>
                  <div style={{
                    width: '445px',
                    height: '60px',
                    fontFamily: 'Work Sans',
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    opacity: 0.7,
                    color: '#FFFFFF'
                  }}>The number "31" is hidden within the letters B and R, a reference to the brand's original promise of 31 ice cream flavors.</div>
                </div>
              </div>
            )}
            {selectedLogo === 10 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '632px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>LEVIS</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The logo's shape mimics the back pocket stitching</div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}> on their jeans, a visual link to the product itself.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 11 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '440px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>HERSHEY'S KISSES</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>A hidden chocolate kiss is formed in the </div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>negative space between the "K" and "I".</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 12 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '440px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>PINTEREST</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The letter P is designed to resemble a pushpin.</div>
                    {/* <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}></div> */}
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 13 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '632px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>TOUR DE FRANCE</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The letter R, together with the yellow circle</div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>and the letter O, forms the image of a cyclist.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 14 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '632px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>FORMULA 1</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>The number 1 is hidden in the negative space</div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>between the letter F and the red shape.</div>
                  </div>
                </div>
              </div>
            )}
            {selectedLogo === 15 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '632px',
                  left: '0',
                  bottom: '-89px',  // Updated spacing
                  fontFamily: 'Work Sans'
                }}
              >
                <div className="text-left">
                  <div style={{
                    fontWeight: 900,
                    fontSize: '20px',
                    lineHeight: '128.04%',
                    marginBottom: '0'
                  }}>GILLETTE</div>
                  <div style={{
                    width: '907px',
                    height: '40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0px'
                  }}>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>Diagonal cuts in the "G" and "i" make </div>
                    <div style={{
                      fontFamily: 'Work Sans',
                      fontWeight: 400,
                      fontSize: '20px',
                      lineHeight: '20px',
                      height: '20px',
                      opacity: 0.7,
                      color: '#FFFFFF',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>them look as if sliced by a razor blade.</div>
                  </div>
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
                className="w-[670px] h-[50px]"
                style={{
                  top: '122px',
                  position: 'absolute',
                  opacity: 1,
                  fontFamily: 'Work Sans',
                  fontWeight: 900,
                  fontStyle: 'Black',
                  fontSize: '39px',
                  lineHeight: '128%',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                }}
              >
                HIDDEN DETAILS IN BRAND LOGOS
              </h1>
              
              {/* Description */}
              <p 
                className="w-[827px] h-[221px]"
                style={{
                  top: '172px',
                  position: 'absolute',
                  fontFamily: 'Work Sans',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '32px',
                  lineHeight: '103%',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                  whiteSpace: 'pre-line',
                }}
              >
                {`Each logo contains a hidden detail.\nmove your cursor to uncover it.\ncan you spot them all?`}
              </p>
            </div>
          </div>
        </div>
      )}

        </div>
    </div>
  );
};

export default Logo;