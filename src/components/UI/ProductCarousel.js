import { SlClose } from "react-icons/sl";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";

const ProductCarousel = ({
  images,
  initialIndex = 0,
  onClose,
  isZoomed = false,
  onImagechange = () => {},
  className,
  onClick,
}) => {
  // Filter only valid images that have proper original URLs and deduplicate them
  console.log("images", images);
  const validImages = useMemo(() => {
    if (!images || !images.length) return [];

    // First filter out invalid images
    const filtered = images.filter(
      (image) => image && image.original && image.original.trim() !== "",
    );

    // Then deduplicate by original URL - this is the key part for handling
    // cases where we have multiple "views" of the same image
    const uniqueUrls = new Set();
    return filtered.filter((image) => {
      if (uniqueUrls.has(image.original)) {
        return false; // Skip duplicate URLs
      }
      uniqueUrls.add(image.original);
      return true;
    });
  }, [images]);

  // Only set active index if it's within the range of valid images
  const [activeIndex, setActiveIndex] = useState(
    initialIndex < validImages.length ? initialIndex : 0,
  );

  // State to track which thumbnails actually loaded successfully
  const [loadedThumbnails, setLoadedThumbnails] = useState([]);

  // State to track which original images loaded successfully
  const [loadedOriginals, setLoadedOriginals] = useState([]);

  // Reset loaded states when images change
  useEffect(() => {
    setLoadedThumbnails([]);
    setLoadedOriginals([]);
  }, [images]);
  useEffect(() => {
    if (initialIndex < validImages.length) {
      setActiveIndex(initialIndex);
    }
  }, [initialIndex, validImages.length]);
  // If there are no valid images, don't render anything
  if (validImages.length === 0) {
    return null;
  }

  // Check if we have multiple DISTINCT images by checking unique original URLs
  // This ensures that cases like "View 1", "View 2" of the same image aren't counted as separate
  const uniqueOriginalUrls = new Set(validImages.map((img) => img.original));
  const hasMultipleImages = uniqueOriginalUrls.size > 1;

  const goToPrevious = () => {
    if (!hasMultipleImages) return;
    const newIndex =
      activeIndex === 0 ? validImages.length - 1 : activeIndex - 1;
    setActiveIndex(newIndex);
    onImagechange(newIndex);
  };

  const goToNext = () => {
    if (!hasMultipleImages) return;
    const newIndex =
      activeIndex === validImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(newIndex);
    onImagechange(newIndex);
  };

  const handleThumbnailClick = (index) => {
    if (!hasMultipleImages) return;
    setActiveIndex(index);
    onImagechange(index);
  };

  const handleThumbnailLoad = (index) => {
    setLoadedThumbnails((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  };

  const handleOriginalLoad = (index) => {
    setLoadedOriginals((prev) => {
      if (prev.includes(index)) return prev;
      return [...prev, index];
    });
  };

  const handleThumbnailError = (index) => {
    // Remove from loaded thumbnails if it errors
    setLoadedThumbnails((prev) => prev.filter((i) => i !== index));
  };

  const handleOriginalError = (index) => {
    // Remove from loaded originals if it errors
    setLoadedOriginals((prev) => prev.filter((i) => i !== index));
  };

  const renderThumbnails = () => {
    // Only render thumbnails if there are multiple distinct valid images
    if (!hasMultipleImages) {
      return null;
    }

    return (
      <div
        className={`flex gap-2 mt-4 justify-start overflow-x-auto pb-2 scroll-smooth
      ${isZoomed ? "w-full" : "md:-translate-x-14"}`}
      >
        {validImages.map((image, index) => {
          const thumbnailSrc =
            image.thumbnail && image.thumbnail.trim() !== ""
              ? image.thumbnail
              : image.original;

          return (
            <div
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 cursor-pointer transition-all duration-200
            ${isZoomed ? "w-24 h-24" : "w-16 h-16"}
            ${
              activeIndex === index
                ? isZoomed
                  ? "border-2 border-white scale-110"
                  : "border-2 border-blue-500 rounded-lg"
                : isZoomed
                  ? "border border-gray-500 opacity-70 hover:opacity-100"
                  : "border border-gray-200"
            }`}
            >
              <img
                src={thumbnailSrc}
                alt={image.alt || `Thumbnail ${index + 1}`}
                className={`w-full h-full object-cover ${
                  isZoomed ? "rounded-lg" : "rounded-md"
                }`}
                onLoad={() => handleThumbnailLoad(index)}
                onError={() => handleThumbnailError(index)}
              />
            </div>
          );
        })}
      </div>
    );
  };

  // Hidden image preloader for both thumbnails and originals
  const imagePreloader = (
    <div className="hidden">
      {validImages.map((image, index) => (
        <div key={`preloader-${index}`}>
          {/* Preload original image */}
          <img
            src={image.original}
            alt=""
            onLoad={() => handleOriginalLoad(index)}
            onError={() => handleOriginalError(index)}
          />

          {/* Preload thumbnail if available */}
          {image.thumbnail && image.thumbnail.trim() !== "" && (
            <img
              src={image.thumbnail}
              alt=""
              onLoad={() => handleThumbnailLoad(index)}
              onError={() => handleThumbnailError(index)}
            />
          )}
        </div>
      ))}
    </div>
  );

  if (!isZoomed) {
    return (
      <div className="flex flex-col">
        {imagePreloader}
        <div className="relative">
          <img
            src={validImages[activeIndex].original}
            alt={validImages[activeIndex].alt || "Product image"}
            className={`rounded-lg shadow-lg object-contain ${className || ""}`}
            onClick={onClick}
          />

          {/* Only show navigation buttons if there are multiple DISTINCT images */}
          {hasMultipleImages && (
            <>
              {/* Previous Button */}
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
              >
                <FaChevronLeft className="text-gray-800" />
              </button>

              {/* Next Button */}
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
              >
                <FaChevronRight className="text-gray-800" />
              </button>
            </>
          )}
        </div>
        {/* Only render thumbnails if there are multiple DISTINCT images */}
        {renderThumbnails()}
      </div>
    );
  }

  // Zoomed fullscreen carousel
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        {imagePreloader}
        {/* Close Icon */}
        <SlClose
          size={25}
          className="absolute top-5 right-5 text-white cursor-pointer z-10"
          onClick={onClose}
        />

        {/* Main Image Carousel */}
        <div className="relative flex flex-col items-center">
          {/* Main large image */}
          <div className="relative w-full flex justify-center items-center">
            {hasMultipleImages && (
              <FaChevronLeft
                className="absolute left-0 text-white text-3xl cursor-pointer hover:text-gray-300 z-10"
                onClick={goToPrevious}
              />
            )}

            <img
              src={validImages[activeIndex].original}
              alt={validImages[activeIndex].alt || "Product image"}
              className="mx-auto max-w-full max-h-[70vh] object-contain"
            />

            {hasMultipleImages && (
              <FaChevronRight
                className="absolute right-0 text-white text-3xl cursor-pointer hover:text-gray-300 z-10"
                onClick={goToNext}
              />
            )}
          </div>

          {/* Image count indicator */}
          {hasMultipleImages && (
            <div className="text-white mt-2">
              {activeIndex + 1} / {validImages.length}
            </div>
          )}

          {/* Thumbnails carousel */}
          {renderThumbnails()}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
