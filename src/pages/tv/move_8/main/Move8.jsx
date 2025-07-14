import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../../../components/common/getBase64';

const Move8 = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
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
        getBase64('/tv/pictures/tv2/move-8/regular/01.png'),
        getBase64('/tv/pictures/tv2/move-8/regular/02.png'),
        getBase64('/tv/pictures/tv2/move-8/regular/03.png'),
        getBase64('/tv/pictures/tv2/move-8/regular/04.png')
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

  const handleImageClick = (imageId) => {
    navigate(`/tv/move_8/sections/InMove8_${imageId}`);
  };

  const handleBackClick = () => {
    navigate('/tv2');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1D1C1A' }}>
      <div className="relative w-full h-full">
        {/* Back Button */}
        <button
          className="absolute top-6 right-6 transition-opacity z-50 cursor-pointer"
          style={{ width: '29px', height: '45px' }}
          onClick={handleBackClick}
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

        {/* Images Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 p-8 h-screen">
          {/* Top Row */}
          <div className="flex gap-8">
            {/* Image 1 */}
            <div className="relative">
              <div 
                className="cursor-pointer transition-opacity duration-300"
                onClick={() => handleImageClick(1)}
                style={{
                  width: '765px',
                  height: '318px',
                  opacity: selectedImage === 1 ? 0 : 1,
                  transition: 'opacity 300ms ease-out'
                }}
              >
                <img 
                  src={images.image1 || "/tv/pictures/tv2/move-8/regular/01.png"}
                  alt="Scene 1"
                  className="w-full h-full object-cover"
                />
              </div>
              <span 
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '0',
                  fontFamily: 'Work Sans',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128%',
                  color: '#FFFFFF',
                  width: '87px',
                  height: '26px'
                }}
              >
                00:14:02
              </span>
            </div>

            {/* Image 2 */}
            <div className="relative">
              <div 
                className="cursor-pointer transition-opacity duration-300"
                onClick={() => handleImageClick(2)}
                style={{
                  width: '765px',
                  height: '319px',
                  opacity: selectedImage === 2 ? 0 : 1,
                  transition: 'opacity 300ms ease-out'
                }}
              >
                <img 
                  src={images.image2 || "/tv/pictures/tv2/move-8/regular/02.png"}
                  alt="Scene 2"
                  className="w-full h-full object-cover"
                />
              </div>
              <span 
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '0',
                  fontFamily: 'Work Sans',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128%',
                  color: '#FFFFFF',
                  width: '81px',
                  height: '26px'
                }}
              >
                01:22:18
              </span>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="flex gap-8">
            {/* Image 3 */}
            <div className="relative">
              <div 
                className="cursor-pointer transition-opacity duration-300"
                onClick={() => handleImageClick(3)}
                style={{
                  width: '768px',
                  height: '319px',
                  opacity: selectedImage === 3 ? 0 : 1,
                  transition: 'opacity 300ms ease-out'
                }}
              >
                <img 
                  src={images.image3 || "/tv/pictures/tv2/move-8/regular/03.png"}
                  alt="Scene 3"
                  className="w-full h-full object-cover"
                />
              </div>
              <span 
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '0',
                  fontFamily: 'Work Sans',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128%',
                  color: '#FFFFFF',
                  width: '88px',
                  height: '26px'
                }}
              >
                01:44:00
              </span>
            </div>

            {/* Image 4 */}
            <div className="relative">
              <div 
                className="cursor-pointer transition-opacity duration-300"
                onClick={() => handleImageClick(4)}
                style={{
                  width: '770px',
                  height: '320px',
                  opacity: selectedImage === 4 ? 0 : 1,
                  transition: 'opacity 300ms ease-out'
                }}
              >
                <img 
                  src={images.image4 || "/tv/pictures/tv2/move-8/regular/04.png"}
                  alt="Scene 4"
                  className="w-full h-full object-cover"
                />
              </div>
              <span 
                style={{
                  position: 'absolute',
                  bottom: '-40px',
                  left: '0',
                  fontFamily: 'Work Sans',
                  fontWeight: 900,
                  fontSize: '20px',
                  lineHeight: '128%',
                  color: '#FFFFFF',
                  width: '84px',
                  height: '26px'
                }}
              >
                01:27:38
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Move8;