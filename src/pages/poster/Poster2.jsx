import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../components/common/getBase64';
import { POSTER_CLICKABLE_AREAS_PAGE2 } from '../../components/constant/clickableAreas';

const Poster2 = () => {
  const [hoveredPoster, setHoveredPoster] = useState(null);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [clickedPosters, setClickedPosters] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [showDebugAreas, setShowDebugAreas] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const currentHotspotRef = useRef(null);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageElements, setImageElements] = useState({});
  const [imagePreviews, setImagePreviews] = useState({});
  const [posterImagesLoaded, setPosterImagesLoaded] = useState({});
  const [showNotebookModal, setShowNotebookModal] = useState(false);
  const navigate = useNavigate();

  // Preload כל תמונות הזום בטעינת הקומפוננטה - משופר עם cache
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = [];
      const imageCache = {};
      
      for (let i = 9; i <= 16; i++) {
        const imagePromise = new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            imageCache[i] = img;
            setLoadedImages(prev => new Set([...prev, i]));
            resolve(img);
          };
          img.onerror = reject;
          img.src = `/poster/pictures/zoomBit/${i.toString().padStart(2, '0')}.png`;
        });
        imagePromises.push(imagePromise);
      }
      
      try {
        await Promise.all(imagePromises);
        setImageElements(imageCache);
        setImagesLoaded(true);
      } catch (error) {
        console.warn('Some images failed to preload:', error);
        setImagesLoaded(true);
      }
    };
    
    preloadImages();
  }, []);

  // Generate base64 previews for all poster images
  useEffect(() => {
    const loadImagePreviews = async () => {
      const previews = {};
      const loaded = {};
      
      for (const poster of posters) {
        const preview = await getBase64(poster.src);
        if (preview) {
          previews[poster.id] = preview;
          
          // Preload the actual image
          const img = new Image();
          img.src = poster.src;
          img.onload = () => {
            loaded[poster.id] = true;
            setPosterImagesLoaded({...loaded});
          };
        }
      }
      setImagePreviews(previews);
    };

    loadImagePreviews();
  }, []);

  // רשימת הפוסטרים 9-16
  const posters = Array.from({ length: 8 }, (_, index) => ({
    id: index + 9,
    src: `/poster/pictures/regular/${(index + 9).toString().padStart(2, '0')}.jpg`,
    alt: `Poster ${index + 9}`,
  }));

  // 🎛️ מרכז שליטה על זום עבור פוסטרים 9-16
  // כאן תוכל לשלוט על כל פרמטר של הזום לכל תמונה
  function getPosterZoomConfig(posterId) {
    const configs = {
      9: {
        hotspot: { left: 57, top: 1, width: 40, height: 10 },
        zoomSize: "w-22",
        zoomHeight: "h-10",
        zoomOffset: { x: -90, y: -4 }
      },
      10: {
        hotspot: { left: 20, top: 20, width: 20, height: 20 },
        zoomSize: "w-21",
        zoomHeight: "h-auto",
        zoomOffset: { x: -62, y: -22 }
      },
      11: {
        hotspot: { left: 70, top: 20, width: 20, height: 10 },
        zoomSize: "w-19",
        zoomHeight: "h-15",
        zoomOffset: { x: -50, y: -15 }
      },
      12: {
        hotspot: { left: 2, top: 80, width: 20, height: 10 },
        zoomSize: "w-15",
        zoomHeight: "h-15",
        zoomOffset: { x: -26, y: -25 }
      },
      13: {
        hotspot: { left: 70, top: 30, width: 20, height: 10 },
        zoomSize: "w-18",
        zoomHeight: "h-15",
        zoomOffset: { x: -60, y: -5 }
      },
      14: {
        hotspot: { left: 40, top: 60, width: 15, height: 15 },
        zoomSize: "w-24",
        zoomHeight: "h-13",
        zoomOffset: { x: -70, y:-15 }
      },
      15: {
        hotspot: { left: 40, top: 50, width: 20, height: 15 },
        zoomSize: "w-18",
        zoomHeight: "h-18",
        zoomOffset: { x: -60, y: -15 }
      },
      16: {
        hotspot: { left: 15, top: 35, width: 35, height: 20 },
        zoomSize: "w-18",
        zoomHeight: "h-18",
        zoomOffset: { x: -66, y:0 }
      }
    };

    return configs[posterId] || {
      hotspot: { left: 40, top: 40, width: 20, height: 20 },
      zoomSize: "w-48",
      zoomHeight: "h-auto",
      zoomOffset: { x: 20, y: -100 }
    };
  }

  // פונקציה לחזרה לעמוד הראשי
  const handleClose = () => {
    navigate('/');
  };

  // פונקציה למעבר חזרה לעמוד הראשון של הפוסטרים
  const handleNextPage = () => {
    navigate('/poster');
  };

  // פונקציה למעבר לעמוד היומן
  const handleNotebookClick = () => {
    setShowNotebookModal(true);
  };

  // פונקציה לטיפול בהעברת עכבר על אזור הגדלה - משופרת
  const handleHotspotEnter = (posterId, event) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Store the current hotspot element for tracking
    currentHotspotRef.current = event.currentTarget;

    if (imagesLoaded && loadedImages.has(posterId)) {
      // If this poster was previously clicked, show full zoom on hover
      if (clickedPosters.has(posterId)) {
        setSelectedPoster(posterId);
      } else {
        // Otherwise show small preview
        setHoveredPoster(posterId);
        const rect = event.currentTarget.getBoundingClientRect();
        setMousePosition({ 
          x: rect.right + 10,
          y: rect.top
        });
      }
    }
  };

  const handleHotspotLeave = () => {
    // Add a small delay before removing the hover state
    // This helps when moving quickly between hotspots
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredPoster(null);
    }, 50); // 50ms delay to maintain hover during quick mouse movements
  };

  // פונקציה לטיפול בלחיצה על אזור הגדלה - פתיחת דיאלוג מלא
  const handleHotspotClick = (posterId) => {
    // Add this poster to the set of clicked posters
    setClickedPosters(prev => new Set([...prev, posterId]));
    setSelectedPoster(posterId);
  };

  const handleZoomedImageEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleZoomedImageLeave = () => {
    setHoveredPoster(null);
  };

  // Add new function to render debug areas
  const renderClickableAreasDebug = (posterId) => {
    if (!showDebugAreas) return null;
    
    const areas = POSTER_CLICKABLE_AREAS_PAGE2[posterId] || [];
    
    return areas.map((area, index) => (
      <div
        key={`debug-${index}`}
        className="absolute pointer-events-none"
        style={{
          left: `${area.x * 100}%`,
          top: `${area.y * 100}%`,
          width: `${area.width * 100}%`,
          height: `${area.height * 100}%`,
          border: '2px solid rgba(255, 0, 0, 0.5)',
          background: 'rgba(255, 0, 0, 0.15)',
          boxShadow: 'inset 0 0 20px rgba(255, 0, 0, 0.3)',
          backdropFilter: 'blur(2px)',
          zIndex: 10
        }}
      >
        <div 
          className="absolute -top-6 left-0 px-2 py-1 text-xs font-bold"
          style={{
            background: 'rgba(255, 0, 0, 0.8)',
            color: 'white',
            borderRadius: '4px',
            whiteSpace: 'nowrap'
          }}
        >
          אזור #{posterId}
        </div>
      </div>
    ));
  };

  // Add keyboard listener for debug mode
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'd' || e.key === 'ד') {
        setShowDebugAreas(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#1D1C1A' }}>
      {/* כפתור debug מוסתר - נשאר רק בהערות, מצב debug עדיין נפתח עם מקש d */}

      {/* כפתור סגירה */}
      <button
        className="fixed top-6 right-6 transition-all duration-200 ease-in-out z-50 cursor-pointer border-0 outline-none focus:outline-none"
        style={{ 
          width: '34px', 
          height: '34px',
          transform: isHoveringCloseButton ? 'scale(0.90)' : 'scale(1)',
          backgroundColor: 'transparent'
        }}
        aria-label="Close"
        onClick={handleClose}
        onMouseEnter={() => setIsHoveringCloseButton(true)}
        onMouseLeave={() => setIsHoveringCloseButton(false)}
      >
        <svg 
          width="34" 
          height="34" 
          viewBox="0 0 34 34" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <path 
            d="M26.7411 1.79167L32.2083 7.28371L22.6641 17.0169L32.2083 26.7151L26.7151 32.2083L17.0169 22.6641L7.28371 32.2083L1.79167 26.7151L11.4199 17.0169L1.79167 7.28371L7.41111 1.79167C7.41111 1.79167 13.9592 8.16621 17.0297 11.2325L26.7411 1.79167Z" 
            fill={isHoveringCloseButton ? "white" : "none"}
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </button>
      
      {/* מיכל הפוסטרים - רשת רספונסיבית */}
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="flex items-center justify-center min-h-screen">
          <div className="grid grid-cols-4 grid-rows-2 gap-x-[100px] gap-y-[50px]">
            {posters.map((poster) => (
              <div
                key={poster.id}
                className="bg-gray-800 border border-gray-600 relative overflow-visible flex items-center justify-center poster-item"
                data-poster-id={poster.id}
                style={{ 
                  aspectRatio: '332/490',
                  width: '275px',
                  height: 'auto'
                }}
              >
                <div className="relative w-full h-full">
                  <img
                    src={imagePreviews[poster.id] || poster.src}
                    alt={poster.alt}
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{
                      filter: posterImagesLoaded[poster.id] ? 'none' : 'blur(20px)',
                      transform: posterImagesLoaded[poster.id] ? 'scale(1)' : 'scale(1.05)'
                    }}
                  />

                  {/* Add debug areas */}
                  {renderClickableAreasDebug(poster.id)}

                  {/* אזורי הגדלה - האזור האקטיבי בפועל */}
                  {(POSTER_CLICKABLE_AREAS_PAGE2[poster.id] || []).map((area, areaIndex) => (
                    <div
                      key={areaIndex}
                      className="absolute cursor-pointer hover-detection-area"
                      style={{
                        left: `${area.x * 100}%`,
                        top: `${area.y * 100}%`,
                        width: `${area.width * 100}%`,
                        height: `${area.height * 100}%`,
                        zIndex: 5,
                      }}
                      onMouseEnter={(e) => handleHotspotEnter(poster.id, e)}
                      onMouseLeave={handleHotspotLeave}
                      onClick={() => handleHotspotClick(poster.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
              className="fixed top-6 right-6 transition-all duration-200 ease-in-out z-50 border-0 outline-none focus:outline-none cursor-pointer"
              style={{ 
                width: '34px', 
                height: '34px',
                transform: isHoveringCloseButton ? 'scale(0.90)' : 'scale(1)',
                backgroundColor: 'transparent'
              }}
              aria-label="Close"
              onClick={() => setShowNotebookModal(false)}
              onMouseEnter={() => setIsHoveringCloseButton(true)}
              onMouseLeave={() => setIsHoveringCloseButton(false)}
            >
              <svg 
                width="34" 
                height="34" 
                viewBox="0 0 34 34" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <path 
                  d="M26.7411 1.79167L32.2083 7.28371L22.6641 17.0169L32.2083 26.7151L26.7151 32.2083L17.0169 22.6641L7.28371 32.2083L1.79167 26.7151L11.4199 17.0169L1.79167 7.28371L7.41111 1.79167C7.41111 1.79167 13.9592 8.16621 17.0297 11.2325L26.7411 1.79167Z" 
                  fill={isHoveringCloseButton ? "white" : "none"}
                  stroke="white" 
                  strokeWidth="2" 
                  strokeMiterlimit="10"
                />
              </svg>
            </button>

            {/* Content Container */}
            <div className="absolute text-white font-['Work_Sans']" style={{ left: '122px' }}>
              {/* Title */}
              <h1 
                className="w-[728px] h-[50px]"
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
                HIDDEN DETAILS IN POSTER DESIGNS
              </h1>
              
              {/* Description */}
              <p 
                className="w-[827px] h-[221px]"
                style={{
                  top: '172px',
                  position: 'absolute',
                  // opacity: 1,
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
                {`Each poster contains a hidden detail.\nmove your cursor to uncover it.\ncan you spot them all?`}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* כפתור יומן */}
      <button
        className="fixed bottom-6 left-6 transition-opacity z-50 cursor-pointer"
        style={{ 
          width: '47px', 
          height: '36px',
          zIndex: showNotebookModal ? 40 : 50,
          pointerEvents: showNotebookModal ? 'none' : 'auto'
        }}
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

      {/* כפתור חץ לעמוד הראשון */}
      <button
        className="fixed left-6 top-1/2 transition-all duration-200 ease-in-out z-50 cursor-pointer border-0 outline-none focus:outline-none"
        style={{ 
          width: '29px', 
          height: '45px',
          zIndex: showNotebookModal ? 40 : 50,
          pointerEvents: showNotebookModal ? 'none' : 'auto',
          transform: `translateY(-50%) ${isHoveringArrowButton ? 'scale(0.90)' : 'scale(1)'}`,
          backgroundColor: 'transparent'
        }}
        aria-label="Previous Page"
        onClick={handleNextPage}
        onMouseEnter={() => setIsHoveringArrowButton(true)}
        onMouseLeave={() => setIsHoveringArrowButton(false)}
      >
        <svg 
          width="29" 
          height="45" 
          viewBox="0 0 29 45" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ 
            transform: 'scaleX(-1)',
            transition: 'all 0.2s ease-in-out'
          }}
        >
          <path 
            d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" 
            fill={isHoveringArrowButton ? "white" : "none"}
            stroke="white" 
            strokeWidth="2" 
            strokeMiterlimit="10"
          />
        </svg>
      </button>

      {/* תצוגה מוגדלת נקודתית של פוסטר בהעברת עכבר */}
      {hoveredPoster && imagesLoaded && loadedImages.has(hoveredPoster) && (
        <div 
          className="fixed z-50 opacity-0 animate-fadeIn cursor-pointer"
          style={{
            left: mousePosition.x + getPosterZoomConfig(hoveredPoster).zoomOffset.x,
            top: mousePosition.y + getPosterZoomConfig(hoveredPoster).zoomOffset.y,
            transform: 'translate(0, 0)',
            willChange: 'transform, opacity',
            animation: 'fadeIn 0.15s ease-out forwards'
          }}
          onMouseEnter={handleZoomedImageEnter}
          onMouseLeave={handleZoomedImageLeave}
          onClick={() => handleHotspotClick(hoveredPoster)}
        >
          <img
            src={imageElements[hoveredPoster]?.src || `/poster/pictures/zoomBit/${hoveredPoster.toString().padStart(2, '0')}.png`}
            alt={`Poster ${hoveredPoster}`}
            className={`${getPosterZoomConfig(hoveredPoster).zoomSize} ${getPosterZoomConfig(hoveredPoster).zoomHeight} object-cover border border-white shadow-2xl bg-black/90`}
            style={{ 
              willChange: 'transform',
              opacity: 1
            }}
          />
        </div>
      )}

      {/* 🖼️ דיאלוג מלא לתצוגת פוסטר בלחיצה */}
      {selectedPoster && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-8"
          onMouseMove={(e) => {
            // Get the poster element that was clicked
            const posterElements = document.querySelectorAll('.poster-item');
            const clickedPoster = Array.from(posterElements).find(
              (el) => Number(el.getAttribute('data-poster-id')) === selectedPoster
            );
            
            if (clickedPoster) {
              const rect = clickedPoster.getBoundingClientRect();
              
              // Check if mouse is outside the original poster frame
              if (
                e.clientX < rect.left || 
                e.clientX > rect.right || 
                e.clientY < rect.top || 
                e.clientY > rect.bottom
              ) {
                setSelectedPoster(null);
                // Don't reset hoveredPoster here to allow hover effect to work again
              }
            }
          }}
        >
          <div className="relative w-full max-w-2xl h-auto bg-transparent">
            <img
              src={`/poster/pictures/zoomIn/${selectedPoster.toString().padStart(2, '0')}.png`}
              alt={`Poster ${selectedPoster}`}
              className="w-full h-auto object-cover max-h-[70vh] shadow-2xl"
            />
            {selectedPoster === 9 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  left: '0',
                  bottom: '-85px'
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
                  }}>VALERIAN AND THE CITY OF A THOUSAND PLANETS, 2017</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%',
                    marginBottom: '0px'
                  }}>The name “Korben’s“ is a reference to Korben Dallas, the protagonist of The</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%'
                  }}>“Fifth Element“ (1997). It’s a subtle nod from Luc Besson, who directed both films.</div>
                </div>
              </div>
            )}
            {selectedPoster === 10 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  left: '0',
                  bottom: '-85px'
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
                  }}>HALLOWEEN, 1978</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%',
                    marginBottom: '0px'
                  }}>The hand holding the knife forms a screaming face.</div>
                  {/* <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%'
                  }}>referencing the film's reality-bending narrative.</div> */}
                </div>
              </div>
            )}
            {selectedPoster === 11 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  left: '0',
                  bottom: '-85px'
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
                  }}>BRAVE, 2012</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%',
                    marginBottom: '0px'
                  }}>A bear hides among the rocks,</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%'
                  }}>a hint at the story’s central threat.</div>
                </div>
              </div>
            )}
            {selectedPoster === 12 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  left: '0',
                  bottom: '-85px'
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
                  }}>MOTHER!, 2017</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%',
                    marginBottom: '0px'
                  }}>A framed portrait of Javier Bardem is hidden among</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%'
                  }}> the leaves, a detail that also appears later in the film.</div>
                </div>
              </div>
            )}
            {selectedPoster === 13 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  left: '0',
                  bottom: '-85px'
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
                  }}>AVENGERS: INFINITY WAR, 2018</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%',
                    marginBottom: '0px'
                  }}>As the first major film shot entirely with IMAX cameras,</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%'
                  }}> the word “IMAX” is subtly hidden multiple times.</div>
                </div>
              </div>
            )}
            {selectedPoster === 14 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  left: '0',
                  bottom: '-85px'
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
                  }}>GREMLINS, 1984</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%',
                    marginBottom: '0px'
                  }}>The logo of “Amblin Entertainment“, Steven Spielberg’s production </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%'
                  }}>company and the film’s producer, is hidden in the button of the jeans.</div>
                </div>
              </div>
            )}
            {selectedPoster === 15 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  left: '0',
                  bottom: '-85px'
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
                  }}>TEXAS CHAINSAW MASSACRE, 2022</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%',
                    marginBottom: '0px'
                  }}>Beneath Leatherface’s bottom lip, a silhouette </div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%'
                  }}>of his iconic figure holding a chainsaw is hidden.</div>
                </div>
              </div>
            )}
            {selectedPoster === 16 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '907px',
                  left: '0',
                  bottom: '-85px'
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
                  }}>TOY STORY 4, 2019</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%',
                    marginBottom: '0px'
                  }}>In the picture hanging on the wall, familiar characters</div>
                  <div style={{
                    fontWeight: 400,
                    fontSize: '20px',
                    lineHeight: '100%',
                    opacity: 0.7,
                    letterSpacing: '0%'
                  }}> from the movie “Up“ can be seen playing cards.</div>
                </div>
              </div>
            )}
            {/* X button removed as requested
            <button 
              className="absolute top-2 right-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center text-lg transition-colors"
              onClick={() => setSelectedPoster(null)}
            >
              ×
            </button>
            */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Poster2;