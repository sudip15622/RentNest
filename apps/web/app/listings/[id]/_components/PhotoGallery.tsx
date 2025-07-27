"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaExpand } from "react-icons/fa";

interface PhotoGalleryProps {
  photos: string[];
  selectedIndex: number;
  onPhotoSelect: (index: number) => void;
  title: string;
}

export default function PhotoGallery({
  photos,
  selectedIndex,
  onPhotoSelect,
  title,
}: PhotoGalleryProps) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Ensure selectedIndex is valid
  const currentIndex =
    selectedIndex >= 0 && selectedIndex < photos.length ? selectedIndex : 0;

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No photos available</span>
      </div>
    );
  }

  // Touch/Mouse drag handlers (similar to FeaturedListings)
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setTranslateX(0);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const deltaX = clientX - startX;
    setTranslateX(deltaX);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 50; // Minimum drag distance to trigger slide
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0 && currentIndex > 0) {
        onPhotoSelect(currentIndex - 1);
      } else if (translateX < 0 && currentIndex < photos.length - 1) {
        onPhotoSelect(currentIndex + 1);
      }
    }
    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    handleEnd();
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleStart(touch.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (touch) {
      handleMove(touch.clientX);
    }
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // Wheel/Trackpad scroll handler
  const handleWheel = (e: React.WheelEvent) => {
    // Prevent default scrolling behavior
    // e.preventDefault();

    // Ignore if already scrolling to prevent rapid firing
    if (isScrolling) return;

    const { deltaX, deltaY } = e;

    // Detect horizontal scroll (trackpad swipe) or vertical scroll with shift
    const isHorizontalScroll =
      Math.abs(deltaX) > Math.abs(deltaY) || e.shiftKey;

    if (isHorizontalScroll) {
      setIsScrolling(true);

      // Determine scroll direction
      const scrollDirection = deltaX > 0 || (e.shiftKey && deltaY > 0) ? 1 : -1;

      if (scrollDirection > 0 && currentIndex < photos.length - 1) {
        onPhotoSelect(currentIndex + 1);
      } else if (scrollDirection < 0 && currentIndex > 0) {
        onPhotoSelect(currentIndex - 1);
      }

      // Reset scrolling flag after a delay
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const goToPrevious = () => {
    console.log("goToPrevious called, currentIndex:", currentIndex);
    if (currentIndex > 0) {
      onPhotoSelect(currentIndex - 1);
    }
  };

  const goToNext = () => {
    console.log("goToNext called, currentIndex:", currentIndex);
    if (currentIndex < photos.length - 1) {
      onPhotoSelect(currentIndex + 1);
    }
  };

  return (
    <>
      {/* Photo Slider */}
      <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden group">
        {/* Slider Container */}
        <div
          className="overflow-hidden cursor-grab active:cursor-grabbing h-full"
          onMouseDown={handleMouseDown}
          onMouseMove={isDragging ? handleMouseMove : undefined}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
        >
          <div
            ref={sliderRef}
            className="flex h-full transition-transform duration-500 ease-in-out"
            style={{
              width: `${photos.length * 100}%`,
              transform: `translateX(${-currentIndex * (100 / photos.length) + (isDragging ? translateX / (photos.length * 10) : 0)}%)`,
              transitionDuration: isDragging ? "0ms" : "500ms",
            }}
          >
            {photos.map((photo, index) => (
              <div
                key={index}
                className="w-full h-full flex-shrink-0 relative"
                style={{ width: `${100 / photos.length}%` }}
              >
                <Image
                  src={photo}
                  alt={`${title} - Photo ${index + 1}`}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 50vw"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  priority={index === 0}
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Photo Counter */}
        <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Expand Button */}
        <button
          onClick={() => setShowLightbox(true)}
          className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white p-2 rounded-full hover:bg-black/75 transition-all"
        >
          <FaExpand className="w-4 h-4" />
        </button>

        {/* Navigation Buttons - Only show on larger screens and if more than 1 photo */}
        {photos.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/75 transition-all duration-300 hidden md:block ${
                currentIndex === 0
                  ? "opacity-0 cursor-not-allowed group-hover:opacity-30"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex === photos.length - 1}
              className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 backdrop-blur-sm text-white p-3 rounded-full hover:bg-black/75 transition-all duration-300 hidden md:block ${
                currentIndex === photos.length - 1
                  ? "opacity-0 cursor-not-allowed group-hover:opacity-30"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Thumbnail Dots Navigation */}
        {photos.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => onPhotoSelect(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {showLightbox && photos[currentIndex] && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/20 z-[9999] flex items-center justify-center p-4">
          <div
            className="relative max-w-6xl max-h-full cursor-grab active:cursor-grabbing overflow-hidden"
            onMouseDown={handleMouseDown}
            onMouseMove={isDragging ? handleMouseMove : undefined}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${photos.length * 100}%`,
                transform: `translateX(${-currentIndex * (100 / photos.length) + (isDragging ? translateX / (photos.length * 10) : 0)}%)`,
                transitionDuration: isDragging ? "0ms" : "500ms",
              }}
            >
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className="w-full h-full flex-shrink-0 relative"
                  style={{ width: `${100 / photos.length}%` }}
                >
                  <Image
                    src={photo}
                    alt={`${title} - Full size`}
                    width={1200}
                    height={800}
                    priority={index === currentIndex}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                    className="w-full h-full object-contain max-h-[90vh] select-none pointer-events-none"
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowLightbox(false)}
              className="absolute top-4 right-4 text-white bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/75 transition-all"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Navigation Buttons - Only show on larger screens and if more than 1 photo */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={() =>
                    currentIndex > 0 && onPhotoSelect(currentIndex - 1)
                  }
                  disabled={currentIndex === 0}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/75 transition-all hidden md:block ${
                    currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={() =>
                    currentIndex < photos.length - 1 &&
                    onPhotoSelect(currentIndex + 1)
                  }
                  disabled={currentIndex === photos.length - 1}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/60 backdrop-blur-sm rounded-full p-2 hover:bg-black/75 transition-all hidden md:block ${
                    currentIndex === photos.length - 1
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Photo Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
