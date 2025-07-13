import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../../../components/common/getBase64';

const Move2 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState({
    image1: '',
    image2: '',
    image3: '',
    image4: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadImages = async () => {
      const [img1, img2, img3, img4] = await Promise.all([
        getBase64('/tv/pictures/tv1/move-2/regular/01.png'),
        getBase64('/tv/pictures/tv1/move-2/regular/02.png'),
        getBase64('/tv/pictures/tv1/move-2/regular/03.png'),
        getBase64('/tv/pictures/tv1/move-2/regular/04.png')
      ]);

      setImages({
        image1: img1,
        image2: img2,
        image3: img3,
        image4: img4
      });
    };

    loadImages();
  }, []);

  // Function to navigate back
  const handleBack = () => {
    navigate('/tv');
  };

  // Function to handle image click
  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
    setTimeout(() => {
      if (imageId === 1) {
        navigate('/tv/move_2/sections/inMove2.1');
      } else if (imageId === 2) {
        navigate('/tv/move_2/sections/inMove2.2');
      } else if (imageId === 3) {
        navigate('/tv/move_2/sections/inMove2.3');
      } else if (imageId === 4) {
        navigate('/tv/move_2/sections/inMove2.4');
      }
      setSelectedImage(null);
    }, 300);
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
                height: '318px'
              }}
            >
              <img 
                src={images.image1 || "/tv/pictures/tv1/move-2/regular/01.png"}
                alt="Scene 1"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Timestamp Text */}
            <div 
              style={{
                width: '92px',
                height: '26px',
                position: 'absolute',
                bottom: '-40px',
                left: '0',
                color: 'white',
                fontFamily: 'Work Sans',
                fontWeight: 900,
                fontSize: '20px',
                lineHeight: '128%',
                letterSpacing: '0%',
                opacity: 1
              }}
            >
              00:04:00
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
                width: '767px',
                height: '318px'
              }}
            >
              <img 
                src={images.image2 || "/tv/pictures/tv1/move-2/regular/02.png"}
                alt="Scene 2"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Timestamp Text */}
            <div 
              style={{
                width: '85px',
                height: '26px',
                position: 'absolute',
                bottom: '-40px',
                left: '0',
                color: 'white',
                fontFamily: 'Work Sans',
                fontWeight: 900,
                fontSize: '20px',
                lineHeight: '128%',
                letterSpacing: '0%',
                opacity: 1
              }}
            >
              02:10:26
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
                width: '767px',
                height: '318px'
              }}
            >
              <img 
                src={images.image3 || "/tv/pictures/tv1/move-2/regular/03.png"}
                alt="Scene 3"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Timestamp Text */}
            <div 
              style={{
                width: '85px',
                height: '26px',
                position: 'absolute',
                bottom: '-40px',
                left: '0',
                color: 'white',
                fontFamily: 'Work Sans',
                fontWeight: 900,
                fontSize: '20px',
                lineHeight: '128%',
                letterSpacing: '0%',
                opacity: 1
              }}
            >
              01:26:08
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
                width: '767px',
                height: '318px'
              }}
            >
              <img 
                src={images.image4 || "/tv/pictures/tv1/move-2/regular/04.png"}
                alt="Scene 4"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Timestamp Text */}
            <div 
              style={{
                width: '92px',
                height: '26px',
                position: 'absolute',
                bottom: '-40px',
                left: '0',
                color: 'white',
                fontFamily: 'Work Sans',
                fontWeight: 900,
                fontSize: '20px',
                lineHeight: '128%',
                letterSpacing: '0%',
                opacity: 1
              }}
            >
              00:46:44
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Move2;
