"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaEdit, FaTrash, FaEye, FaPlus, FaMapMarkerAlt, FaBuilding, FaChevronDown } from "react-icons/fa";
import { getListingsByUser } from "../../../lib/actions";
import { Listing } from "../../../lib/types";

interface MyListingsProps {
  userId: string;
  isPreview?: boolean;
}

export default function MyListings({ userId, isPreview = false }: MyListingsProps) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // Determine how many items to show
  const itemsToShow = isPreview ? 3 : (showMore ? listings.length : 5);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const result = await getListingsByUser({
          limit: isPreview ? 3 : 10
        });
        
        if (result && result.listings) {
          setListings(result.listings);
        } else {
          setListings([]);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [userId, isPreview]);

  const handleDelete = (listingId: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(listing => listing.id !== listingId));
    }
  };

  const toggleStatus = (listingId: string) => {
    setListings(listings.map(listing => 
      listing.id === listingId 
        ? { ...listing, isActive: !listing.isActive }
        : listing
    ));
  };

  if (loading) {
    return (
      <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
          {!isPreview && <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>}
        </div>
        <div className="space-y-4">
          {[...Array(isPreview ? 2 : 3)].map((_, index) => (
            <div key={index} className="flex gap-4 p-4 border border-[var(--border)] rounded-lg animate-pulse">
              <div className="w-20 h-20 bg-gray-200 rounded-lg"></div>
              <div className="flex-1 space-y-2">
                <div className="w-3/4 h-5 bg-gray-200 rounded"></div>
                <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
                <div className="w-1/4 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          My Listings {!isPreview && `(${listings.length})`}
        </h2>
      </div>

      {/* Listings */}
      {listings.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaBuilding className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
            No listings yet
          </h3>
          <p className="text-[var(--foreground-sec)] mb-4">
            Create your first listing to start earning
          </p>
          <Link
            href="/list-room/create"
            className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors"
          >
            Create Listing
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.slice(0, itemsToShow).map((listing) => (
            <div
              key={listing.id}
              className="flex flex-col sm:flex-row gap-4 p-4 border border-[var(--border)] rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Image */}
              <div className="relative w-full sm:w-24 h-48 sm:h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={listing.photos[0] || "/demo.jfif"}
                  alt={listing.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 gap-2">
                  <h3 className="font-medium text-[var(--foreground)] line-clamp-2 sm:line-clamp-1">
                    {listing.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      listing.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}>
                      {listing.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center lg:flex-col lg:items-start lg:gap-2 gap-2 sm:gap-4 text-sm text-[var(--foreground-sec)] mb-3">
                  <div className="flex items-center gap-1">
                    <FaMapMarkerAlt size={12} />
                    <span className="truncate">{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaEye size={12} />
                    {listing.viewCount} views
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="font-semibold text-[var(--primary)] text-lg">
                    Rs.{listing.monthlyRent.toLocaleString()}/mo
                  </div>
                  
                  {!isPreview && (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link
                        href={`/listings/${listing.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View"
                      >
                        <FaEye size={14} />
                      </Link>
                      <Link
                        href={`/list-room/edit/${listing.id}`}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <FaEdit size={14} />
                      </Link>
                      <button
                        onClick={() => toggleStatus(listing.id)}
                        className={`p-2 rounded-lg transition-colors text-xs sm:text-sm ${
                          listing.isActive
                            ? "text-orange-600 hover:bg-orange-50"
                            : "text-green-600 hover:bg-green-50"
                        }`}
                        title={listing.isActive ? "Deactivate" : "Activate"}
                      >
                        {listing.isActive ? "Pause" : "Activate"}
                      </button>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Show More Button */}
          {!isPreview && listings.length > 5 && (
            <div className="text-center pt-4">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center justify-center gap-2 mx-auto px-4 py-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm border border-[var(--primary)] hover:bg-[var(--primary-light)] rounded-lg transition-colors"
              >
                {showMore ? "Show Less" : `Show More (${listings.length - 5} more)`}
                <FaChevronDown 
                  size={12} 
                  className={`transform transition-transform ${showMore ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          )}

          {isPreview && listings.length > 0 && (
            <div className="text-center pt-4">
              <Link
                href="/dashboard?tab=listings"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
              >
                View all listings →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
