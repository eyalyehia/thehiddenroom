import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Poster = () => {
  const [hoveredPoster, setHoveredPoster] = useState<number | null>(null);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);
  const [clickedPosters, setClickedPosters] = useState<Set<number>>(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageElements, setImageElements] = useState<{[key: number]: HTMLImageElement}>({});
  const navigate = useNavigate();

  // Preload כל תמונות הזום בטעינת הקומפוננטה - משופר עם cache
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises: Promise<unknown>[] = [];
      const imageCache: {[key: number]: HTMLImageElement} = {};
      
      for (let i = 1; i <= 8; i++) {
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

  // רשימת הפוסטרים עם נתיבים מעודכנים ותיקון לתמונה 04.webp
  const posters = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    src: `/poster/pictures/regular/${(index + 1).toString().padStart(2, '0')}${index + 1 === 4 ? '.webp' : '.jpg'}`,
    alt: `Poster ${index + 1}`,
    // הגדרת אזורי הגדלה לכל פוסטר (באחוזים מהתמונה)
    hotspots: getHotspotsForPoster(index + 1)
  }));

  // 🎛️ מרכז שליטה על זום עבור כל פוסטר
  // כאן תוכל לשלוט על כל פרמטר של הזום לכל תמונה
  function getPosterZoomConfig(posterId: number) {
    const configs = {
      1: {
        hotspot: { left: 37, top: 43, width: 25, height: 15 },
        zoomSize: "w-15",
        zoomHeight: "h-15",
        zoomOffset: { x: -62, y: -6 }
      },
      2: {
        hotspot: { left: 50, top: 30, width: 20, height: 15 },
        zoomSize: "w-20",
        zoomHeight: "h-auto",
        zoomOffset: { x: -65, y: -25 }
      },
      3: {
        hotspot: { left: 35, top: 20, width: 30, height: 15 },
        zoomSize: "w-15",
        zoomHeight: "h-auto",
        zoomOffset: { x: -72, y: -25 }
      },
      4: {
        hotspot: { left: 40, top: 5, width: 10, height: 20 },
        zoomSize: "w-20",
        zoomHeight: "h-auto",
        zoomOffset: { x: -50, y: -15 }
      },
      5: {
        hotspot: { left: 5, top:70, width: 20, height: 10 },
        zoomSize: "w-15",
        zoomHeight: "h-auto",
        zoomOffset: { x: -55, y: -25 }
      },
      6: {
        hotspot: { left: 40, top: 85, width: 20, height: 15 },
        zoomSize: "w-30",
        zoomHeight: "h-2",
        zoomOffset: { x: -85, y: 28 }
      },
      7: {
        hotspot: { left: 2, top: 70, width: 20, height: 15 },
        zoomSize: "w-15",
        zoomHeight: "h-17",
        zoomOffset: { x: -50, y: -5 }
      },
              8: {
          hotspot: { left: 40, top: 48, width: 15, height: 15 },
          zoomSize: "w-48",
          zoomHeight: "h-auto",
          zoomOffset: { x: -113, y: 10 }
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
  function getHotspotsForPoster(posterId: number) {
    return [getPosterZoomConfig(posterId).hotspot];
  }

  // פונקציה לחזרה לעמוד הראשי
  const handleClose = () => {
    navigate('/');
  };

  // פונקציה למעבר לעמוד השני של הפוסטרים
  const handleNextPage = () => {
    navigate('/poster2');
  };

  // פונקציה למעבר לעמוד היומן
  const handleNotebookClick = () => {
    navigate('/notebook');
  };

  // פונקציה לטיפול בהעברת עכבר על אזור הגדלה - משופרת
  const handleHotspotEnter = (posterId: number, event: React.MouseEvent) => {
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
    setHoveredPoster(null);
  };

  // פונקציה לטיפול בלחיצה על אזור הגדלה - פתיחת דיאלוג מלא
  const handleHotspotClick = (posterId: number) => {
    // Add this poster to the set of clicked posters
    setClickedPosters(prev => new Set([...prev, posterId]));
    setSelectedPoster(posterId);
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#1D1C1A' }}>
      {/* כפתור סגירה */}
      <button
        className="fixed top-6 right-6 w-10 h-10 transition-opacity z-50"
        aria-label="Close"
        onClick={handleClose}
        onMouseEnter={() => setIsHoveringCloseButton(true)}
        onMouseLeave={() => setIsHoveringCloseButton(false)}
      >
        {isHoveringCloseButton ? (
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.8233 2L36 8.205L25.2381 19.0189L36 29.795L29.795 36L18.9811 25.2381L8.205 36L2 29.795L12.7619 19.0189L2 8.205L8.23333 2C8.23333 2 15.5103 9.10694 19.0331 12.5919L29.8233 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M29.8233 2L36 8.205L25.2381 19.0189L36 29.795L29.795 36L18.9811 25.2381L8.205 36L2 29.795L12.7619 19.0189L2 8.205L8.23333 2C8.23333 2 15.5103 9.10694 19.0331 12.5919L29.8233 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>
      
      {/* מיכל הפוסטרים - רשת רספונסיבית */}
      <div className="w-full h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-[1000px] grid grid-cols-4 grid-rows-2 gap-4 h-full max-h-[85vh] px-4">
          {posters.map((poster, index) => (
            <div
              key={poster.id}
              className="bg-gray-800 border border-gray-600 cursor-pointer relative overflow-visible flex items-center justify-center poster-item"
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
                    className="absolute cursor-pointer"
                    style={{
                      left: `${hotspot.left}%`,
                      top: `${hotspot.top}%`,
                      width: `${hotspot.width}%`,
                      height: `${hotspot.height}%`,
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
        className="fixed bottom-6 left-6 transition-opacity z-50"
        style={{ width: '47px', height: '36px' }}
        aria-label="Notebook"
        onClick={handleNotebookClick}
        onMouseEnter={() => setIsHoveringNotebookButton(true)}
        onMouseLeave={() => setIsHoveringNotebookButton(false)}
      >
        {isHoveringNotebookButton ? (
          <svg width="49" height="38" viewBox="0 0 49 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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
          <svg width="49" height="38" viewBox="0 0 49 38" fill="none" xmlns="http://www.w3.org/2000/svg">
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

      {/* כפתור חץ לעמוד השני */}
      <button
        className="fixed right-6 top-1/2 transform -translate-y-1/2 transition-opacity z-50"
        aria-label="Next Page"
        onClick={handleNextPage}
        onMouseEnter={() => setIsHoveringArrowButton(true)}
        onMouseLeave={() => setIsHoveringArrowButton(false)}
      >
        {isHoveringArrowButton ? (
          <svg width="41" height="61" viewBox="0 0 41 61" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.1597 2L39 30.4696L10.1597 59L2 50.9516L22.6728 30.538L2 10.0484L10.1597 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            className={`${getPosterZoomConfig(hoveredPoster).zoomSize} ${getPosterZoomConfig(hoveredPoster).zoomHeight} object-cover border border-white rounded-lg shadow-2xl bg-black/90`}
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
          className={`fixed inset-0 bg-black/80 z-50 p-8 ${selectedPoster === 6 ? 'flex items-end justify-center' : selectedPoster === 8 ? 'flex items-start justify-center' : 'flex items-center justify-center'}`}
          style={
            selectedPoster === 6
              ? { paddingBottom: '14rem' }
              : selectedPoster === 8
                ? { paddingTop: '30rem' }
                : {}
          }
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
          <div 
            className={`relative w-full h-auto bg-transparent ${selectedPoster === 6 ? 'max-w-3xl' : 'max-w-2xl'}`}
          >
            <img
              src={`/poster/pictures/zoomIn/${selectedPoster.toString().padStart(2, '0')}.png`}
              alt={`Poster ${selectedPoster}`}
              className={`w-full h-auto object-cover ${selectedPoster === 6 ? 'max-h-[20vh]' : selectedPoster === 8 ? 'max-h-[10vh] max-w-[470px]' : 'max-h-[70vh]'} border border-white rounded-lg shadow-2xl`}
              style={selectedPoster === 8 ? { marginLeft: '84px' } : {}}
            />
            {selectedPoster === 1 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '591px',
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
                  <div className="font-bold">THE SILENCE OF THE LAMBS, 1991</div>
                  <div>The skull on the moth's back is made of seven nude</div>
                  <div>women, in a composition based on Salvador Dalí's art.</div>
                </div>
              </div>
            )}
            {selectedPoster === 2 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '591px',
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
                  <div className="font-bold">ONCE UPON A TIME IN HOLLYWOOD, 2019</div>
                  <div>Quentin Tarantino, the director, appears with a camera,</div>
                  <div>even though he doesn't appear in the film itself.</div>
                </div>
              </div>
            )}
            {selectedPoster === 3 && (
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
                  <div className="font-bold">UNDER THE SILVER LAKE, 2018</div>
                  <div>Hidden figures like a pirate and a mermaid appear throughout</div>
                  <div>the poster, a nod to the film's theme of hidden clues.</div>
                </div>
              </div>
            )}
            {selectedPoster === 4 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '591px',
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
                  <div className="font-bold">US, 2019</div>
                  <div>The scissor handles form two figures facing opposite directions,</div>
                  <div>a nod to the film's theme of dual identity.</div>
                </div>
              </div>
            )}
            {selectedPoster === 5 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '591px',
                  height: '92px',
                  left: '0',
                  bottom: '-110px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold">10 CLOVERFIELD LANE, 2016</div>
                  <div>The hidden robot is the logo of "Bad Robot Productions",</div>
                  <div>one of the production companies behind the film.</div>
                </div>
              </div>
            )}
            {selectedPoster === 6 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '591px',
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
                  <div className="font-bold">THE DARK KNIGHT, 2008</div>
                  <div>Rotating the poster 90 degrees reveals the phrase</div>
                  <div>"A Taste for the Theatrical", a quote from the previous film's ending.</div>
                </div>
              </div>
            )}
            {selectedPoster === 7 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '591px',
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
                  <div className="font-bold">CAPTAIN MARVEL, 2019</div>
                  <div>Brightening the poster reveals Goose's tail,</div>
                  <div>the cat of the main character Carol Danvers.</div>
                </div>
              </div>
            )}
            {selectedPoster === 8 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '591px',
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
                  <div className="font-bold">PASSENGERS, 2016</div>
                  <div>The lines and circles are arranged in Morse code that spells out "SOS",</div>
                  <div>a hint at the film's characters' distress.</div>
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

export default Poster;