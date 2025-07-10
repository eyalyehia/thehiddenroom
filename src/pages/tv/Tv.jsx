import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Tv = () => {
  const [isHoveringCloseButton, setIsHoveringCloseButton] = useState(false);
  const [isHoveringNotebookButton, setIsHoveringNotebookButton] = useState(false);
  const navigate = useNavigate();

  // Function to navigate back to home
  const handleClose = () => {
    navigate('/');
  };

  // Function to navigate to notebook
  const handleNotebookClick = () => {
    navigate('/notebook');
  };

  return (
    <div 
      className="relative overflow-hidden"
      style={{
        position: 'relative',
        width: '1920px',
        height: '1080px',
        background: '#1D1C1A'
      }}
    >
      {/* Close Button - Top Right */}
      <button
        className="fixed top-6 right-6 transition-opacity z-50 border-0 focus:outline-none cursor-pointer"
        style={{ width: '46px', height: '46px' }}
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

      {/* Page Content */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">עמוד סרטי קולנוע</h1>
          <p className="text-lg opacity-75">תוכן הדף יתווסף כאן</p>
        </div>
      </div>
    </div>
  );
};

export default Tv; 