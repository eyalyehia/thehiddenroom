import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Move6 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  // Function to navigate back
  const handleBack = () => {
    navigate('/tv2');
  };

  // Function to handle image click
  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  };

  // Common text style
  const timeTextStyle = {
    fontFamily: 'Work Sans',
    fontWeight: 900,
    fontSize: '20px',
    lineHeight: '128%',
    letterSpacing: '0%',
    color: 'white',
    opacity: 1,
    height: '26px',
  };

  return (
    <div className="w-full h-screen" style={{ backgroundColor: '#1D1C1A' }}>
      {/* Back Button - Top Right */}
      <button
        className="absolute top-6 right-6 transition-opacity z-50 cursor-pointer"
        style={{ width: '29px', height: '45px' }}
        aria-label="Back"
        onClick={handleBack}
        onMouseEnter={() => setIsHoveringBackButton(true)}
        onMouseLeave={() => setIsHoveringBackButton(false)}
      >
        {isHoveringBackButton ? (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" fill="white" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        ) : (
          <svg width="33" height="49" viewBox="0 0 33 49" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z" stroke="white" strokeWidth="2" strokeMiterlimit="10"/>
          </svg>
        )}
      </button>

      {/* Images Grid Container */}
      <div className="w-full h-full flex flex-wrap justify-center items-center gap-8 p-16">
        {/* Top Row */}
        <div className="flex gap-8">
          {/* Top Left Image */}
          <div 
            className="relative cursor-pointer transition-opacity duration-300"
            onClick={() => handleImageClick(1)}
            style={{
              opacity: selectedImage === 1 ? 0 : 1,
              transition: 'opacity 300ms ease-out'
            }}
          >
            <div 
              style={{
                width: '767px',
                height: '317px'
              }}
            >
              <img 
                src="/tv/pictures/tv2/move-6/regular/01.png"
                alt="Scene 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{
              ...timeTextStyle,
              width: '83px',
              marginTop: '8px'
            }}>
              01:12:40
            </div>
          </div>

          {/* Top Right Image */}
          <div 
            className="relative cursor-pointer transition-opacity duration-300"
            onClick={() => handleImageClick(2)}
            style={{
              opacity: selectedImage === 2 ? 0 : 1,
              transition: 'opacity 300ms ease-out'
            }}
          >
            <div 
              style={{
                width: '765px',
                height: '317px'
              }}
            >
              <img 
                src="/tv/pictures/tv2/move-6/regular/02.png"
                alt="Scene 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{
              ...timeTextStyle,
              width: '88px',
              marginTop: '8px'
            }}>
              00:05:33
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex gap-8">
          {/* Bottom Left Image */}
          <div 
            className="relative cursor-pointer transition-opacity duration-300"
            onClick={() => handleImageClick(3)}
            style={{
              opacity: selectedImage === 3 ? 0 : 1,
              transition: 'opacity 300ms ease-out'
            }}
          >
            <div 
              style={{
                width: '768px',
                height: '319px'
              }}
            >
              <img 
                src="/tv/pictures/tv2/move-6/regular/03.png"
                alt="Scene 3"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{
              ...timeTextStyle,
              width: '84px',
              marginTop: '8px'
            }}>
              01:47:22
            </div>
          </div>

          {/* Bottom Right Image */}
          <div 
            className="relative cursor-pointer transition-opacity duration-300"
            onClick={() => handleImageClick(4)}
            style={{
              opacity: selectedImage === 4 ? 0 : 1,
              transition: 'opacity 300ms ease-out'
            }}
          >
            <div 
              style={{
                width: '770px',
                height: '320px'
              }}
            >
              <img 
                src="/tv/pictures/tv2/move-6/regular/04.png"
                alt="Scene 4"
                className="w-full h-full object-cover"
              />
            </div>
            <div style={{
              ...timeTextStyle,
              width: '90px',
              marginTop: '8px'
            }}>
              00:09:42
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Move6;