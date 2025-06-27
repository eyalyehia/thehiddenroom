import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Logo = () => {
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
  const [isPageVisible, setIsPageVisible] = useState(!document.hidden);
  const [isPerformanceOptimized, setIsPerformanceOptimized] = useState(false);
  const [isReOptimizing, setIsReOptimizing] = useState(false);
  const [reOptimizationProgress, setReOptimizationProgress] = useState(0);
  const [reOptimizationStage, setReOptimizationStage] = useState('');
  const hoverTimeoutRef = useRef(null);
  const loadingTimeoutsRef = useRef([]);
  const reOptimizationTimeoutsRef = useRef([]);
  const navigate = useNavigate();

  // Performance optimization when page becomes visible
  const optimizePerformance = useCallback(() => {
    if (isPerformanceOptimized || isReOptimizing) return;
    
    // Start re-optimization process with visual feedback
    setIsReOptimizing(true);
    setReOptimizationProgress(0);
    setReOptimizationStage('Preparing the site...');
    
    // Clear any existing re-optimization timeouts
    reOptimizationTimeoutsRef.current.forEach(clearTimeout);
    reOptimizationTimeoutsRef.current = [];
    
    // Progressive optimization stages
    const stages = [
      { progress: 20, stage: 'Clearing memory...', delay: 150 },
      { progress: 40, stage: 'Refreshing interactions...', delay: 200 },
      { progress: 60, stage: 'Optimizing performance...', delay: 200 },
      { progress: 80, stage: 'Restoring responsiveness...', delay: 150 },
      { progress: 100, stage: '✅ Ready to go!', delay: 300 }
    ];
    
    let currentStage = 0;
    
    const processNextStage = () => {
      if (currentStage < stages.length) {
        const stage = stages[currentStage];
        setReOptimizationProgress(stage.progress);
        setReOptimizationStage(stage.stage);
        
        // Perform actual optimizations at key stages
        if (currentStage === 0) {
          // Force garbage collection if available
          if (window.gc) {
            window.gc();
          }
        } else if (currentStage === 1) {
          // Clear any pending animations
          if (hoverTimeoutRef.current) {
            clearTimeout(hoverTimeoutRef.current);
            hoverTimeoutRef.current = null;
          }
          // Reset interaction states
          setHoveredLogo(null);
          setSelectedLogo(null);
        } else if (currentStage === 2) {
          setIsPerformanceOptimized(true);
        }
        
        currentStage++;
        const timeout = setTimeout(processNextStage, stage.delay);
        reOptimizationTimeoutsRef.current.push(timeout);
      } else {
        // Finish optimization
        const finalTimeout = setTimeout(() => {
          setIsReOptimizing(false);
          setIsPerformanceOptimized(false);
          setReOptimizationProgress(0);
          setReOptimizationStage('');
        }, 500);
        reOptimizationTimeoutsRef.current.push(finalTimeout);
      }
    };
    
    // Start the process
    processNextStage();
  }, [isPerformanceOptimized, isReOptimizing]);

  // Enhanced page visibility handling
  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible = !document.hidden;
      setIsPageVisible(isVisible);
      
      if (isVisible && imagesLoaded) {
        // Optimize performance when returning to page
        requestAnimationFrame(() => {
          optimizePerformance();
        });
      }
    };

    const handleFocus = () => {
      if (imagesLoaded) {
        optimizePerformance();
      }
    };

    const handleBlur = () => {
      // Clean up when page loses focus
      setHoveredLogo(null);
      setSelectedLogo(null);
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      // Stop any ongoing re-optimization
      reOptimizationTimeoutsRef.current.forEach(clearTimeout);
      reOptimizationTimeoutsRef.current = [];
      setIsReOptimizing(false);
    };

    // Add multiple event listeners for comprehensive handling
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [imagesLoaded, optimizePerformance]);

  // Complete image preloading - no page display until all images are fully loaded
  useEffect(() => {
    const loadAllImages = async () => {
      // Clear any existing timeouts
      loadingTimeoutsRef.current.forEach(clearTimeout);
      loadingTimeoutsRef.current = [];
      
      setLoadingStage('Initializing image loading...');
      const imageCache = {};
      const loadedImages = {};
      let loadedCount = 0;

      const imageTypes = [
        { folder: 'regular2', key: 'regular2', name: 'Gallery Images' },
        { folder: 'zoomInBit2', key: 'zoomInBit2', name: 'Hover Images' },
        { folder: 'zoomIn2', key: 'zoomIn2', name: 'Modal Images' }
      ];

      const totalImages = imageTypes.length * 15;

      // Create all image promises for complete loading
      const allImagePromises = [];

      for (const type of imageTypes) {
        for (let i = 1; i <= 15; i++) {
          const num = i.toString().padStart(2, '0');
          const imageUrl = `/logo/pictures/${type.folder}/${num}.png`;
          const imageKey = `${type.key}-${i}`;
          
          const promise = new Promise((resolve) => {
            const img = new Image();
            
            img.onload = () => {
              // Create blob URL for optimal performance
              fetch(imageUrl)
                .then(response => response.blob())
                .then(blob => {
                  const blobUrl = URL.createObjectURL(blob);
                  imageCache[imageKey] = blobUrl;
                  loadedImages[imageKey] = img;
                  loadedCount++;
                  
                  const progress = Math.round((loadedCount / totalImages) * 100);
                  setLoadingProgress(progress);
                  
                  // Update stage based on progress
                  if (progress <= 25) {
                    setLoadingStage('Loading Gallery Images...');
                  } else if (progress <= 50) {
                    setLoadingStage('Loading Hover Images...');
                  } else if (progress <= 75) {
                    setLoadingStage('Loading Modal Images...');
                  } else if (progress < 100) {
                    setLoadingStage('Finalizing download...');
                  } else {
                    setLoadingStage('Preparing images...');
                  }
                  
                  resolve({ url: blobUrl, img });
                })
                .catch(() => {
                  // Fallback to direct image URL
                  imageCache[imageKey] = imageUrl;
                  loadedImages[imageKey] = img;
                  loadedCount++;
                  
                  const progress = Math.round((loadedCount / totalImages) * 100);
                  setLoadingProgress(progress);
                  resolve({ url: imageUrl, img });
                });
            };
            
            img.onerror = () => {
              console.warn(`Failed to load image: ${imageUrl}`);
              loadedCount++;
              const progress = Math.round((loadedCount / totalImages) * 100);
              setLoadingProgress(progress);
              resolve({ url: imageUrl, img: null });
            };
            
            // Set image source to start loading
            img.src = imageUrl;
            img.loading = 'eager';
            img.decoding = 'sync';
          });
          
          allImagePromises.push(promise);
        }
      }

      try {
        // Wait for ALL images to be completely loaded
        setLoadingStage('Loading all images...');
        await Promise.all(allImagePromises);
        
        // Set image blobs first
        setImageBlobs(imageCache);
        
        // Comprehensive verification process
        setLoadingStage('Verifying all images are ready...');
        
        // Wait a moment for blobs to be set
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Verify ALL images are truly loaded and accessible
        let allImagesVerified = true;
        const verificationPromises = [];
        
        for (const [, img] of Object.entries(loadedImages)) {
          if (img) {
            const verifyPromise = new Promise((resolve) => {
              // Check if image is complete and has dimensions
              if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
                resolve(true);
              } else {
                // If not ready, wait for it
                const checkImage = () => {
                  if (img.complete && img.naturalWidth > 0) {
                    resolve(true);
                  } else {
                    setTimeout(checkImage, 50);
                  }
                };
                checkImage();
              }
            });
            verificationPromises.push(verifyPromise);
          }
        }
        
        // Wait for all verifications to complete
        await Promise.all(verificationPromises);
        
        // Double-check image blobs are accessible
        for (const [imageKey, url] of Object.entries(imageCache)) {
          if (url.startsWith('blob:')) {
            try {
              const testImg = new Image();
              await new Promise((resolve, reject) => {
                testImg.onload = resolve;
                testImg.onerror = reject;
                testImg.src = url;
              });
            } catch (error) {
              console.warn(`Blob verification failed for ${imageKey}:`, error);
              allImagesVerified = false;
            }
          }
        }
        
        if (!allImagesVerified) {
          setLoadingStage('Re-checking images...');
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Final stage - everything is truly ready
        setLoadingStage('✅ Everything ready!');
        
        // Give a moment for final preparations
        const finalTimeout = setTimeout(() => {
          setImagesLoaded(true);
        }, 500);
        loadingTimeoutsRef.current.push(finalTimeout);
        
      } catch (error) {
        console.error('Error loading images:', error);
        setLoadingStage('Error occurred, but continuing...');
        setHasStartedLoading(false); // Reset for retry
        setImagesLoaded(true);
      }
    };

    // Only load images if they haven't been loaded yet and we haven't started loading
    if (!imagesLoaded && !hasStartedLoading && Object.keys(imageBlobs).length === 0) {
      setHasStartedLoading(true);
      loadAllImages();
    }
    
    // Cleanup function
    return () => {
      // Clear all timeouts
      loadingTimeoutsRef.current.forEach(clearTimeout);
      loadingTimeoutsRef.current = [];
      
      // Clear re-optimization timeouts
      reOptimizationTimeoutsRef.current.forEach(clearTimeout);
      reOptimizationTimeoutsRef.current = [];
      
      // Clear hover timeout
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array to run only once

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

  // Memoized zoom configurations for better performance
  const logoZoomConfigs = useMemo(() => ({
      1: { zoomSize: 'w-11', zoomHeight: 'h-11', zoomOffset: { x: -100, y: -25 } },
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

  // Optimized event handlers with minimal re-renders
  const handleLogoEnter = useMemo(() => (logoId, event) => {
    // Only proceed if page is visible and images are loaded
    if (!isPageVisible || !imagesLoaded || isPerformanceOptimized) return;
    
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
  }, [clickedLogos, imagesLoaded, isPageVisible, isPerformanceOptimized]);

  const handleLogoLeave = useMemo(() => () => {
    // Only proceed if page is visible
    if (!isPageVisible || isPerformanceOptimized) return;
    
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredLogo(null);
    }, 30);
  }, [isPageVisible, isPerformanceOptimized]);

  const handleZoomedImageEnter = useMemo(() => () => {
    if (!isPageVisible || hoverTimeoutRef.current) {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
    }
  }, [isPageVisible]);

  const handleZoomedImageLeave = useMemo(() => () => {
    if (isPageVisible) {
      setHoveredLogo(null);
    }
  }, [isPageVisible]);

  const handleLogoClick = useMemo(() => (logoId) => {
    // Only proceed if page is visible and images are loaded
    if (!isPageVisible || !imagesLoaded || isPerformanceOptimized) return;
    
    setClickedLogos(prev => new Set([...prev, logoId]));
    setSelectedLogo(logoId);
  }, [imagesLoaded, isPageVisible, isPerformanceOptimized]);

  const handleNextPage = () => {
    console.log('Next page clicked');
  };

  // Memoized logo grid for performance
  const logoGrid = useMemo(() => {
    if (!imagesLoaded || !isPageVisible || Object.keys(imageBlobs).length === 0) return null;
    
    return Array.from({ length: 15 }, (_, index) => {
      const logoNum = index + 1;
      const row = Math.floor(index / 5);
      const col = index % 5;
      
      const horizontalSpacing = 200;
      const leftMargin = 140;
      
      const top = 139 + (row * 250);
      const left = leftMargin + (col * (168 + horizontalSpacing));
      
      const imageSrc = imageBlobs[`regular2-${logoNum}`] || `/logo/pictures/regular2/${logoNum.toString().padStart(2, '0')}.png`;
      
      return (
        <img
          key={logoNum}
          src={imageSrc}
          alt={`Logo ${logoNum}`}
          className="absolute cursor-pointer logo-item transition-transform duration-100 hover:scale-105 will-change-transform"
          data-logo-id={logoNum}
          style={{
            width: '168px',
            height: '146px',
            top: `${top}px`,
            left: `${left}px`,
            objectFit: 'contain',
            imageRendering: 'crisp-edges',
            pointerEvents: isPerformanceOptimized ? 'none' : 'auto'
          }}
          onMouseEnter={(e) => handleLogoEnter(logoNum, e)}
          onMouseLeave={handleLogoLeave}
          loading="eager"
          decoding="sync"
        />
      );
    });
  }, [imagesLoaded, imageBlobs, handleLogoEnter, handleLogoLeave, isPageVisible, isPerformanceOptimized]);

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
      
      {/* Re-optimization Screen for returning users */}
      {isReOptimizing && imagesLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-50">
          <div className="text-center space-y-8 max-w-md w-full px-8">
            {/* Welcome Back Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-wider">
                Welcome Back! 👋
              </h1>
              <p className="text-gray-300 text-lg">Preparing the site for you...</p>
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
                  stroke="url(#reOptimGradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 50}`}
                  strokeDashoffset={`${2 * Math.PI * 50 * (1 - reOptimizationProgress / 100)}`}
                  className="transition-all duration-300 ease-out"
                />
                <defs>
                  <linearGradient id="reOptimGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="50%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#8B5CF6" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Percentage Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{reOptimizationProgress}%</span>
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
                    value={reOptimizationProgress}
                    disabled
                    className="w-full h-4 bg-gray-700 rounded-lg appearance-none cursor-not-allowed"
                    style={{
                      background: `linear-gradient(to right, #10B981 0%, #3B82F6 ${reOptimizationProgress/2}%, #8B5CF6 ${reOptimizationProgress}%, #374151 ${reOptimizationProgress}%, #374151 100%)`,
                      WebkitAppearance: 'none',
                      MozAppearance: 'none'
                    }}
                  />
                  <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-lg opacity-20"></div>
                </div>
                
                {/* Progress Text with Animation */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400 font-medium">
                    Optimizing Performance
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-white">
                      {reOptimizationProgress}%
                    </span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Beautiful Progress Bar Alternative */}
              <div className="space-y-2">
                <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden border border-gray-600 shadow-inner">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-500 ease-out rounded-full relative overflow-hidden"
                    style={{ width: `${reOptimizationProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    <div className="absolute right-0 top-0 w-8 h-full bg-white/30 blur-sm animate-pulse"></div>
                  </div>
                </div>
                
                {/* Loading Stage Text with Icon */}
                <div className="text-center flex items-center justify-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce"></div>
                  <p className="text-gray-300 text-sm font-medium tracking-wide">
                    {reOptimizationStage}
                  </p>
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                </div>
              </div>
            </div>

            {/* Loading Tips */}
            <div className="text-center">
              <p className="text-gray-400 text-xs italic">
                "Preparing a smooth and fast experience for you ✨"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Beautiful Loading Screen */}
      {!imagesLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center z-50">
          <div className="text-center space-y-8 max-w-md w-full px-8">
            {/* Logo/Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-white tracking-wider">
                Hidden<span className="text-blue-400">Logos</span>
              </h1>
              <p className="text-gray-300 text-lg">Discovering brand secrets</p>
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
                ></div>
              ))}
            </div>

            {/* Loading Tips */}
            <div className="text-center">
              <p className="text-gray-400 text-xs italic">
                "Every logo tells a story... preparing to reveal theirs"
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

      {/* תמונות הלוגואים - Optimized grid */}
      {logoGrid}

      {/* Instant Zoomed Image Display */}
      {hoveredLogo && imagesLoaded && isPageVisible && !isPerformanceOptimized && (() => {
        const cfg = getLogoZoomConfig(hoveredLogo);
        const zoomImageSrc = imageBlobs[`zoomInBit2-${hoveredLogo}`] || `/logo/pictures/zoomInBit2/${hoveredLogo.toString().padStart(2, '0')}.png`;
        
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
                backfaceVisibility: 'hidden'
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

      {/* Instant Modal Display */}
      {selectedLogo && imagesLoaded && isPageVisible && (
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
              src={imageBlobs[`zoomIn2-${selectedLogo}`] || `/logo/pictures/zoomIn2/${selectedLogo.toString().padStart(2, '0')}.png`}
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
            
            {/* Logo descriptions */}
            {selectedLogo === 1 && (
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
                  <div className="font-bold text-xl mb-1">TOBLERONE</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">A bear is hidden in the mountain.</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">a reference to Bern, where Toblerone was founded.</div>
                </div>
              </div>
            )}
            {selectedLogo === 3 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '502px',
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
                  <div className="font-normal text-base opacity-70 text-gray-300">The letters T-I-T form two figures sharing a chip</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">and dipping it into a bowl of salsa.</div>
                </div>
              </div>
            )}
            {selectedLogo === 2 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '502px',
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
                  <div className="font-normal text-base opacity-70 text-gray-300">The negative space between the arm and leg is</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">shaped like Australia.</div>
                </div>
              </div>
            )}
            {selectedLogo === 4 && (
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
                  width: '590px',
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
                  <div className="font-normal text-base opacity-70 text-gray-300">The letters "my" are designed to form the</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">image of a hand.</div>
                </div>
              </div>
            )}
            {selectedLogo === 6 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '597px',
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
                  <div className="font-bold text-xl mb-1">WENDY'S</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The word "mom" appears within the collar of the girl's</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">blouse, suggesting a sense of home-cooked, motherly food.</div>
                </div>
              </div>
            )}
            {selectedLogo === 7 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '531px',
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
                  <div className="font-normal text-base opacity-70 text-gray-300">The letter "C" is hidden in the negative space between</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">the two arrows, reflecting the brand's initial.</div>
                </div>
              </div>
            )}
            {selectedLogo === 8 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '470px',
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
                  <div className="font-bold text-xl mb-1">ORBIT</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The split "O" with a vertical line suggests an orbital</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">path, visually reflecting the brand name.</div>
                </div>
              </div>
            )}
            {selectedLogo === 9 && (
              <div 
                className="absolute text-white"
                style={{
                  position: 'absolute',
                  width: '638px',
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
                  <div className="font-normal text-base opacity-70 text-gray-300">The number "31" is hidden within the letters B and R, a reference</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">to the brand's original promise of 31 ice cream flavors.</div>
                </div>
              </div>
            )}
            {selectedLogo === 10 && (
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
                  <div className="font-bold text-xl mb-1">LEVIS</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">The logo's shape mimics the back pocket stitching on their</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">jeans, a visual link to the product itself.</div>
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
                  <div className="font-normal text-base opacity-70 text-gray-300">A hidden chocolate kiss is formed in the negative</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">space between the "K" and "I".</div>
                </div>
              </div>
            )}
            {selectedLogo === 12 && (
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
                  width: '446px',
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
                  <div className="font-normal text-base opacity-70 text-gray-300">Diagonal cuts in the "G" and "i" make them look</div>
                  <div className="font-normal text-base opacity-70 text-gray-300">as if sliced by a razor blade.</div>
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