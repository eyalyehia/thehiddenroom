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
          img.src = `/poster/pictures/zoomIn/${i.toString().padStart(2, '0')}.png`;
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
    hotspots: getHotspotsForPoster(index + 9)
  }));

  // 🎛️ מרכז שליטה על זום עבור פוסטרים 9-16
  // כאן תוכל לשלוט על כל פרמטר של הזום לכל תמונה
  function getPosterZoomConfig(posterId) {
    const configs = {
      9: {
        hotspot: { left: 57, top: 1, width: 40, height: 10 },
        zoomSize: "w-24",
        zoomHeight: "h-12",
        zoomOffset: { x: -125, y: 2 }
      },
      10: {
        hotspot: { left: 20, top: 20, width: 20, height: 20 },
        zoomSize: "w-25",
        zoomHeight: "h-auto",
        zoomOffset: { x: -75, y: 10 }
      },
      11: {
        hotspot: { left: 70, top: 20, width: 20, height: 10 },
        zoomSize: "w-25",
        zoomHeight: "h-19",
        zoomOffset: { x: -115, y: 15 }
      },
      12: {
        hotspot: { left: 2, top: 80, width: 20, height: 10 },
        zoomSize: "w-22",
        zoomHeight: "h-22",
        zoomOffset: { x: -90, y: -65 }
      },
      13: {
        hotspot: { left: 70, top: 30, width: 20, height: 10 },
        zoomSize: "w-24",
        zoomHeight: "h-18",
        zoomOffset: { x: -95, y: -10 }
      },
      14: {
        hotspot: { left: 40, top: 60, width: 15, height: 15 },
        zoomSize: "w-28",
        zoomHeight: "h-15",
        zoomOffset: { x: -85, y:5 }
      },
      15: {
        hotspot: { left: 40, top: 50, width: 20, height: 15 },
        zoomSize: "w-25",
        zoomHeight: "h-25",
        zoomOffset: { x: -100, y: 19 }
      },
      16: {
        hotspot: { left: 15, top: 35, width: 35, height: 20 },
        zoomSize: "w-32",
        zoomHeight: "h-20",
        zoomOffset: { x: -160, y: 35 }
      }
    };

    return configs[posterId] || {
      hotspot: { left: 40, top: 40, width: 20, height: 20 },
      zoomSize: "w-48",
      zoomHeight: "h-auto",
      zoomOffset: { x: 20, y: -100 }
    };
  }

  // פונקציה להגדרת אזורי ההגדלה לכל פוסטר
  function getHotspotsForPoster(posterId) {
    return [getPosterZoomConfig(posterId).hotspot];
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
    navigate('/notebook');
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
      {/* Debug Button - Update style to match logo pages */}
      <button
        className="fixed top-20 right-6 text-white px-4 py-2 rounded-md z-50 transition-all duration-200 flex items-center gap-2"
        onClick={() => setShowDebugAreas(prev => !prev)}
        style={{ 
          direction: 'rtl',
          background: showDebugAreas ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255, 0, 0, 0.5)',
          boxShadow: showDebugAreas ? '0 0 10px rgba(255, 0, 0, 0.5)' : 'none'
        }}
      >
        <span>{showDebugAreas ? 'הסתר' : 'הצג'} אזורי לחיצה</span>
        {showDebugAreas ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        )}
      </button>

      {/* כפתור סגירה */}
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
      
      {/* מיכל הפוסטרים - רשת רספונסיבית */}
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[1400px] grid grid-cols-4 grid-rows-2 gap-4 h-full max-h-[95vh] px-4">
          {posters.map((poster) => (
            <div
              key={poster.id}
              className="bg-gray-800 border border-gray-600 relative overflow-visible flex items-center justify-center poster-item"
              data-poster-id={poster.id}
              style={{ 
                aspectRatio: '332/490',
                width: '100%',
                maxWidth: '280px' ,
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
                {poster.hotspots.map((hotspot, hotspotIndex) => (
                  <div
                    key={hotspotIndex}
                    className="absolute cursor-pointer hover-detection-area"
                    style={{
                      left: `${Math.max(0, hotspot.left - 5)}%`,  /* Much larger detection area */
                      top: `${Math.max(0, hotspot.top - 5)}%`,     /* Much larger detection area */
                      width: `${Math.min(100, hotspot.width + 10)}%`,              /* Much larger detection area */
                      height: `${Math.min(100, hotspot.height + 10)}%`,            /* Much larger detection area */
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

      {/* כפתור יומן */}
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

      {/* כפתור חץ לעמוד הראשון */}
      <button
        className="fixed left-6 top-1/2 transform -translate-y-1/2 transition-opacity z-50 cursor-pointer"
        style={{ width: '29px', height: '45px' }}
        aria-label="Previous Page"
        onClick={handleNextPage}
        onMouseEnter={() => setIsHoveringArrowButton(true)}
        onMouseLeave={() => setIsHoveringArrowButton(false)}
      >
        {isHoveringArrowButton ? (
          <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
            <path d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="29" height="45" viewBox="0 0 29 45" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
            <path d="M7.19 1.5L27.5 22.5L7.19 43.5L1.5 37.94L16.03 22.55L1.5 7.06L7.19 1.5Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
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
            src={imageElements[hoveredPoster]?.src || `/poster/pictures/zoomIn/${hoveredPoster.toString().padStart(2, '0')}.png`}
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
              className="w-full h-auto object-cover max-h-[70vh] border border-white shadow-2xl"
            />
            {selectedPoster === 9 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '816px',
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
                  <div className="font-bold text-xl mb-1">VALERIAN AND THE CITY OF A THOUSAND PLANETS, 2017</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The name "Korben's" is a reference to Korben Dallas, the protagonist of The</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">"Fifth Element" (1997). It's a subtle nod from Luc Besson, who directed both films.</div>
                </div>
              </div>
            )}
            {selectedPoster === 10 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '629px',
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
                  <div className="font-bold text-xl mb-1">HALLOWEEN, 1978</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The hand holding the knife forms a screaming face.</div>
                </div>
              </div>
            )}
            {selectedPoster === 11 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '369px',
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
                  <div className="font-bold text-xl mb-1">BRAVE, 2012</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">A bear hides among the rocks, a hint at the story's central threat.</div>
                </div>
              </div>
            )}
            {selectedPoster === 12 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '527px',
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
                  <div className="font-bold text-xl mb-1">MOTHER!, 2017</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">A framed portrait of Javier Bardem is hidden among the leaves,</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">a detail that also appears later in the film.</div>
                </div>
              </div>
            )}
            {selectedPoster === 13 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '568px',
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
                  <div className="font-bold text-xl mb-1">AVENGERS: INFINITY WAR, 2018</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">As the first major film shot entirely with IMAX cameras,</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">the word "IMAX" is subtly hidden multiple times.</div>
                </div>
              </div>
            )}
            {selectedPoster === 14 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '699px',
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
                  <div className="font-bold text-xl mb-1">GREMLINS, 1984</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The logo of "Amblin Entertainment", Steven Spielberg's production company</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">and the film's producer, is hidden in the button of the jeans.</div>
                </div>
              </div>
            )}
            {selectedPoster === 15 && (
              <div 
                className="absolute text-white bg-black/60 p-4 rounded-lg"
                style={{
                  position: 'absolute',
                  width: '498px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="font-bold text-xl mb-2">TEXAS CHAINSAW MASSACRE, 2022</div>
                <div className="font-normal text-base opacity-90">Beneath Leatherface's bottom lip, a silhouette of his iconic figure holding a chainsaw is hidden.</div>
              </div>
            )}
            {selectedPoster === 16 && (
              <div 
                className="absolute text-white bg-black/60 p-4 rounded-lg"
                style={{
                  position: 'absolute',
                  width: '533px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  color: '#FFFFFF'
                }}
              >
                <div className="font-bold text-xl mb-4">TOY STORY 4, 2019</div>
                <div className="font-normal text-base opacity-90">In the picture hanging on the wall, familiar characters from the movie "Up" can be seen playing cards.</div>
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