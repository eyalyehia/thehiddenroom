import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Logo2 = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [hoveredLogo, setHoveredLogo] = useState(null);
  const [selectedLogo, setSelectedLogo] = useState(null);
  const [clickedLogos, setClickedLogos] = useState(new Set());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [imageBlobs, setImageBlobs] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStage, setLoadingStage] = useState('Initializing...');
  const [hasStartedLoading, setHasStartedLoading] = useState(false);

  const hoverTimeoutRef = useRef(null);
  const loadingTimeoutsRef = useRef([]);
  const navigate = useNavigate();



  // PROGRESSIVE LOADING - Show gallery images first, then load hover images in background
  useEffect(() => {
    const loadProgressively = async () => {
      if (imagesLoaded || hasStartedLoading) return;
      
      setHasStartedLoading(true);
      setLoadingStage('🚀 Loading gallery...');
      
      const imageCache = {};

      // PHASE 1: Load gallery images ONLY (fast display)
      const loadGalleryImages = async () => {
        const galleryPromises = [];

        
        for (let i = 1; i <= 15; i++) {
          const num = i.toString().padStart(2, '0');
          const imageUrl = `/logo/pictures/page2regular/${num}.png`;
          const imageKey = `page2regular-${i}`;
          
          const promise = new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
              imageCache[imageKey] = imageUrl;
              setLoadingProgress(Math.round((i / 15) * 70)); // 70% for gallery
              resolve(true);
            };
            img.onerror = () => {
              imageCache[imageKey] = imageUrl;
              resolve(false);
            };
            img.src = imageUrl;
          });
          
          galleryPromises.push(promise);
        }
        
        await Promise.all(galleryPromises);
        
        // Show the page with gallery images immediately
        setImageBlobs({...imageCache});
        setLoadingProgress(70);
        setLoadingStage('✅ Ready to explore!');
        setImagesLoaded(true);
        
        // Continue loading other images in background
        loadBackgroundImages();
      };

      // PHASE 2: Load hover and modal images in background (non-blocking)
      const loadBackgroundImages = async () => {
        const backgroundTypes = [
          { folder: 'page2zoomBit2', key: 'page2zoomBit2' },
          { folder: 'page2zoomIn', key: 'page2zoomIn' }
        ];

        let backgroundLoaded = 0;
        const totalBackground = 30; // 15 + 15

        for (const type of backgroundTypes) {
          for (let i = 1; i <= 15; i++) {
            const num = i.toString().padStart(2, '0');
            const imageUrl = `/logo/pictures/${type.folder}/${num}.png`;
            const imageKey = `${type.key}-${i}`;
            
            // Load asynchronously without blocking
            const img = new Image();
            img.onload = () => {
              imageCache[imageKey] = imageUrl;
              backgroundLoaded++;
              
              // Update cache silently
              setImageBlobs({...imageCache});
              
              if (backgroundLoaded === totalBackground) {
                console.log('🎉 All hover images loaded in background!');
              }
            };
            img.onerror = () => {
              imageCache[imageKey] = imageUrl;
              backgroundLoaded++;
            };
            img.src = imageUrl;
            
            // Small delay between loads to not overwhelm
            await new Promise(resolve => setTimeout(resolve, 50));
          }
        }
      };

      // Start with gallery images
      loadGalleryImages();
    };

    loadProgressively();
    
    // Cleanup function
    return () => {
      loadingTimeoutsRef.current.forEach(clearTimeout);
      loadingTimeoutsRef.current = [];
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
  }, []); // Run only once

  // Separate cleanup effect for blob URLs
  useEffect(() => {
    return () => {
      // Revoke blob URLs when component unmounts
      Object.values(imageBlobs).forEach(url => {
        if (url && url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imageBlobs]);

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
    navigate('/notebook');
  };

  const handleBackClick = () => {
    navigate('/logo');
  };

  // Super optimized hover handlers for instant response
  const handleLogoEnter = useMemo(() => (logoId, event) => {
    // Only proceed if images are loaded
    if (!imagesLoaded) return;
    
    // Clear any pending timeouts immediately
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (clickedLogos.has(logoId)) {
      setSelectedLogo(logoId);
    } else {
      // Pre-calculate position for instant display
      const rect = event.currentTarget.getBoundingClientRect();
      const position = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      
      // Set both position and hover state in one batch
      setMousePosition(position);
      setHoveredLogo(logoId);
      
      // Preload the hover image if not already cached
      const hoverImageUrl = `/logo/pictures/page2zoomBit2/${logoId.toString().padStart(2, '0')}.png`;
      const img = new Image();
      img.src = hoverImageUrl;
    }
  }, [clickedLogos, imagesLoaded]);

  const handleLogoLeave = useMemo(() => () => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    // Shorter timeout for faster response
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLogo(null);
    }, 10);
  }, []);

  const handleZoomedImageEnter = useMemo(() => () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  }, []);

  const handleZoomedImageLeave = useMemo(() => () => {
    setHoveredLogo(null);
  }, []);

  const handleLogoClick = useMemo(() => (logoId) => {
    // Only proceed if images are loaded
    if (!imagesLoaded) return;
    
    setClickedLogos(prev => new Set([...prev, logoId]));
    setSelectedLogo(logoId);
  }, [imagesLoaded]);

  // Memoized zoom configurations for better performance (same as page 1 for consistency)
  const logoZoomConfigs = useMemo(() => ({
      1: { zoomSize: 'w-25', zoomHeight: 'h-21', zoomOffset: { x: -80, y:-50 } },
      2: { zoomSize: 'w-5', zoomHeight: 'h-28', zoomOffset: { x: 38, y:-40 } },
      3: { zoomSize: 'w-53', zoomHeight: 'h-15', zoomOffset: { x: -98, y: -50 } },
      4: { zoomSize: 'w-13', zoomHeight: 'h-auto', zoomOffset: { x: 20, y: -40 } },
      5: { zoomSize: 'w-12', zoomHeight: 'h-10', zoomOffset: { x: -68, y: -19 } },
      6: { zoomSize: 'w-65', zoomHeight: 'h-25', zoomOffset: { x: -135, y: -80 } },
      7: { zoomSize: 'w-40', zoomHeight: 'h-10', zoomOffset: { x: -90, y: -10 } },
      8: { zoomSize: 'w-45', zoomHeight: 'h-25', zoomOffset: { x: -90, y: -85 } },
      9: { zoomSize: 'w-18', zoomHeight: 'h-22', zoomOffset: { x: -90, y: -45 } },
      10: { zoomSize: 'w-25', zoomHeight: 'h-12', zoomOffset: { x: -90, y:-35 } },
      11: { zoomSize: 'w-35', zoomHeight: 'h-auto', zoomOffset: { x: -70, y: -95 } },
      12: { zoomSize: 'w-24', zoomHeight: 'h-14', zoomOffset: { x: -135, y: -30 } },
      13: { zoomSize: 'w-10', zoomHeight: 'h-27', zoomOffset: { x: 15, y: -55 } },
      14: { zoomSize: 'w-20', zoomHeight: 'h-12', zoomOffset: { x: 5, y: -45 } },
      15: { zoomSize: 'w-45', zoomHeight: 'h-23', zoomOffset: { x: -135, y:-25 } },
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

  // Memoized logo grid for performance
  const logoGrid = useMemo(() => {
    if (!imagesLoaded || Object.keys(imageBlobs).length === 0) return null;
    
    return Array.from({ length: 15 }, (_, index) => {
      const logoNum = index + 1;
      const row = Math.floor(index / 5);
      const col = index % 5;
      
      const horizontalSpacing = 200;
      const leftMargin = 140;
      
      const top = 139 + (row * 250);
      const left = leftMargin + (col * (168 + horizontalSpacing));
      
      const imageSrc = imageBlobs[`page2regular-${logoNum}`] || `/logo/pictures/page2regular/${logoNum.toString().padStart(2, '0')}.png`;
      

      
      return (
        <img
          key={logoNum}
          src={imageSrc}
          alt={`Logo ${logoNum}`}
          className="absolute cursor-pointer logo-item will-change-transform"
          data-logo-id={logoNum}
          style={{
            width: '168px',
            height: '146px',
            top: `${top}px`,
            left: `${left}px`,
            objectFit: 'contain',
            imageRendering: 'crisp-edges',
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            transition: 'transform 0.1s ease-out'
          }}
          onMouseEnter={(e) => handleLogoEnter(logoNum, e)}
          onMouseLeave={handleLogoLeave}
          loading="eager"
          decoding="sync"
        />
      );
    });
  }, [imagesLoaded, imageBlobs, handleLogoEnter, handleLogoLeave]);

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
      


      {/* Beautiful Loading Screen */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-50">
          <div className="text-center space-y-8 max-w-md w-full px-8">
            {/* Logo/Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-wider">
                Hidden<span className="text-blue-400">Logos</span> 
                <span className="text-2xl text-gray-400 ml-2">Page 2</span>
              </h1>
              <p className="text-gray-300 text-lg">More brand secrets await discovery</p>
            </div>

            {/* Progress Circle Animation */}
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                {/* Background Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="rgba(75, 85, 99, 0.3)"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Progress Circle */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="url(#progressGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - loadingProgress / 100)}`}
                  className="transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#06B6D4" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Percentage Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{loadingProgress}%</span>
              </div>
            </div>

            {/* Enhanced Progress Section */}
            <div className="space-y-6">
              {/* Input Range Style Progress */}
              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={loadingProgress}
                    disabled
                    className="w-full h-4 bg-gray-700 rounded-lg appearance-none cursor-not-allowed"
                    style={{
                      background: `linear-gradient(to right, #3B82F6 0%, #8B5CF6 ${loadingProgress/2}%, #06B6D4 ${loadingProgress}%, #374151 ${loadingProgress}%, #374151 100%)`,
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  />
                  <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 rounded-lg opacity-20"></div>
                </div>
                
                {/* Progress Text with Animation */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 font-medium">
                    Loading Images
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">
                      {loadingProgress}%
                    </span>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Beautiful Progress Bar Alternative */}
              <div className="space-y-2">
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-600 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 transition-all duration-500 ease-out rounded-full relative overflow-hidden"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <div className="absolute right-0 top-0 w-8 h-full bg-white/30 blur-sm animate-pulse"></div>
                  </div>
                </div>
                
                {/* Loading Stage Text with Icon */}
                <div className="text-center flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                  <p className="text-gray-300 text-sm font-medium tracking-wide">
                    {loadingStage}
                  </p>
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                </div>
              </div>
            </div>

            {/* Animated Dots */}
            <div className="flex justify-center space-x-2">
              {[0, 1, 2].map((index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: '1s'
                  }}
                />
              ))}
            </div>

            {/* Loading Tips */}
            <div className="text-center">
              <p className="text-gray-400 text-xs italic">
                "Page 2 - Even more hidden secrets revealed..."
              </p>
            </div>
          </div>
        </div>
      )}
      
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

      {/* תמונות הלוגואים - Logo Grid */}
      {logoGrid}

      {/* Instant Zoomed Image Display */}
      {hoveredLogo && imagesLoaded && (() => {
        const cfg = getLogoZoomConfig(hoveredLogo);
        const zoomImageSrc = imageBlobs[`page2zoomBit2-${hoveredLogo}`] || `/logo/pictures/page2zoomBit2/${hoveredLogo.toString().padStart(2, '0')}.png`;
        
        return (
          <div
            className="fixed z-50 pointer-events-none"
            style={{
              left: `${mousePosition.x + cfg.zoomOffset.x}px`,
              top: `${mousePosition.y + cfg.zoomOffset.y}px`,
              transform: 'translate3d(0, 0, 0)',
              willChange: 'transform',
            }}
          >
            <img
              src={zoomImageSrc}
              alt={`Zoomed Logo ${hoveredLogo}`}
              className={`${cfg.zoomSize} ${cfg.zoomHeight} object-cover border border-white shadow-2xl bg-black/90 cursor-pointer pointer-events-auto`}
              style={{ 
                willChange: 'transform',
                imageRendering: 'crisp-edges',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                opacity: 1,
                transition: 'none'
              }}
              onMouseEnter={handleZoomedImageEnter}
              onMouseLeave={handleZoomedImageLeave}
              onClick={() => handleLogoClick(hoveredLogo)}
              loading="eager"
              decoding="sync"
            />
          </div>
        );
      })()}

      {/* Instant Modal Display */}
      {selectedLogo && imagesLoaded && (
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
            <img
              src={imageBlobs[`page2zoomIn-${selectedLogo}`] || `/logo/pictures/page2zoomIn/${selectedLogo.toString().padStart(2, '0')}.png`}
              alt={`Logo ${selectedLogo}`}
              className={`w-full h-auto object-cover ${getLogoModalConfig(selectedLogo).maxHeight} border border-white shadow-2xl`}
              style={{ 
                marginTop: getLogoModalConfig(selectedLogo).marginTop,
                marginLeft: getLogoModalConfig(selectedLogo).marginLeft,
                imageRendering: 'crisp-edges'
              }}
              loading="eager"
              decoding="sync"
            />
            
            {/* Page 2 Logo descriptions - placeholder for now */}
            <div 
              className="absolute text-white"
              style={{
                position: 'absolute',
                width: '580px',
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
                <div className="font-bold text-xl mb-1">LOGO {selectedLogo}</div>
                <div className="font-normal text-base opacity-70 text-gray-300">Hidden message will be revealed here...</div>
                <div className="font-normal text-base opacity-70 text-gray-300">Page 2 - More secrets await discovery.</div>
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