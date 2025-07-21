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
  const [showClickableAreas, setShowClickableAreas] = useState(false);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState("");
  const [hoverImage, setHoverImage] = useState("");
  const [zoomImage, setZoomImage] = useState("");
  const navigate = useNavigate();

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
      setHoveredImage(2);
    } else {
      setHoveredImage(null);
    }
  };

  const handleImageClick = () => {
    if (hoveredImage) {
      setShowModal(true);
    }
  };

  // Debug function to show clickable areas
  const renderClickableAreasDebug = () => {
    if (!showClickableAreas) return null;

    const areas = getTvMove4ClickableAreas(2);

    return areas.map((area, index) => (
      <div
        key={`debug-${index}`}
        style={{
          position: "absolute",
          left: `${area.x * 100}%`,
          top: `${area.y * 100}%`,
          width: `${area.width * 100}%`,
          height: `${area.height * 100}%`,
          border: "2px solid rgba(255, 0, 0, 0.8)",
          backgroundColor: "rgba(255, 0, 0, 0.2)",
          pointerEvents: "none",
          zIndex: 15,
        }}
      />
    ));
  };

  return (
    <div
      className="relative w-full h-screen"
      style={{ backgroundColor: "#1D1C1A" }}
    >
      {/* Debug Button */}
      <button
        className="absolute top-6 left-6 bg-red-500 text-white px-3 py-1 rounded text-sm z-50"
        onClick={() => setShowClickableAreas(!showClickableAreas)}
      >
        {showClickableAreas ? "הסתר אזורים" : "הראה אזורים"}
      </button>

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
        onMouseLeave={() => setHoveredImage(null)}
        onClick={handleImageClick}
      >
        <img
          src={image || "/tv/pictures/tv1/move-4/regular/02.png"}
          alt="Full Screen Scene"
          className="w-full h-full object-cover"
        />
        {renderClickableAreasDebug()}
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
              pointerEvents: "auto",
              zIndex: 10,
            }}
          />
        ))}
      </div>

      {/* Hover Image */}
      {hoveredImage &&
        (() => {
          const cfg = getImageZoomConfig(hoveredImage);
          return (
            <div
              className="absolute z-40 pointer-events-none"
              style={{
                left: `calc(50% + ${cfg.zoomOffset.x}px)`,
                top: `calc(50% + ${cfg.zoomOffset.y}px)`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={hoverImage || "/tv/pictures/tv1/move-4/zoomBit/02.png"}
                alt="Hover Scene"
                className={`${cfg.zoomSize} ${cfg.zoomHeight} object-cover border-2 border-white`}
                style={{
                  transition: "opacity 300ms ease-out",
                  opacity: 1,
                  willChange: "transform",
                  imageRendering: "crisp-edges",
                  backfaceVisibility: "hidden",
                  transform: "translateZ(0)",
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
