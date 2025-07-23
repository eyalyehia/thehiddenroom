import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInTvMove1Area, getTvMove1ClickableAreas } from '../../../../components/constant/clickableAreas';
import getBase64 from '../../../../components/common/getBase64';

const InMove3 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const [isHoveringModalBackButton, setIsHoveringModalBackButton] = useState(false);
  // הסרתי את showClickableAreas
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [clickedImages, setClickedImages] = useState(new Set());
  const [image, setImage] = useState('');
  const [hoverImage, setHoverImage] = useState('');
  const [zoomInImage, setZoomInImage] = useState('');
  const [showZoomInModal, setShowZoomInModal] = useState(false);
  const [isAreaHovered, setIsAreaHovered] = useState(false);
  const [isHoveringZoomImage, setIsHoveringZoomImage] = useState(false);

  const hoverTimeoutRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      const [mainImg, hoverImg, zoomImg] = await Promise.all([
        getBase64('/tv/pictures/tv1/move-1/regular/03.png'),
        getBase64('/tv/pictures/tv1/move-1/zoonBit/03.png'),
        getBase64('/tv/pictures/tv1/move-1/zoomIn/03.png')
      ]);
      setImage(mainImg);
      setHoverImage(hoverImg);
      setZoomInImage(zoomImg);
    };
    loadImages();
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

  const handleBack = () => {
    // Reset all states before navigating
    setHoveredImage(null);
    setSelectedImage(null);
    setShowZoomInModal(false);
    setIsAreaHovered(false);
    setClickedImages(new Set());
    navigate(-1);
  };

  const handleZoomInModalClose = () => {
    setShowZoomInModal(false);
    setSelectedImage(null);
    setClickedImages(new Set()); // Reset clicked state when closing modal
  };

  // Hover configurations
  const imageZoomConfigs = useMemo(() => ({
    3: { zoomSize: 'w-[164px]', zoomHeight: 'h-[451px]', zoomOffset: { x: -879, y: 20 } }
  }), []);

  const getImageZoomConfig = (imageId) => {
    return imageZoomConfigs[imageId] || { 
      zoomSize: 'w-[235px]', 
      zoomHeight: 'h-[755px]', 
      zoomOffset: { x: -40, y: -30 } 
    };
  };

  // Hover handler for image hotspots
  const handleImageEnter = useMemo(() => (imageId) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    if (clickedImages.has(imageId)) {
      setSelectedImage(imageId);
    } else {
      setHoveredImage(imageId);
      setIsAreaHovered(true);
    }
  }, [clickedImages]);

  const handleImageLeave = useMemo(() => () => {
    // Add a small delay before removing the hover state
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredImage(null);
      setIsAreaHovered(false);
    }, 50); // 50ms delay to maintain hover during quick mouse movements
  }, []);

  const handleImageMouseMove = useMemo(() => (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Check if mouse is in clickable area
    const inClickableArea = isPointInTvMove1Area(3, mouseX, mouseY, rect.width, rect.height);
    
    // Change cursor based on clickable area
    event.currentTarget.style.cursor = inClickableArea ? 'pointer' : 'default';
    
    // If we were hovering and moved out of clickable area, hide hover
    if (hoveredImage && !inClickableArea) {
      handleImageLeave();
    }
    // If we weren't hovering and moved into clickable area, show hover
    else if (!hoveredImage && inClickableArea && !clickedImages.has(3)) {
      handleImageEnter(3);
    }
  }, [hoveredImage, clickedImages, handleImageEnter, handleImageLeave]);

  const handleImageClick = useMemo(() => (imageId) => {
    setClickedImages(prev => new Set([...prev, imageId]));
    setSelectedImage(imageId);
    setShowZoomInModal(true);
  }, []);

  // הסרתי את renderClickableAreasDebug

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1D1C1A' }}>
      <div 
        className="relative overflow-hidden w-full h-screen" 
        style={{ backgroundColor: '#1D1C1A' }}
      >
        {/* Back Button */}
        <button
          className="fixed top-6 right-6 transition-opacity z-50 cursor-pointer border-0 outline-none focus:outline-none"
          style={{ 
            width: '29px', 
            height: '45px',
            transform: isHoveringBackButton ? 'scale(0.90)' : 'scale(1)',
            transition: 'all 0.2s ease-in-out',
            backgroundColor: 'transparent'
          }}
          onClick={handleBack}
          onMouseEnter={() => setIsHoveringBackButton(true)}
          onMouseLeave={() => setIsHoveringBackButton(false)}
        >
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" 
              fill={isHoveringBackButton ? "white" : "none"}
              stroke="white" 
              strokeWidth="2" 
              strokeMiterlimit="10"
            />
          </svg>
        </button>

        {/* Debug Button */}
        {/* הסרתי את כפתור הצגת האזורים האדומים */}

        {/* Main Image */}
        <div 
          className="relative w-full h-full"
          onMouseMove={handleImageMouseMove}
          onMouseLeave={handleImageLeave}
        >
          <img 
            src={image || "/tv/pictures/tv1/move-1/regular/03.png"}
            alt="Full Screen Scene"
            className="w-full h-full object-cover"
            style={{
              willChange: 'transform',
              imageRendering: 'crisp-edges',
              backfaceVisibility: 'hidden',
              transform: 'translateZ(0)',
            }}
          />
          {/* Add clickable area overlay */}
          {getTvMove1ClickableAreas(3).map((area, index) => (
            <div
              key={`clickable-${index}`}
              className="absolute cursor-pointer"
              style={{
                left: `${area.x * 100}%`,
                top: `${area.y * 100}%`,
                width: `${area.width * 100}%`,
                height: `${area.height * 100}%`,
                pointerEvents: 'auto',
                zIndex: 10,
              }}
              onMouseEnter={() => setIsAreaHovered(true)}
              onMouseLeave={() => setIsAreaHovered(false)}
              onClick={() => handleImageClick(3)}
            />
          ))}
        </div>

        {/* Hover Image */}
        {((isAreaHovered || isHoveringZoomImage) && !selectedImage) && (() => {
          const cfg = getImageZoomConfig(3);
          return (
            <div
              className="fixed z-40 cursor-pointer"
              style={{
                left: `calc(50% + ${cfg.zoomOffset.x}px)`,
                top: `calc(50% + ${cfg.zoomOffset.y}px)`,
                transform: 'translate(-50%, -50%)',
                willChange: 'transform',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                width: cfg.zoomSize.replace('w-[', '').replace(']', ''),
                height: cfg.zoomHeight.replace('h-[', '').replace(']', '')
              }}
              onMouseEnter={() => setIsHoveringZoomImage(true)}
              onMouseLeave={() => setIsHoveringZoomImage(false)}
              onClick={() => handleImageClick(3)}
            >
              <img
                src={hoverImage || "/tv/pictures/tv1/move-1/zoonBit/03.png"}
                alt="Zoomed Easter egg"
                style={{ 
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                  willChange: 'transform, opacity',
                  imageRendering: 'crisp-edges',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  opacity: 1,
                  transition: 'all 0.3s ease-in-out',
                  border: '2px solid #FFFFFF',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                }}
              />
            </div>
          );
        })()}

        {/* ZoomIn Modal */}
        {showZoomInModal && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 p-8 flex items-center justify-center"
            onClick={handleZoomInModalClose}
          >
            {/* Back Button in Modal */}
            <button
              className="absolute top-6 right-6 transition-opacity cursor-pointer"
              style={{ width: '29px', height: '45px', zIndex: 60 }}
              onClick={handleZoomInModalClose}
              onMouseEnter={() => setIsHoveringModalBackButton(true)}
              onMouseLeave={() => setIsHoveringModalBackButton(false)}
            >
              {isHoveringModalBackButton ? (
                <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
              ) : (
                <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
                </svg>
              )}
            </button>

            {/* Modal Content */}
            <div className="relative flex flex-col items-center">
              {/* Main ZoomIn Image */}
              <img
                src={zoomInImage || "/tv/pictures/tv1/move-1/zoomIn/03.png"}
                alt="Zoomed In Scene"
                style={{ 
                  width: '475px',
                  height: '663px',
                  opacity: 1,
                  objectFit: 'cover',
                  imageRendering: 'crisp-edges',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
              />

              {/* Text Content Below Image */}
              <div 
                style={{
                  position: 'absolute',
                  left: '0',
                  bottom: '-105px',
                  textAlign: 'left'
                }}
              >
                {/* Title */}
                <div style={{
                  width: '87px',
                  height: '26px',
                  opacity: 1,
                  fontFamily: 'Work Sans',
                  fontWeight: 900,
                  fontStyle: 'normal',
                  fontSize: '20px',
                  lineHeight: '128%',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                  marginBottom: '0px'
                }}>
                  00:39:55
                </div>

                {/* Description */}
                <div style={{
                  width: '475px',
                  height: '60px',
                  opacity: 0.7,
                  fontFamily: 'Work Sans',
                  fontWeight: 400,
                  fontStyle: 'normal',
                  fontSize: '20px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  Early in the film, as the mother walks through the hallway, a ghostly boy can briefly be seen standing silently facing the wall next to her.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InMove3;