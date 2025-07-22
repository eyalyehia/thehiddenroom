import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  isPointInTvMove4Area,
  getTvMove4ClickableAreas,
} from "../../../../components/constant/clickableAreas";
import getBase64 from "../../../../components/common/getBase64";

const InMove4_2 = () => {
  const [isHoveringBackButton, setIsHoveringBackButton] = useState(false);
  const [isHoveringModalBackButton, setIsHoveringModalBackButton] =
    useState(false);
  // הסרתי את showClickableAreas
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [zoomImage, setZoomImage] = useState("");
  const navigate = useNavigate();
  const [isAreaHovered, setIsAreaHovered] = useState(false);
  const [isHoveringZoomImage, setIsHoveringZoomImage] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      const [mainImg, hoverImg, zoomImg] = await Promise.all([
        getBase64("/tv/pictures/tv1/move-4/regular/02.png"),
        getBase64("/tv/pictures/tv1/move-4/zoomBit/02.png"),
        getBase64("/tv/pictures/tv1/move-4/zoomIn/02.jpg"),
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

  // Hover configurations
  const imageZoomConfigs = useMemo(
    () => ({
      2: {
        zoomSize: "w-[233px]",
        zoomHeight: "h-[361px]",
        zoomOffset: { x: 725, y: -90 },
      },
    }),
    []
  );

  const getImageZoomConfig = (imageId) => {
    return (
      imageZoomConfigs[imageId] || {
        zoomSize: "w-[325px]",
        zoomHeight: "h-[459px]",
        zoomOffset: { x: -40, y: -30 },
      }
    );
  };

  const handleImageMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const inClickableArea = isPointInTvMove4Area(
      2,
      mouseX,
      mouseY,
      rect.width,
      rect.height
    );

    if (inClickableArea) {
      // אין צורך בפעולה
    } else {
      // אין צורך בפעולה
    }
  };

  const handleImageClick = () => {
      setShowModal(true);
  };

  // הסרתי את renderClickableAreasDebug

  return (
    <div
      className="relative w-full h-screen"
      style={{ backgroundColor: "#1D1C1A" }}
    >
      {/* Debug Button */}
      {/* הסרתי את כפתור הצגת האזורים האדומים */}

      {/* Back Button */}
      <button
        className="absolute top-6 right-6 transition-opacity z-50 cursor-pointer"
        style={{ width: "29px", height: "45px" }}
        onClick={handleBack}
        onMouseEnter={() => setIsHoveringBackButton(true)}
        onMouseLeave={() => setIsHoveringBackButton(false)}
      >
        {isHoveringBackButton ? (
          <svg
            width="33"
            height="49"
            viewBox="0 0 33 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z"
              fill="white"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        ) : (
          <svg
            width="33"
            height="49"
            viewBox="0 0 33 49"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z"
              stroke="white"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        )}
      </button>

      {/* Full Screen Image with Mouse Move Detection */}
      <div
        className="relative w-full h-full"
        onMouseMove={handleImageMouseMove}
        onMouseLeave={() => {}}
        onClick={handleImageClick}
      >
        <img
          src={image || "/tv/pictures/tv1/move-4/regular/02.png"}
          alt="Full Screen Scene"
          className="w-full h-full object-cover"
        />
        {/* Add clickable area overlay */}
        {getTvMove4ClickableAreas(2).map((area, index) => (
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
            onClick={() => setShowModal(true)}
          />
        ))}
      </div>

      {/* Hover Image */}
      {((isAreaHovered || isHoveringZoomImage)) && (() => {
        const cfg = getImageZoomConfig(2);
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
            onClick={() => setShowModal(true)}
            >
              <img
                src={hoverImage || "/tv/pictures/tv1/move-4/zoomBit/02.png"}
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
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* Back Button */}
            <button
              className="fixed top-6 right-6 transition-opacity cursor-pointer"
              style={{ width: "29px", height: "45px", zIndex: 60 }}
              onClick={() => setShowModal(false)}
              onMouseEnter={() => setIsHoveringModalBackButton(true)}
              onMouseLeave={() => setIsHoveringModalBackButton(false)}
            >
              {isHoveringModalBackButton ? (
                <svg
                  width="33"
                  height="49"
                  viewBox="0 0 33 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z"
                    fill="white"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </svg>
              ) : (
                <svg
                  width="33"
                  height="49"
                  viewBox="0 0 33 49"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.39546 2L31 24.476L8.39546 47L2 40.646L18.203 24.53L2 8.354L8.39546 2Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeMiterlimit="10"
                  />
                </svg>
              )}
            </button>

            {/* Modal Content */}
            <div className="flex flex-col items-center">
              {/* Image */}
              <img
                src={zoomImage || "/tv/pictures/tv1/move-4/zoomIn/02.jpg"}
                alt="Zoomed Scene"
                style={{
                  width: "443px",
                  height: "663px",
                  opacity: 1,
                }}
                className="object-cover"
              />

              {/* Text Content Below Image */}
              <div
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "-105px",
                  textAlign: "left",
                }}
              >
                {/* Title */}
                <div
                  style={{
                    width: "341px",
                    height: "26px",
                    opacity: 1,
                    fontFamily: "Work Sans",
                    fontWeight: 900,
                    fontStyle: "normal",
                    fontSize: "20px",
                    lineHeight: "128%",
                    letterSpacing: "0%",
                    color: "#FFFFFF",
                    marginBottom: "0px",
                  }}
                >
                  00:12:45
                </div>

                {/* Description */}
                <div
                  style={{
                    width: "654px",
                    height: "60px",
                    opacity: 0.7,
                    fontFamily: "Work Sans",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: "20px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#FFFFFF",
                    // overflow: 'hidden',
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  At the start of the film, a man can be seen <br/> reading Stephen
                  Hawking’s ”A Brief History of Time”, <br /> a reference to the
                  story’s themes of time and destiny.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InMove4_2;
