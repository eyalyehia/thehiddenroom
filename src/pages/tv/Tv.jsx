import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import getBase64 from '../../components/common/getBase64';

const Tv = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [showNotebookModal, setShowNotebookModal] = useState(false);
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
        getBase64('/tv/pictures/tv1/01.png'),
        getBase64('/tv/pictures/tv1/02.png'),
        getBase64('/tv/pictures/tv1/03.png'),
        getBase64('/tv/pictures/tv1/04.png')
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

  // Function to navigate back to home
  const handleClose = () => {
    navigate('/');
  };

  // Function to show notebook modal
  const handleNotebookClick = () => {
    setShowNotebookModal(true);
  };

  // Function to navigate to next page
  const handleNextPage = () => {
    navigate('/tv2');
  };

  // Function to handle image click
  const handleImageClick = (imageId) => {
    setSelectedImage(imageId);
    
    if (imageId === 1) {
      // Add fade out effect before navigation
      setTimeout(() => {
        navigate('/tv/move_1/main/move1');
      }, 300);
    } else if (imageId === 2) {
      // Navigate to Move2 page
      setTimeout(() => {
        navigate('/tv/move_2/main/move2');
      }, 300);
    } else if (imageId === 3) {
      // Navigate to Move3 page
      setTimeout(() => {
        navigate('/tv/move_3/main/Move3');
      }, 300);
    } else if (imageId === 4) {
      // Navigate to Move4 page
      setTimeout(() => {
        navigate('/tv/move_4/main/move4');
      }, 300);
    } else {
      // Regular fade effect for other images
      setTimeout(() => {
        setSelectedImage(null);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ backgroundColor: '#1D1C1A' }}>
      {/* Notebook Modal */}
      {showNotebookModal && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-start"
          style={{ backgroundColor: 'rgba(29, 28, 26, 0.9)' }}
          onClick={() => setShowNotebookModal(false)}
        >
          <div 
            className="w-full h-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="fixed top-6 right-6 w-10 h-10 transition-opacity z-50 border-0 focus:outline-none cursor-pointer"
              aria-label="Close"
              onClick={() => setShowNotebookModal(false)}
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

            {/* Content Container */}
            <div className="absolute" style={{ left: '122px' }}>
              {/* Title */}
              <h1 
                style={{
                  position: 'absolute',
                  top: '122px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 700,
                  fontSize: '39px',
                  lineHeight: '128.04%',
                  color: '#FFFFFF',
                  width: '682px',
                  height: '50px'
                }}
              >
                HIDDEN DETAILS IN MOVIE SCENES
              </h1>
              
              {/* Description */}
              <div 
                style={{
                  position: 'absolute',
                  top: '172px',
                  fontFamily: 'Work Sans',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  fontSize: '32px',
                  lineHeight: '100%',
                  letterSpacing: '0%',
                  color: '#FFFFFF',
                  width: '827px',
                  height: '221px'
                }}
              >
                <div style={{ marginBottom: '0' }}>Each movie scene contains a hidden detail.</div>
                <div style={{ marginTop: '0' }}>move your cursor to uncover it.</div>
                <div style={{ marginTop: '0' }}>can you spot them all?</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="relative overflow-hidden w-full h-screen"
        style={{ 
          backgroundColor: '#1D1C1A'
        }}
      >
        {/* Close Button - Top Right */}
        <button
          className="fixed top-6 right-6 transition-opacity z-50 border-0 focus:outline-none cursor-pointer"
          style={{ 
            width: '46px', 
            height: '46px',
            opacity: showNotebookModal ? '0' : '1',
            pointerEvents: showNotebookModal ? 'none' : 'auto'
          }}
          aria-label="Close"
          onClick={handleClose}
          onMouseEnter={() => setIsHoveringCloseButton(true)}
          onMouseLeave={() => setIsHoveringCloseButton(false)}
        >
          <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1471_2347)">
              <path 
                d="M33.8233 2L40 8.205L29.2381 19.0189L40 29.795L33.795 36L22.9811 25.2381L12.205 36L6 29.795L16.7619 19.0189L6 8.205L12.2333 2C12.2333 2 19.5103 9.10694 23.0331 12.5919L33.8233 2Z" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
                fill={isHoveringCloseButton ? "white" : "none"}
              />
            </g>
            <defs>
              <filter id="filter0_d_1471_2347" x="0.585938" y="0.59375" width="44.8281" height="44.8203" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1471_2347"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1471_2347" result="shape"/>
              </filter>
            </defs>
          </svg>
        </button>

        {/* Notebook Button - Bottom Left */}
        <button
          className="fixed bottom-6 left-6 transition-opacity z-50 border-0 focus:outline-none cursor-pointer"
          style={{ width: '57px', height: '46px' }}
          aria-label="Notebook"
          onClick={handleNotebookClick}
          onMouseEnter={() => setIsHoveringNotebookButton(true)}
          onMouseLeave={() => setIsHoveringNotebookButton(false)}
        >
          <svg width="57" height="46" viewBox="0 0 57 46" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_1471_2349)">
              <path 
                d="M28.9609 1.17969V30.1082" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M12.0176 1H45.9043V30.2914H12.0176V1Z" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
                fill={isHoveringNotebookButton ? "rgba(255, 255, 255, 0.1)" : "none"}
              />
              <path 
                d="M15.1719 7.17188H25.8052" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M15.1719 12.8203H25.8052" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M15.1719 18.4688H25.8052" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M15.1719 24.1172H25.8052" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M32.1152 7.17188H42.7486" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M32.1152 12.8203H42.7486" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M32.1152 18.4688H42.7486" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M32.1152 24.1172H42.7486" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
              />
              <path 
                d="M11.4679 7H5V37H52V7H45.1009" 
                stroke="white" 
                strokeWidth="2" 
                strokeMiterlimit="10"
                fill={isHoveringNotebookButton ? "rgba(255, 255, 255, 0.1)" : "none"}
              />
            </g>
            <defs>
              <filter id="filter0_d_1471_2349" x="0" y="0" width="57" height="46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1471_2349"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1471_2349" result="shape"/>
              </filter>
            </defs>
          </svg>
        </button>

        {/* Arrow Button - Right Side */}
        <button
          className="fixed right-6 top-1/2 transform -translate-y-1/2 transition-opacity z-50 cursor-pointer"
          style={{ 
            width: '29px', 
            height: '45px',
            opacity: showNotebookModal ? '0' : '1',
            pointerEvents: showNotebookModal ? 'none' : 'auto'
          }}
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

        {/* Images Container */}
        <div className="flex items-center justify-center w-full h-full ">
          {/* Image 1 */}
          <div 
            className="relative cursor-pointer transition-opacity duration-300"
            onClick={() => handleImageClick(1)}
            style={{
              width: '412px',
              height: '927px',
              opacity: selectedImage === 1 ? 0 : 1,
              transition: 'opacity 300ms ease-out'
            }}
          >
            <img 
              src={images.image1 || "/tv/pictures/tv1/01.png"}
              alt="Movie Scene 1"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 2 */}
          <div 
            className="relative cursor-pointer transition-opacity duration-300"
            onClick={() => handleImageClick(2)}
            style={{
              width: '412px',
              height: '927px',
              opacity: selectedImage === 2 ? 0 : 1,
              transition: 'opacity 300ms ease-out'
            }}
          >
            <img 
              src={images.image2 || "/tv/pictures/tv1/02.png"}
              alt="Movie Scene 2"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 3 */}
          <div 
            className="relative cursor-pointer transition-opacity duration-300"
            onClick={() => handleImageClick(3)}
            style={{
              width: '412px',
              height: '927px',
              opacity: selectedImage === 3 ? 0 : 1,
              transition: 'opacity 300ms ease-out'
            }}
          >
            <img 
              src={images.image3 || "/tv/pictures/tv1/03.png"}
              alt="Movie Scene 3"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image 4 */}
          <div 
            className="relative cursor-pointer transition-opacity duration-300"
            onClick={() => handleImageClick(4)}
            style={{
              width: '412px',
              height: '927px',
              opacity: selectedImage === 4 ? 0 : 1,
              transition: 'opacity 300ms ease-out'
            }}
          >
            <img 
              src={images.image4 || "/tv/pictures/tv1/04.png"}
              alt="Movie Scene 4"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tv; 