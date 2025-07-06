import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../components/common/getBase64';

const Poster = () => {
  const [hoveredPoster, setHoveredPoster] = useState(null);
  const [selectedPoster, setSelectedPoster] = useState(null);
  const [clickedPosters, setClickedPosters] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const hoverTimeoutRef = useRef(null);
  const currentHotspotRef = useRef(null);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({});
  const [posterImagesLoaded, setPosterImagesLoaded] = useState({});
  const navigate = useNavigate();

  const posters = Array.from({ length: 8 }, (_, index) => ({
    id: index + 1,
    src: `/poster/pictures/regular/${(index + 1).toString().padStart(2, '0')}${index + 1 === 4 ? '.webp' : '.jpg'}`,
    alt: `Poster ${index + 1}`,
    hotspots: getHotspotsForPoster(index + 1)
  }));

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
            setPosterImagesLoaded(prev => ({...prev, ...loaded}));
          };
        }
      }
      setImagePreviews(previews);
    };

    loadImagePreviews();
  }, []);

  function getPosterZoomConfig(posterId) {
    const configs = {
      1: {
        hotspot: { left: 37, top: 43, width: 25, height: 15 },
        zoomSize: "w-30",
        zoomHeight: "h-auto",
        zoomOffset: { x: -105, y: -5 }
      },
      2: {
        hotspot: { left: 50, top: 30, width: 20, height: 15 },
        zoomSize: "w-27",
        zoomHeight: "h-auto",
        zoomOffset: { x: -119, y: 10 }
      },
      3: {
        hotspot: { left: 35, top: 20, width: 30, height: 15 },
        zoomSize: "w-28",
        zoomHeight: "h-auto",
        zoomOffset: { x: -115, y: -40 }
      },
      4: {
        hotspot: { left: 40, top: 5, width: 10, height: 20 },
        zoomSize: "w-30",
        zoomHeight: "h-auto",
        zoomOffset: { x: -70, y:-5 }
      },
      5: {
        hotspot: { left: 5, top:70, width: 20, height: 10 },
        zoomSize: "w-27",
        zoomHeight: "h-auto",
        zoomOffset: { x: -80, y: -20 }
      },
      6: {
        hotspot: { left: 40, top: 85, width: 20, height: 15 },
        zoomSize: "w-45",
        zoomHeight: "h-2",
        zoomOffset: { x: -130, y: 40 }
      },
      7: {
        hotspot: { left: 2, top: 70, width: 20, height: 15 },
        zoomSize: "w-24",
        zoomHeight: "h-30",
        zoomOffset: { x: -80, y: -25 }
      },
      8: {
        hotspot: { left: 40, top: 48, width: 15, height: 15 },
        zoomSize: "w-55",
        zoomHeight: "h-auto",
        zoomOffset: { x: -130, y: 29 }
      }
    };

    return configs[posterId] || {
      hotspot: { left: 40, top: 40, width: 20, height: 20 },
      zoomSize: "w-48",
      zoomHeight: "h-auto",
      zoomOffset: { x: 20, y: -100 }
    };
  }

  function getHotspotsForPoster(posterId) {
    return [getPosterZoomConfig(posterId).hotspot];
  }

  const handleClose = () => {
    navigate('/');
  };

  const handleNextPage = () => {
    navigate('/poster2');
  };

  const handleNotebookClick = () => {
    navigate('/notebook');
  };

  // Enhanced hover detection for better user experience

  const handleHotspotEnter = (posterId, event) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Store the current hotspot element for tracking
    currentHotspotRef.current = event.currentTarget;

    if (clickedPosters.has(posterId)) {
      setSelectedPoster(posterId);
    } else {
      setHoveredPoster(posterId);
      const rect = event.currentTarget.getBoundingClientRect();
      setMousePosition({ 
        x: rect.right + 10,
        y: rect.top
      });
    }
  };

  const handleHotspotLeave = () => {
    // Add a small delay before removing the hover state
    // This helps when moving quickly between hotspots
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredPoster(null);
    }, 50); // 50ms delay to maintain hover during quick mouse movements
  };

  const handleHotspotClick = (posterId) => {
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

  return (
    <div className="min-h-screen w-full relative overflow-hidden" style={{ backgroundColor: '#1D1C1A' }}>
      {/* תמונות נסתרות לטעינה מיידית */}
      <div className="hidden">
        {Array.from({ length: 8 }, (_, i) => (
          <img
            key={i + 1}
            className="preload-zoom-image"
            src={`/poster/pictures/zoomIn/${(i + 1).toString().padStart(2, '0')}.png`}
            alt={`Preload ${i + 1}`}
            loading="eager"
            decoding="sync"
          />
        ))}
      </div>
      

      
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

                {poster.hotspots.map((hotspot, hotspotIndex) => (
                  <div
                    key={hotspotIndex}
                    className="absolute cursor-pointer hover-detection-area"
                    style={{
                      left: `${Math.max(0, hotspot.left - 3)}%`,  /* Adjusted detection area for larger posters */
                      top: `${Math.max(0, hotspot.top - 3)}%`,     /* Adjusted detection area for larger posters */
                      width: `${Math.min(100, hotspot.width + 6)}%`,              /* Adjusted detection area for larger posters */
                      height: `${Math.min(100, hotspot.height + 6)}%`,            /* Adjusted detection area for larger posters */
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

      {hoveredPoster && (
        <div 
          className="fixed z-50 cursor-pointer"
          style={{
            left: mousePosition.x + getPosterZoomConfig(hoveredPoster).zoomOffset.x,
            top: mousePosition.y + getPosterZoomConfig(hoveredPoster).zoomOffset.y,
            transform: 'translate(0, 0)',
            willChange: 'transform, opacity'
          }}
          onMouseEnter={handleZoomedImageEnter}
          onMouseLeave={handleZoomedImageLeave}
          onClick={() => handleHotspotClick(hoveredPoster)}
        >
          <img
            src={`/poster/pictures/zoomIn/${hoveredPoster.toString().padStart(2, '0')}.png`}
            alt={`Poster ${hoveredPoster}`}
            className={`${getPosterZoomConfig(hoveredPoster).zoomSize} ${getPosterZoomConfig(hoveredPoster).zoomHeight} object-cover border border-white shadow-2xl bg-black/90 opacity-0 animate-fadeIn`}
            style={{ 
              willChange: 'transform',
              animation: 'fadeIn 0.15s ease-out forwards'
            }}
            loading="eager"
            decoding="sync"
          />
        </div>
      )}

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
            const posterElements = document.querySelectorAll('.poster-item');
            const clickedPoster = Array.from(posterElements).find(
              (el) => Number(el.getAttribute('data-poster-id')) === selectedPoster
            );
            
            if (clickedPoster) {
              const rect = clickedPoster.getBoundingClientRect();
              
              if (
                e.clientX < rect.left || 
                e.clientX > rect.right || 
                e.clientY < rect.top || 
                e.clientY > rect.bottom
              ) {
                setSelectedPoster(null);
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
              className={`w-full h-auto object-cover ${selectedPoster === 6 ? 'max-h-[20vh]' : selectedPoster === 8 ? 'max-h-[10vh] max-w-[470px]' : 'max-h-[70vh]'} border border-white shadow-2xl`}
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
                  <div className="font-bold text-xl mb-1">THE SILENCE OF THE LAMBS, 1991</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The skull on the moth's back is made of seven nude</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">women, in a composition based on Salvador Dalí's art.</div>
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
                  <div className="font-bold text-xl mb-1">ONCE UPON A TIME IN HOLLYWOOD, 2019</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">Quentin Tarantino, the director, appears with a camera,</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">even though he doesn't appear in the film itself.</div>
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
                  <div className="font-bold text-xl mb-1">UNDER THE SILVER LAKE, 2018</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">Hidden figures like a pirate and a mermaid appear throughout</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">the poster, a nod to the film's theme of hidden clues.</div>
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
                  <div className="font-bold text-xl mb-1">US, 2019</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The scissor handles form two figures facing opposite</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">directions, a nod to the film’s theme of dual identity.</div>
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
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF'
                }}
              >
                <div className="text-left">
                  <div className="font-bold text-xl mb-1">10 CLOVERFIELD LANE, 2016</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The hidden robot is the logo of "Bad Robot Productions",</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">one of the production companies behind the film.</div>
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
                  <div className="font-bold text-xl mb-1">THE DARK KNIGHT, 2008</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">Rotating the poster 90 degrees reveals the phrase "A Taste for the Theatrical",a quote from the previous film's ending</div>
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
                  <div className="font-bold text-xl mb-1">CAPTAIN MARVEL, 2019</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">Brightening the poster reveals Goose's tail,</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">the cat of the main character Carol Danvers.</div>
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
                  left: '85px',
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
                  <div className="font-bold text-xl mb-1">PASSENGERS, 2016</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The lines and circles are arranged in Morse code that spells</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">out "SOS", a hint at the film's characters' distress.</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Poster; 