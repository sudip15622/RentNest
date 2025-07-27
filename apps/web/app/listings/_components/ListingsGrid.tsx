"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaMapMarkerAlt,
  FaHome,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Listing } from "../../../lib/types";

interface ListingsGridProps {
  listings: Listing[];
  totalCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export default function ListingsGrid({
  listings,
  totalCount,
  currentPage,
  onPageChange,
  loading,
}: ListingsGridProps) {
  const itemsPerPage = 12;
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  const generateRatingFromViews = (
    viewCount: number,
    listingId: string
  ): number => {
    if (viewCount === 0) {
      return 0;
    }

    const seed = listingId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const deterministicValue = (seed % 100) / 100;

    let baseRating: number;
    let variance: number;

    if (viewCount >= 1000) {
      baseRating = 4.8;
      variance = 0.2;
    } else if (viewCount >= 500) {
      baseRating = 4.5;
      variance = 0.3;
    } else if (viewCount >= 200) {
      baseRating = 4.2;
      variance = 0.3;
    } else if (viewCount >= 100) {
      baseRating = 3.8;
      variance = 0.4;
    } else if (viewCount >= 50) {
      baseRating = 3.5;
      variance = 0.4;
    } else {
      baseRating = 3.0;
      variance = 0.5;
    }

    const rating = baseRating + deterministicValue * variance;
    return Math.min(Math.round(rating * 10) / 10, 5.0);
  };

  if (listings.length === 0 && !loading) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg mb-4">No listings found</div>
        <p className="text-gray-400">
          Try adjusting your search criteria or filters
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-baseline gap-x-5">
            Search Results
          </h2>
        </div>
      </div>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {listings.map((listing) => (
          <div key={listing.id} className="group h-full">
            <div className="bg-[var(--background)] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-[var(--border)] h-full flex flex-col min-h-[400px]">
              {/* Listing Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={listing.photos[0] || "/demo.jfif"}
                  alt={listing.title}
                  width={400}
                  height={300}
                  priority
                  // fill
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-lg shadow-md">
                  <span className="text-sm font-semibold text-[var(--primary)]">
                    Rs.{listing.monthlyRent}/mo
                  </span>
                </div>
                <div className="absolute top-3 left-3 bg-[var(--primary)] text-white px-2 py-1 rounded-lg text-xs font-medium">
                  {listing.roomType}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4 flex-1 flex flex-col">
                {/* Title */}
                <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300 flex-grow">
                  {listing.title}
                </h3>

                {/* Location */}
                <div className="flex items-center text-[var(--foreground-sec)] mb-3">
                  <FaMapMarkerAlt
                    className="mr-2 text-[var(--primary)]"
                    size={14}
                  />
                  <span className="text-sm font-medium">
                    {listing.location}
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" size={14} />
                    <span className="text-sm font-semibold text-[var(--foreground)]">
                      {generateRatingFromViews(listing.viewCount, listing.id)}
                    </span>
                    <span className="text-sm text-[var(--foreground-sec)] ml-1">
                      ({listing.viewCount} views)
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <div className="flex items-center justify-center mt-auto">
                  <Link
                    href={`/listings/${listing.id}`}
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
      {totalCount > 0 && (
        <p className="text-center text-[var(--foreground-sec)] mt-1">
          Showing {(currentPage - 1) * itemsPerPage + 1} -{" "}
          {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount}
        </p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <FaChevronLeft size={12} />
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                disabled={loading}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 ${
                  pageNum === currentPage
                    ? "bg-[var(--primary)] text-white"
                    : "border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--border)]"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || loading}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--foreground)] hover:bg-[var(--primary-light)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Next
            <FaChevronRight size={12} />
          </button>
        </div>
      )}
    </div>
  );
}
