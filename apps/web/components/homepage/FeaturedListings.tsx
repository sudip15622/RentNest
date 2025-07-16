"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaMapMarkerAlt, FaHome, FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const FeaturedListings = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Demo data for featured listings
  const featuredRooms = [
    {
      id: 1,
      title: "Private Room in Lazimpat - Near Public Transport",
      image: "/demo.jfif",
      location: "Lazimpat, Kathmandu",
      price: "Rs 15,000",
      roomType: "Private",
      rating: 4.8,
      reviewCount: 24,
    },
    {
      id: 2,
      title: "Shared Room in Patan - Budget Friendly",
      image: "/demo1.jfif", 
      location: "Patan, Lalitpur",
      price: "Rs 8,500",
      roomType: "Shared",
      rating: 4.6,
      reviewCount: 18,
    },
    {
      id: 3,
      title: "Cozy Private Room in Thamel - Tourist Area",
      image: "/demo2.jfif",
      location: "Thamel, Kathmandu", 
      price: "Rs 18,000",
      roomType: "Private",
      rating: 4.9,
      reviewCount: 32,
    },
    {
      id: 4,
      title: "Spacious Shared Room in Baneshwor - Safe Neighborhood",
      image: "/demo3.jfif",
      location: "Baneshwor, Kathmandu",
      price: "Rs 10,000",
      roomType: "Shared",
      rating: 4.7,
      reviewCount: 15,
    },
    {
      id: 5,
      title: "Modern Private Room in Pulchowk - Student Area",
      image: "/demo4.jfif",
      location: "Pulchowk, Lalitpur",
      price: "Rs 12,000",
      roomType: "Private",
      rating: 4.5,
      reviewCount: 21,
    },
    {
      id: 6,
      title: "Affordable Shared Room in Koteshwor - Well Connected",
      image: "/demo.jfif",
      location: "Koteshwor, Kathmandu", 
      price: "Rs 7,500",
      roomType: "Shared",
      rating: 4.4,
      reviewCount: 12,
    },
    {
      id: 7,
      title: "Luxury Private Room in Bakhundole - Premium Location",
      image: "/demo1.jfif",
      location: "Bakhundole, Lalitpur",
      price: "Rs 25,000",
      roomType: "Private",
      rating: 5.0,
      reviewCount: 41,
    },
  ];

  const itemsPerSlide = 3; // Desktop: 3 cards per slide
  const itemsPerSlideTablet = 2; // Tablet: 2 cards per slide  
  const itemsPerSlideMobile = 1; // Mobile: 1 card per slide
  
  // For now, we'll use desktop calculation for total slides
  // In a real app, you'd want to handle this with useEffect and window resize
  const totalSlides = Math.ceil(featuredRooms.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Touch/Mouse drag handlers
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
      if (translateX > 0 && currentSlide > 0) {
        prevSlide();
      } else if (translateX < 0 && currentSlide < totalSlides - 1) {
        nextSlide();
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
    e.preventDefault();
    
    // Ignore if already scrolling to prevent rapid firing
    if (isScrolling) return;
    
    const { deltaX, deltaY } = e;
    
    // Detect horizontal scroll (trackpad swipe) or vertical scroll with shift
    const isHorizontalScroll = Math.abs(deltaX) > Math.abs(deltaY) || e.shiftKey;
    
    if (isHorizontalScroll) {
      setIsScrolling(true);
      
      // Determine scroll direction
      const scrollDirection = deltaX > 0 || (e.shiftKey && deltaY > 0) ? 1 : -1;
      
      if (scrollDirection > 0 && currentSlide < totalSlides - 1) {
        nextSlide();
      } else if (scrollDirection < 0 && currentSlide > 0) {
        prevSlide();
      }
      
      // Reset scrolling flag after a delay
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  return (
    <section className="w-full py-12 lg:py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-extrabold text-[var(--foreground)]">
            RentNest Featured Listings
          </h2>
          <Link 
            href="/rooms"
            className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-semibold text-lg transition-colors duration-200"
          >
            View All →
          </Link>
        </div>

        {/* Slider Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 -ml-6"
            disabled={currentSlide === 0}
          >
            <FaChevronLeft size={16} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-3 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-all duration-300 -mr-6"
            disabled={currentSlide === totalSlides - 1}
          >
            <FaChevronRight size={16} />
          </button>

          {/* Cards Container */}
          <div 
            className="overflow-hidden cursor-grab active:cursor-grabbing"
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
                transform: `translateX(${-currentSlide * 100 + (isDragging ? translateX / 5 : 0)}%)`,
                transitionDuration: isDragging ? '0ms' : '500ms'
              }}
            >
              {Array.from({ length: totalSlides }, (_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  {/* Desktop: 3 cards */}
                  <div className="hidden lg:grid lg:grid-cols-3 gap-6 px-2">
                    {featuredRooms
                      .slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide)
                      .map((room) => (
                        <div
                          key={room.id}
                          className="group"
                        >
                          <div className="bg-[var(--background)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--border)] h-full flex flex-col">
                            {/* Room Image */}
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={room.image}
                                alt={room.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-md">
                                <span className="text-sm font-semibold text-[var(--primary)]">
                                  {room.price}/mo
                                </span>
                              </div>
                              <div className="absolute top-3 left-3 bg-[var(--primary)] text-white px-2 py-1 rounded-lg text-xs font-medium">
                                {room.roomType}
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-4 flex-1 flex flex-col">
                              {/* Title */}
                              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300 flex-grow">
                                {room.title}
                              </h3>

                              {/* Location */}
                              <div className="flex items-center text-[var(--foreground-sec)] mb-3">
                                <FaMapMarkerAlt className="mr-2 text-[var(--primary)]" size={14} />
                                <span className="text-sm font-medium">{room.location}</span>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                  <FaStar className="text-yellow-400 mr-1" size={14} />
                                  <span className="text-sm font-semibold text-[var(--foreground)]">{room.rating}</span>
                                  <span className="text-sm text-[var(--foreground-sec)] ml-1">({room.reviewCount} reviews)</span>
                                </div>
                              </div>

                              {/* View Details Button */}
                              <div className="flex items-center justify-center mt-auto">
                                <Link
                                  href={`/rooms`}
                                  className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                  <FaHome size={12} />
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  {/* Tablet: 2 cards */}
                  <div className="hidden md:grid lg:hidden md:grid-cols-2 gap-6 px-2">
                    {featuredRooms
                      .slice(slideIndex * itemsPerSlideTablet, (slideIndex + 1) * itemsPerSlideTablet)
                      .map((room) => (
                        <div
                          key={room.id}
                          className="group"
                        >
                          <div className="bg-[var(--background)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--border)] h-full flex flex-col">
                            {/* Room Image */}
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={room.image}
                                alt={room.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-md">
                                <span className="text-sm font-semibold text-[var(--primary)]">
                                  {room.price}/mo
                                </span>
                              </div>
                              <div className="absolute top-3 left-3 bg-[var(--primary)] text-white px-2 py-1 rounded-lg text-xs font-medium">
                                {room.roomType}
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-4 flex-1 flex flex-col">
                              {/* Title */}
                              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300 flex-grow">
                                {room.title}
                              </h3>

                              {/* Location */}
                              <div className="flex items-center text-[var(--foreground-sec)] mb-3">
                                <FaMapMarkerAlt className="mr-2 text-[var(--primary)]" size={14} />
                                <span className="text-sm font-medium">{room.location}</span>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                  <FaStar className="text-yellow-400 mr-1" size={14} />
                                  <span className="text-sm font-semibold text-[var(--foreground)]">{room.rating}</span>
                                  <span className="text-sm text-[var(--foreground-sec)] ml-1">({room.reviewCount} reviews)</span>
                                </div>
                              </div>

                              {/* View Details Button */}
                              <div className="flex items-center justify-center mt-auto">
                                <Link
                                  href={`/rooms/${room.id}`}
                                  className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                  <FaHome size={12} />
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  
                  {/* Mobile: 1 card */}
                  <div className="grid md:hidden grid-cols-1 gap-6 px-2">
                    {featuredRooms
                      .slice(slideIndex * itemsPerSlideMobile, (slideIndex + 1) * itemsPerSlideMobile)
                      .map((room) => (
                        <div
                          key={room.id}
                          className="group"
                        >
                          <div className="bg-[var(--background)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--border)] h-full flex flex-col">
                            {/* Room Image */}
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={room.image}
                                alt={room.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-md">
                                <span className="text-sm font-semibold text-[var(--primary)]">
                                  {room.price}/mo
                                </span>
                              </div>
                              <div className="absolute top-3 left-3 bg-[var(--primary)] text-white px-2 py-1 rounded-lg text-xs font-medium">
                                {room.roomType}
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-4 flex-1 flex flex-col">
                              {/* Title */}
                              <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300 flex-grow">
                                {room.title}
                              </h3>

                              {/* Location */}
                              <div className="flex items-center text-[var(--foreground-sec)] mb-3">
                                <FaMapMarkerAlt className="mr-2 text-[var(--primary)]" size={14} />
                                <span className="text-sm font-medium">{room.location}</span>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center mb-4">
                                <div className="flex items-center">
                                  <FaStar className="text-yellow-400 mr-1" size={14} />
                                  <span className="text-sm font-semibold text-[var(--foreground)]">{room.rating}</span>
                                  <span className="text-sm text-[var(--foreground-sec)] ml-1">({room.reviewCount} reviews)</span>
                                </div>
                              </div>

                              {/* View Details Button */}
                              <div className="flex items-center justify-center mt-auto">
                                <Link
                                  href={`/rooms/${room.id}`}
                                  className="w-full bg-[var(--primary)] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors duration-300 flex items-center justify-center gap-2"
                                >
                                  <FaHome size={12} />
                                  View Details
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-[var(--primary)] scale-110"
                    : "bg-[var(--border)] hover:bg-[var(--primary-light)]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
