import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Computer = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const [isHoveringArrowButton, setIsHoveringArrowButton] = useState(false);
  const [isHoveringFirstImage, setIsHoveringFirstImage] = useState(false);
  const [isHoveringSecondImage, setIsHoveringSecondImage] = useState(false);
  const [isHoveringThirdImage, setIsHoveringThirdImage] = useState(false);
  const [isHoveringFourthImage, setIsHoveringFourthImage] = useState(false);
  
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/');
  };

  const handleNotebookClick = () => {
    navigate('/notebook');
  };

  const handleNextPage = () => {
    navigate('/computer2');
  };

  const handleGame1Click = () => {
    navigate('/game1');
  };

  const handleGame2Click = () => {
    navigate('/game2');
  };

  const handleGame3Click = () => {
    navigate('/game3');
  };

  const handleGame4Click = () => {
    navigate('/game4');
  };

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

        {/* Game Images Grid */}
        <div 
          style={{
            position: 'absolute',
            width: '1920px',
            height: '1080px',
            left: '0px',
            top: '0px'
          }}
        >
          {/* Top Left Image */}
          <div 
            style={{
              position: 'absolute',
              width: '806px',
              height: '453px',
              left: '154px',
              top: '87px',
              cursor: 'pointer',
              overflow: 'hidden',
              transform: isHoveringFirstImage ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              zIndex: isHoveringFirstImage ? 10 : 1
            }}
            onMouseEnter={() => setIsHoveringFirstImage(true)}
            onMouseLeave={() => setIsHoveringFirstImage(false)}
            onClick={handleGame1Click}
          >
            <img 
              src="/computer/pictures/page1/main/1.png" 
              alt="Game 1"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Top Right Image */}
          <div 
            style={{
              position: 'absolute',
              height: '453px',
              left: '50%',
              right: '8.02%',
              top: '87px',
              cursor: 'pointer',
              overflow: 'hidden',
              transform: isHoveringSecondImage ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              zIndex: isHoveringSecondImage ? 10 : 1
            }}
            onMouseEnter={() => setIsHoveringSecondImage(true)}
            onMouseLeave={() => setIsHoveringSecondImage(false)}
            onClick={handleGame2Click}
          >
            <img 
              src="/computer/pictures/page1/main/2.png" 
              alt="Game 2"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Bottom Left Image */}
          <div 
            style={{
              position: 'absolute',
              width: '805px',
              height: '453px',
              left: '155px',
              top: '540px',
              cursor: 'pointer',
              overflow: 'hidden',
              transform: isHoveringThirdImage ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              zIndex: isHoveringThirdImage ? 10 : 1
            }}
            onMouseEnter={() => setIsHoveringThirdImage(true)}
            onMouseLeave={() => setIsHoveringThirdImage(false)}
            onClick={handleGame3Click}
          >
            <img 
              src="/computer/pictures/page1/main/3.png" 
              alt="Game 3"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>

          {/* Bottom Right Image */}
          <div 
            style={{
              position: 'absolute',
              width: '806px',
              height: '453px',
              left: '960px',
              top: '540px',
              cursor: 'pointer',
              overflow: 'hidden',
              transform: isHoveringFourthImage ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.3s ease',
              zIndex: isHoveringFourthImage ? 10 : 1
            }}
            onMouseEnter={() => setIsHoveringFourthImage(true)}
            onMouseLeave={() => setIsHoveringFourthImage(false)}
            onClick={handleGame4Click}
          >
            <img 
              src="/computer/pictures/page1/main/4.png" 
              alt="Game 4"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Computer; 