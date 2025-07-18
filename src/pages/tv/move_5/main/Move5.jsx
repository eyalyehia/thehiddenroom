import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../../../components/common/getBase64';

const Move5 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImage, setHoveredImage] = useState(null);
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
        getBase64('/tv/pictures/tv2/move-5/regular/01.png'),
        getBase64('/tv/pictures/tv2/move-5/regular/02.png'),
        getBase64('/tv/pictures/tv2/move-5/regular/03.png'),
        getBase64('/tv/pictures/tv2/move-5/regular/04.png')
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
    navigate('/tv2');
  };

  // Function to handle image click
  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
    setTimeout(() => {
      setSelectedImage(null);
      // Navigate to the corresponding page
      switch(imageId) {
        case 1:
          navigate('/tv/move_5/sections/InMove5_1');
          break;
        case 2:
          navigate('/tv/move_5/sections/InMove5_2');
          break;
        case 3:
          navigate('/tv/move_5/sections/InMove5_3');
          break;
        case 4:
          navigate('/tv/move_5/sections/InMove5_4');
          break;
        default:
          break;
      }
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
      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto auto',
        gap: '20px',
        padding: '40px',
        height: '100%',
        alignItems: 'center',
        justifyItems: 'center'
      }}>
        {/* Top Left Image */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredImage(1)}
          onMouseLeave={() => setHoveredImage(null)}
          onClick={() => handleImageClick(1)}
          style={{
            opacity: selectedImage === 1 ? 0 : 1,
            transition: 'opacity 300ms ease-out, transform 0.3s ease-in-out',
            transform: hoveredImage === 1 ? 'scale(1.05)' : 'scale(1)',
            zIndex: hoveredImage === 1 ? 10 : 1,
            width: '100%',
            maxWidth: '766px'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '318px'
            }}
          >
            <img
              src={images.image1 || "/tv/pictures/tv2/move-5/regular/01.png"}
              alt="Scene 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div style={{
            ...timeTextStyle,
            marginTop: '10px'
          }}>
            00:12:26
          </div>
        </div>

        {/* Top Right Image */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredImage(2)}
          onMouseLeave={() => setHoveredImage(null)}
          onClick={() => handleImageClick(2)}
          style={{
            opacity: selectedImage === 2 ? 0 : 1,
            transition: 'opacity 300ms ease-out, transform 0.3s ease-in-out',
            transform: hoveredImage === 2 ? 'scale(1.05)' : 'scale(1)',
            zIndex: hoveredImage === 2 ? 10 : 1,
            width: '100%',
            maxWidth: '765px'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '317px'
            }}
          >
            <img
              src={images.image2 || "/tv/pictures/tv2/move-5/regular/02.png"}
              alt="Scene 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div style={{
            ...timeTextStyle,
            marginTop: '10px'
          }}>
            00:50:00
          </div>
        </div>

        {/* Bottom Left Image */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredImage(3)}
          onMouseLeave={() => setHoveredImage(null)}
          onClick={() => handleImageClick(3)}
          style={{
            opacity: selectedImage === 3 ? 0 : 1,
            transition: 'opacity 300ms ease-out, transform 0.3s ease-in-out',
            transform: hoveredImage === 3 ? 'scale(1.05)' : 'scale(1)',
            zIndex: hoveredImage === 3 ? 10 : 1,
            width: '100%',
            maxWidth: '767px'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '318px'
            }}
          >
            <img
              src={images.image3 || "/tv/pictures/tv2/move-5/regular/03.png"}
              alt="Scene 3"
              className="w-full h-full object-cover"
            />
          </div>
          <div style={{
            ...timeTextStyle,
            marginTop: '10px'
          }}>
            00:18:00
          </div>
        </div>

        {/* Bottom Right Image */}
        <div
          className="relative cursor-pointer"
          onMouseEnter={() => setHoveredImage(4)}
          onMouseLeave={() => setHoveredImage(null)}
          onClick={() => handleImageClick(4)}
          style={{
            opacity: selectedImage === 4 ? 0 : 1,
            transition: 'opacity 300ms ease-out, transform 0.3s ease-in-out',
            transform: hoveredImage === 4 ? 'scale(1.05)' : 'scale(1)',
            zIndex: hoveredImage === 4 ? 10 : 1,
            width: '100%',
            maxWidth: '770px'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '319px'
            }}
          >
            <img
              src={images.image4 || "/tv/pictures/tv2/move-5/regular/04.png"}
              alt="Scene 4"
              className="w-full h-full object-cover"
            />
          </div>
          <div style={{
            ...timeTextStyle,
            marginTop: '10px'
          }}>
            01:15:02
          </div>
        </div>
      </div>
    </div>
  );
};

export default Move5;