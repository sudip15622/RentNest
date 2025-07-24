"use client";

import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface PropertyDetailsProps {
  listing: {
    description: string;
    specialTerms?: string;
  };
}

export default function PropertyDetails({ listing }: PropertyDetailsProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  
  // Truncate description to approximately 200 characters
  const truncateLength = 200;
  const shouldTruncate = listing.description.length > truncateLength;
  const displayDescription = shouldTruncate && !showFullDescription 
    ? listing.description.slice(0, truncateLength) + "..."
    : listing.description;

  return (
    <div className="space-y-6">
      {/* Divider */}
      <hr className="border-[var(--border)]" />
      
      {/* Property Description */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-4">Property Description</h2>
        <div className="prose max-w-none">
          <div className="text-[var(--foreground-sec)] leading-relaxed whitespace-pre-line">
            {displayDescription}
          </div>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-2 text-[var(--primary)] hover:text-[var(--primary-dark)] underline text-sm font-medium transition-colors"
            >
              {showFullDescription ? "Read less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      {/* Special Terms */}
      {listing.specialTerms && (
        <div>
          <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4 flex items-center">
            <FaExclamationTriangle className="w-5 h-5 mr-2 text-amber-600" />
            Special Terms & Conditions
          </h3>
          <div className="text-[var(--foreground-sec)] leading-relaxed whitespace-pre-line">
            {listing.specialTerms}
          </div>
        </div>
      )}
    </div>
  );
}
