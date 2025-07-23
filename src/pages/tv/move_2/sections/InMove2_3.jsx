import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { isPointInTvMove2Area, getTvMove2ClickableAreas } from '../../../../components/constant/clickableAreas';
import getBase64 from '../../../../components/common/getBase64';

const InMove2_3 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  // הסרתי את showClickableAreas
  const [image, setImage] = useState('');
  const [hoverImage, setHoverImage] = useState('');
  const [zoomImage, setZoomImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isHoveringModalBackButton, setIsHoveringModalBackButton] = useState(false);
  const [isAreaHovered, setIsAreaHovered] = useState(false);
  const [isHoveringZoomImage, setIsHoveringZoomImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      const [mainImg, hoverImg, zoomImg] = await Promise.all([
        getBase64('/tv/pictures/tv1/move-2/regular/03.png'),
        getBase64('/tv/pictures/tv1/move-2/zoomBit/03.png'),
        getBase64('/tv/pictures/tv1/move-2/zoomIn/03.png')
      ]);
      setImage(mainImg);
      setHoverImage(hoverImg);
      setZoomImage(zoomImg);
    };
    loadImages();
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleImageClick = () => {
    setShowModal(true);
  };

  // Hover configurations
  const imageZoomConfigs = useMemo(() => ({
    3: { zoomSize: 'w-[243px]', zoomHeight: 'h-[142px]', zoomOffset: { x: -20, y: -120 } }
  }), []);

  const getImageZoomConfig = (imageId) => {
    return imageZoomConfigs[imageId] || { 
      zoomSize: 'w-[358px]', 
      zoomHeight: 'h-[241px]', 
      zoomOffset: { x: -40, y: -30 } 
    };
  };

  const handleImageMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    const inClickableArea = isPointInTvMove2Area(3, mouseX, mouseY, rect.width, rect.height);
    
    if (inClickableArea) {
      // setHoveredImage(3); // This line was removed as per the edit hint
    } else {
      // setHoveredImage(null); // This line was removed as per the edit hint
    }
  };

  // Debug function to show clickable areas
  // הסרתי את renderClickableAreasDebug

  return (
    <div className="relative w-full h-screen" style={{ backgroundColor: '#1D1C1A' }}>
      {/* Debug Button */}
      {/* הסרתי את כפתור הצגת האזורים האדומים */}

      {/* Back Button */}
      <button
        className="absolute top-6 right-6 transition-opacity z-50 cursor-pointer border-0 outline-none focus:outline-none"
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

      {/* Full Screen Image with Mouse Move Detection */}
      <div 
        className="relative w-full h-full"
        onMouseMove={handleImageMouseMove}
        onMouseLeave={() => {}}
      >
        <img 
          src={image || "/tv/pictures/tv1/move-2/regular/03.png"}
          alt="Full Screen Scene"
          className="w-full h-full object-cover"
        />
        {/* Add clickable area overlay */}
        {getTvMove2ClickableAreas(3).map((area, index) => (
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
            onClick={handleImageClick}
          />
        ))}
      </div>

      {/* Hover Image */}
      {((isAreaHovered || isHoveringZoomImage)) && (() => {
        const cfg = getImageZoomConfig(3);
        return (
          <div
            className="absolute z-40 cursor-pointer"
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
            onClick={handleImageClick}
          >
            <img
              src={hoverImage || "/tv/pictures/tv1/move-2/zoomBit/03.png"}
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

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div className="relative" onClick={e => e.stopPropagation()}>
            {/* Back Button */}
            <button
              className="fixed top-6 right-6 transition-opacity cursor-pointer"
              style={{ width: '29px', height: '45px', zIndex: 60 }}
              onClick={() => setShowModal(false)}
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

            {/* Main Image */}
            <img
              src={zoomImage || "/tv/pictures/tv1/move-2/zoomIn/03.png"}
              alt="Zoomed Scene"
              className="w-[931px] h-[663px] object-cover"
            />

            {/* Text Content */}
            <div className="mt-4 text-white" style={{position: 'absolute', left: 0, bottom: '-105px', textAlign: 'left'}}>
              <h2 
                className="text-left"
                style={{
                  width: '341px',
                  height: '26px',
                  fontFamily: 'Work Sans',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128%',
                }}
              >
                01:26:08
              </h2>
              <p 
                className="mt-2 text-left"
                style={{
                  width: '909px',
                  height: '60px',
                  fontFamily: 'Work Sans',
                  fontWeight: 400,
                  fontSize: '20px',
                  lineHeight: '100%',
                }}
              >
                The logo on the napkin, "Hotel Valfierno," is a reference to the man behind the 1911 Mona Lisa heist. Like in the film, his scheme wasn't about stealing the real thing, but making others believe they had it.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InMove2_3;
