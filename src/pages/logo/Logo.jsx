import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [clickedLogos, setClickedLogos] = useState(new Set());
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

  // Configuration for large images in center modal
  function getLogoModalConfig(logoId) {
    const configs = {
      1: { 
        maxWidth: 'max-w-[873px]', 
        maxHeight: 'max-h-[664px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      2: { 
        maxWidth: 'max-w-[873px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      3: { 
        maxWidth: 'max-w-[783.74px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      4: { 
        maxWidth: 'max-w-[663px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      5: { 
        maxWidth: 'max-w-[673px]', 
        maxHeight: 'max-h-[662px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      6: { 
        maxWidth: 'max-w-[1519px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      7: { 
        maxWidth: 'max-w-[809px]', 
        maxHeight: 'max-h-[664px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      8: { 
        maxWidth: 'max-w-[644px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      9: { 
        maxWidth: 'max-w-[521px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      10: { 
        maxWidth: 'max-w-[1351px]', 
        maxHeight: 'max-h-[229px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      11: { 
        maxWidth: 'max-w-[504px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      12: { 
        maxWidth: 'max-w-[514px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      13: { 
        maxWidth: 'max-w-[1056px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      14: { 
        maxWidth: 'max-w-[1709px]', 
        maxHeight: 'max-h-[663px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      },
      15: { 
        maxWidth: 'max-w-[953px]', 
        maxHeight: 'max-h-[662px]',
        position: 'flex items-center justify-center',
        marginTop: '0',
        marginLeft: '0'
      }
    };
    return configs[logoId] || { 
      maxWidth: 'max-w-2xl', 
      maxHeight: 'max-h-[70vh]',
      position: 'flex items-center justify-center',
      marginTop: '0',
      marginLeft: '0'
    };
  }

  const handleLogoEnter = (logoId, event) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (clickedLogos.has(logoId)) {
      setSelectedLogo(logoId);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setMousePosition({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
      setHoveredLogo(logoId);
    }
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
    // Clear hover immediately when leaving the zoomed image
    setHoveredLogo(null);
  };

  const handleLogoClick = (logoId) => {
    setClickedLogos(prev => new Set([...prev, logoId]));
    setSelectedLogo(logoId);
    console.log('Logo clicked:', logoId);
  };

  const handleNextPage = () => {
    // כרגע ללא קישור - יתווסף בעתיד
    console.log('Next page clicked');
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
            src={`/logo/pictures/zoomInBit2/${(i + 1).toString().padStart(2, '0')}.png`}
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
            src={`/logo/pictures/regular2/${logoNum.toString().padStart(2, '0')}.png`}
            alt={`Logo ${logoNum}`}
            className="absolute cursor-pointer logo-item"
            data-logo-id={logoNum}
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
            className="fixed z-50 inline-block"
            style={{
              left: `${mousePosition.x + cfg.zoomOffset.x}px`,
              top: `${mousePosition.y + cfg.zoomOffset.y}px`,
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform, opacity',
              backfaceVisibility: 'hidden',
              width: 'fit-content',
              height: 'fit-content'
            }}
            onMouseEnter={handleZoomedImageEnter}
            onMouseLeave={handleZoomedImageLeave}
          >
            <img
              src={`/logo/pictures/zoomInBit2/${hoveredLogo.toString().padStart(2, '0')}.png`}
              alt={`Zoomed Logo ${hoveredLogo}`}
              className={`${cfg.zoomSize} ${cfg.zoomHeight} object-cover border border-white shadow-2xl bg-black/90 opacity-0 animate-fadeIn block cursor-pointer`}
              style={{ 
                willChange: 'transform, opacity',
                animation: 'fadeIn 0.1s ease-out forwards',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                display: 'block'
              }}
              loading="eager"
              decoding="sync"
              onClick={() => handleLogoClick(hoveredLogo)}
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
            // Close if clicking outside the image
            if (e.target === e.currentTarget) {
              setSelectedLogo(null);
            }
          }}
        >
          <div className={`relative w-full h-auto bg-transparent ${getLogoModalConfig(selectedLogo).maxWidth}`}>
            <img
              src={`/logo/pictures/zoomIn2/${selectedLogo.toString().padStart(2, '0')}.png`}
              alt={`Logo ${selectedLogo}`}
              className={`w-full h-auto object-cover ${getLogoModalConfig(selectedLogo).maxHeight} border border-white shadow-2xl`}
              style={{ 
                marginTop: getLogoModalConfig(selectedLogo).marginTop,
                marginLeft: getLogoModalConfig(selectedLogo).marginLeft
              }}
            />
            {/* Description under the logo, styled like in Poster.jsx */}
            {selectedLogo === 1 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '509px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">TOBLERONE</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">A bear is hidden in the mountain. a reference</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">to Bern, where Toblerone was founded.</div>
                </div>
              </div>
            )}
            {selectedLogo === 2 && (
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
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">TOSTITOS</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The letters T-I-T form two figures sharing</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">a chip and dipping it into a bowl of salsa.</div>
                </div>
              </div>
            )}
            {selectedLogo === 3 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '405px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">YOGA AUSTRALIA</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The negative space between the arm and leg is shaped like Australia.</div>
                </div>
              </div>
            )}
            {selectedLogo === 4 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '448px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">FEDEX</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">A hidden arrow is formed in the negative</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">space between the letters E and X.</div>
                </div>
              </div>
            )}
            {selectedLogo === 5 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '448px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">MY FONTS</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The letters "my" are designed to</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">form the image of a hand.</div>
                </div>
              </div>
            )}
            {selectedLogo === 6 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '594px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">WENDY'S</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The word "mom" appears within the collar of the girl's blouse, suggesting a sense of home-cooked, motherly food.</div>
                </div>
              </div>
            )}
            {selectedLogo === 7 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '534px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">CARREFOUR</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The letter "C" is hidden in the negative space between the two arrows, reflecting the brand's initial.</div>
                </div>
              </div>
            )}
            {selectedLogo === 8 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '489px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">TOBLERONE</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The split "O" with a vertical line suggests an orbital path, visually reflecting the brand name.</div>
                </div>
              </div>
            )}
            {selectedLogo === 9 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '541px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">BASKIN ROBBINS</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The number "31" is hidden within the letters B and R,</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">a reference to the brand's original promise of 31 ice cream flavors.</div>
                </div>
              </div>
            )}
            {selectedLogo === 10 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '519px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">LEVIS</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The logo's shape mimics the back pocket stitching on their jeans, a visual link to the product itself.</div>
                </div>
              </div>
            )}
            {selectedLogo === 11 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '489px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">HERSHEY'S KISSES</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">A hidden chocolate kiss is formed in the negative space between the "K" and "I".</div>
                </div>
              </div>
            )}
            {selectedLogo === 12 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '489px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">PINTEREST</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The letter P is designed to resemble a pushpin.</div>
                </div>
              </div>
            )}
            {selectedLogo === 13 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '515px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">TOUR DE FRANCE</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The letter R, together with the yellow circle</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">and the letter O, forms the image of a cyclist.</div>
                </div>
              </div>
            )}
            {selectedLogo === 14 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '489px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">FORMULA 1</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The number 1 is hidden in the negative space between</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">the letter F and the red shape.</div>
                </div>
              </div>
            )}
            {selectedLogo === 15 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '489px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">GILLETTE</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">Diagonal cuts in the "G" and "i" make them look as if</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">sliced by a razor blade.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      </div>
    </div>
  );
};

export default Logo;