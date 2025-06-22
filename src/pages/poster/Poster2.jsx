import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Poster2 = () => {
  const [hoveredPoster, setHoveredPoster] = useState(null);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [clickedPosters, setClickedPosters] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const currentHotspotRef = useRef(null);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [imageElements, setImageElements] = useState({});
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

  // רשימת הפוסטרים 9-16
  const posters = Array.from({ length: 8 }, (_, index) => ({
    id: index + 9, // מתחיל מ-9
    src: `/poster/pictures/regular/${(index + 9).toString().padStart(2, '0')}.jpg`,
    alt: `Poster ${index + 9}`,
    // הגדרת אזורי הגדלה לכל פוסטר (באחוזים מהתמונה)
    hotspots: getHotspotsForPoster(index + 9)
  }));

  // 🎛️ מרכז שליטה על זום עבור פוסטרים 9-16
  // כאן תוכל לשלוט על כל פרמטר של הזום לכל תמונה
  function getPosterZoomConfig(posterId) {
    const configs = {
      9: {
        hotspot: { left: 57, top: 1, width: 40, height: 10 },
        zoomSize: "w-20 2xl:w-28",
        zoomHeight: "h-9 2xl:h-12",
        zoomOffset: { x: -85, y: 0 }
      },
      10: {
        hotspot: { left: 20, top: 20, width: 20, height: 20 },
        zoomSize: "w-17 2xl:w-24",
        zoomHeight: "h-auto",
        zoomOffset: { x: -55, y: -9 }
      },
      11: {
        hotspot: { left: 70, top: 20, width: 20, height: 10 },
        zoomSize: "w-17 2xl:w-24",
        zoomHeight: "h-15 2xl:h-20",
        zoomOffset: { x: -70, y: -5 }
      },
      12: {
        hotspot: { left: 2, top: 80, width: 20, height: 10 },
        zoomSize: "w-12 2xl:w-16",
        zoomHeight: "h-17 2xl:h-24",
        zoomOffset: { x: -52, y: -25 }
      },
      13: {
        hotspot: { left: 70, top: 30, width: 20, height: 10 },
        zoomSize: "w-15 2xl:w-20",
        zoomHeight: "h-15 2xl:h-20",
        zoomOffset: { x: -55, y: -35 }
      },
      14: {
        hotspot: { left: 40, top: 60, width: 15, height: 15 },
        zoomSize: "w-25 2xl:w-36",
        zoomHeight: "h-auto",
        zoomOffset: { x: -75, y: -15 }
      },
      15: {
        hotspot: { left: 40, top: 50, width: 20, height: 15 },
        zoomSize: "w-20 2xl:w-28",
        zoomHeight: "h-20 2xl:h-28",
        zoomOffset: { x: -65, y: -5 }
      },
      16: {
        hotspot: { left: 15, top: 35, width: 35, height: 20 },
        zoomSize: "w-25 2xl:w-36",
        zoomHeight: "h-18 2xl:h-24",
        zoomOffset: { x: -108, y: -7 }
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

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#1D1C1A' }}>
      {/* כפתור סגירה */}
      <button
        className="fixed top-6 right-6 w-10 h-10 2xl:w-14 2xl:h-14 2xl:top-8 2xl:right-8 transition-opacity z-50"
        aria-label="Close"
        onClick={handleClose}
        onMouseEnter={() => setIsHoveringCloseButton(true)}
        onMouseLeave={() => setIsHoveringCloseButton(false)}
      >
        {isHoveringCloseButton ? (
          <svg className="w-10 h-10 2xl:w-14 2xl:h-14" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.8233 2L36 8.205L25.2381 19.0189L36 29.795L29.795 36L18.9811 25.2381L8.205 36L2 29.795L12.7619 19.0189L2 8.205L8.23333 2C8.23333 2 15.5103 9.10694 19.0331 12.5919L29.8233 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg className="w-10 h-10 2xl:w-14 2xl:h-14" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.8233 2L36 8.205L25.2381 19.0189L36 29.795L29.795 36L18.9811 25.2381L8.205 36L2 29.795L12.7619 19.0189L2 8.205L8.23333 2C8.23333 2 15.5103 9.10694 19.0331 12.5919L29.8233 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>
      
      {/* מיכל הפוסטרים - רשת רספונסיבית */}
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[1000px] 2xl:max-w-[1400px] grid grid-cols-4 grid-rows-2 gap-4 2xl:gap-8 h-full max-h-[85vh] 2xl:max-h-[90vh] px-4 2xl:px-12">
          {posters.map((poster) => (
            <div
              key={poster.id}
                              className="bg-gray-800 border border-gray-600 relative overflow-visible flex items-center justify-center poster-item 2xl:!max-w-[320px]"
                data-poster-id={poster.id}
                style={{ 
                  aspectRatio: '332/490',
                  width: '100%',
                  maxWidth: '200px',
                  height: 'auto'
                }}
            >
              <div className="relative w-full h-full">
                <img
                  src={poster.src}
                  alt={poster.alt}
                  className="h-full w-full object-cover transition-transform duration-300"
                  style={{ maxHeight: '100%', maxWidth: '100%' }}
                />
{/* 🎯 מדד חזותי - מסגרת המראה את האזור האקטיבי */}
                {/* {poster.hotspots.map((hotspot, hotspotIndex) => (
                  <div
                    key={`visual-${hotspotIndex}`}
                    className="absolute border-2 border-red-500 border-dashed bg-red-500/10 pointer-events-none opacity-50 hover:opacity-80 transition-opacity"
                    style={{
                      left: `${hotspot.left}%`,
                      top: `${hotspot.top}%`,
                      width: `${hotspot.width}%`,
                      height: `${hotspot.height}%`,
                    }}
                    title={`זום אזור ${poster.id}`}
                  >
                    <div className="absolute -top-6 left-0 text-red-500 text-xs font-bold bg-black/70 px-1 rounded">
                      זום #{poster.id}
                    </div>
                  </div>
                ))} */}

                {/* אזורי הגדלה - האזור האקטיבי בפועל */}
                {poster.hotspots.map((hotspot, hotspotIndex) => (
                  <div
                    key={hotspotIndex}
                    className="absolute cursor-pointer hover-detection-area"
                    style={{
                      left: `${Math.max(0, hotspot.left - 1)}%`,  /* Slightly larger detection area */
                      top: `${Math.max(0, hotspot.top - 1)}%`,     /* Slightly larger detection area */
                      width: `${hotspot.width + 2}%`,              /* Slightly larger detection area */
                      height: `${hotspot.height + 2}%`,            /* Slightly larger detection area */
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
        className="fixed bottom-6 left-6 2xl:bottom-8 2xl:left-8 transition-opacity z-50 w-[47px] h-[36px] 2xl:w-[64px] 2xl:h-[48px]"
        aria-label="Notebook"
        onClick={handleNotebookClick}
        onMouseEnter={() => setIsHoveringNotebookButton(true)}
        onMouseLeave={() => setIsHoveringNotebookButton(false)}
      >
        {isHoveringNotebookButton ? (
          <svg className="w-[49px] h-[38px] 2xl:w-[66px] 2xl:h-[51px]" viewBox="0 0 49 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.46789 7H1V37H48V7H41.1009" fill="white"/>
            <path d="M7.46789 7H1V37H48V7H41.1009" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M8.01758 1H41.9043V30.2914H8.01758V1Z" fill="white" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M24.9609 1.18164V30.1102" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11.1719 7.17578H21.8052" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11.1719 12.8223H21.8052" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11.1719 18.4707H21.8052" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11.1719 24.1211H21.8052" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M28.1152 7.17578H38.7486" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M28.1152 12.8223H38.7486" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M28.1152 18.4707H38.7486" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M28.1152 24.1211H38.7486" stroke="#1D1C1A" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg className="w-[49px] h-[38px] 2xl:w-[66px] 2xl:h-[51px]" viewBox="0 0 49 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.9609 1.18164V30.1102" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M8.01758 1H41.9043V30.2914H8.01758V1Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11.1719 7.17578H21.8052" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11.1719 12.8223H21.8052" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11.1719 18.4707H21.8052" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M11.1719 24.1211H21.8052" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M28.1152 7.17578H38.7486" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M28.1152 12.8223H38.7486" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M28.1152 18.4707H38.7486" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M28.1152 24.1211H38.7486" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
            <path d="M7.46789 7H1V37H48V7H41.1009" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* כפתור חץ לעמוד הראשון */}
      <button
        className="fixed left-6 top-1/2 transform -translate-y-1/2 2xl:left-8 transition-opacity z-50 w-[33px] h-[49px] 2xl:w-[44px] 2xl:h-[66px]"
        aria-label="Previous Page"
        onClick={handleNextPage}
        onMouseEnter={() => setIsHoveringArrowButton(true)}
        onMouseLeave={() => setIsHoveringArrowButton(false)}
      >
        {isHoveringArrowButton ? (
          <svg className="w-[41px] h-[61px] 2xl:w-[55px] 2xl:h-[82px]" viewBox="0 0 41 61" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
            <path d="M10.1597 2L39 30.4696L10.1597 59L2 50.9516L22.6728 30.538L2 10.0484L10.1597 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg className="w-[33px] h-[49px] 2xl:w-[44px] 2xl:h-[66px]" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'scaleX(-1)' }}>
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* תצוגה מוגדלת נקודתית של פוסטר בהעברת עכבר */}
      {hoveredPoster && imagesLoaded && loadedImages.has(hoveredPoster) && (
        <div 
          className="fixed z-50 pointer-events-none opacity-0 animate-fadeIn"
          style={{
            left: mousePosition.x + getPosterZoomConfig(hoveredPoster).zoomOffset.x,
            top: mousePosition.y + getPosterZoomConfig(hoveredPoster).zoomOffset.y,
            transform: 'translate(0, 0)',
            willChange: 'transform, opacity',
            animation: 'fadeIn 0.15s ease-out forwards'
          }}
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
          <div className="relative w-full max-w-2xl 2xl:max-w-4xl h-auto bg-transparent">
            <img
              src={`/poster/pictures/zoomIn/${selectedPoster.toString().padStart(2, '0')}.png`}
              alt={`Poster ${selectedPoster}`}
              className="w-full h-auto object-cover max-h-[70vh] 2xl:max-h-[80vh] border border-white shadow-2xl"
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
                  <div className="font-bold text-xl 2xl:text-3xl mb-1 2xl:mb-2">VALERIAN AND THE CITY OF A THOUSAND PLANETS, 2017</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">The name "Korben's" is a reference to Korben Dallas, the protagonist of The</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">"Fifth Element" (1997). It's a subtle nod from Luc Besson, who directed both films.</div>
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
                  <div className="font-bold text-xl 2xl:text-3xl mb-1 2xl:mb-2">HALLOWEEN, 1978</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">The hand holding the knife forms a screaming face.</div>
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
                  <div className="font-bold text-xl 2xl:text-3xl mb-1 2xl:mb-2">BRAVE, 2012</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">A bear hides among the rocks, a hint at the story's central threat.</div>
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
                  <div className="font-bold text-xl 2xl:text-3xl mb-1 2xl:mb-2">MOTHER!, 2017</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">A framed portrait of Javier Bardem is hidden among the leaves,</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">a detail that also appears later in the film.</div>
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
                  <div className="font-bold text-xl 2xl:text-3xl mb-1 2xl:mb-2">AVENGERS: INFINITY WAR, 2018</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">As the first major film shot entirely with IMAX cameras,</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">the word "IMAX" is subtly hidden multiple times.</div>
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
                  <div className="font-bold text-xl 2xl:text-3xl mb-1 2xl:mb-2">GREMLINS, 1984</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">The logo of "Amblin Entertainment", Steven Spielberg's production company</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">and the film's producer, is hidden in the button of the jeans.</div>
                </div>
              </div>
            )}
            {selectedPoster === 15 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '498px',
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
                  <div className="font-bold text-xl 2xl:text-3xl mb-1 2xl:mb-2">TEXAS CHAINSAW MASSACRE, 2022</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">Beneath Leatherface's bottom lip, a silhouette of his iconic figure</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">holding a chainsaw is hidden.</div>
                </div>
              </div>
            )}
            {selectedPoster === 16 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '533px',
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
                  <div className="font-bold text-xl 2xl:text-3xl mb-1 2xl:mb-2">TOY STORY 4, 2019</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">In the picture hanging on the wall, familiar characters from the movie "Up"</div>
                  <div className="font-normal text-base 2xl:text-xl opacity-70 text-gray-300">can be seen playing cards.</div>
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