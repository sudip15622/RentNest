import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
}

const Skeleton = ({ className = "", width, height }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-lg ${className}`}
      style={{
        width: width || "100%",
        height: height || "1rem",
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
};

// Skeleton for Featured Listings Card
export const FeaturedListingSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-[var(--border)] h-full flex flex-col min-h-[400px] overflow-hidden">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gray-200 animate-pulse">
        <div className="absolute top-3 right-3 bg-gray-300 px-3 py-2 rounded-lg w-20 h-6 animate-pulse"></div>
        <div className="absolute top-3 left-3 bg-gray-300 px-3 py-2 rounded-lg w-16 h-6 animate-pulse"></div>
      </div>

      {/* Content Skeleton */}
      <div className="p-4 flex-1 flex flex-col space-y-3">
        {/* Title Skeleton */}
        <div className="space-y-2">
          <Skeleton height="1rem" className="w-full" />
          <Skeleton height="1rem" className="w-3/4" />
        </div>

        {/* Location Skeleton */}
        <div className="flex items-center space-x-2">
          <Skeleton height="0.875rem" className="w-4" />
          <Skeleton height="0.875rem" className="w-32" />
        </div>

        {/* Rating Skeleton */}
        <div className="flex items-center space-x-2">
          <Skeleton height="0.875rem" className="w-4" />
          <Skeleton height="0.875rem" className="w-8" />
          <Skeleton height="0.875rem" className="w-20" />
        </div>

        {/* Button Skeleton */}
        <div className="mt-auto pt-4">
          <Skeleton height="2.5rem" className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

// Multiple skeleton cards for the slider
export const FeaturedListingsSkeletonGrid = ({ count = 6 }: { count?: number }) => {
  return (
    <section className="w-full py-12 lg:py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header Skeleton */}
        <div className="flex items-center justify-between mb-6">
          <Skeleton height="2rem" className="w-64" />
          <Skeleton height="1.5rem" className="w-24" />
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: count }, (_, index) => (
            <FeaturedListingSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skeleton;

// Add the shimmer animation to your global CSS
/*
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
*/
