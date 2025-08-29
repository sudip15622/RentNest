"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Listing } from "../../../lib/types";
import { ListingFilterState } from "../_types";
import ListingsHero from "./ListingsHero";
import ListingsGrid from "./ListingsGrid";
import { FeaturedListingsSkeletonGrid } from "../../../components/ui/Skeleton";

const initialFilters: ListingFilterState = {
  searchText: "",
  city: "",
  district: "",
  roomType: undefined,
  minBedrooms: undefined,
  maxBedrooms: undefined,
  minBathrooms: undefined,
  maxBathrooms: undefined,
  minRent: undefined,
  maxRent: undefined,
  amenities: [],
  utilitiesIncluded: undefined,
  internetIncluded: undefined,
  availableFrom: undefined,
  page: 1,
  limit: 12,
  sortBy: "createdAt",
  sortOrder: "desc",
};

export default function ListingsClient() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ListingFilterState>(initialFilters);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Debounced fetch function
  const debouncedFetch = useCallback(
    debounce(async (filterParams: ListingFilterState, page: number = 1) => {
      setLoading(true);
      setError(null);
      
      try {
        const queryParams = new URLSearchParams();
        
        // Add non-empty filters to query params
        if (filterParams.searchText?.trim()) queryParams.append("searchText", filterParams.searchText.trim());
        if (filterParams.city?.trim()) queryParams.append("city", filterParams.city.trim());
        if (filterParams.district?.trim()) queryParams.append("district", filterParams.district.trim());
        if (filterParams.minRent && filterParams.minRent > 0) queryParams.append("minRent", filterParams.minRent.toString());
        if (filterParams.maxRent && filterParams.maxRent > 0) queryParams.append("maxRent", filterParams.maxRent.toString());
        if (filterParams.roomType) queryParams.append("roomType", filterParams.roomType);
        if (filterParams.minBedrooms && filterParams.minBedrooms > 0) queryParams.append("minBedrooms", filterParams.minBedrooms.toString());
        if (filterParams.maxBedrooms && filterParams.maxBedrooms > 0) queryParams.append("maxBedrooms", filterParams.maxBedrooms.toString());
        if (filterParams.minBathrooms && filterParams.minBathrooms > 0) queryParams.append("minBathrooms", filterParams.minBathrooms.toString());
        if (filterParams.maxBathrooms && filterParams.maxBathrooms > 0) queryParams.append("maxBathrooms", filterParams.maxBathrooms.toString());
        if (filterParams.amenities && filterParams.amenities.length > 0) queryParams.append("amenities", filterParams.amenities.join(","));
        if (filterParams.utilitiesIncluded !== undefined) queryParams.append("utilitiesIncluded", filterParams.utilitiesIncluded.toString());
        if (filterParams.internetIncluded !== undefined) queryParams.append("internetIncluded", filterParams.internetIncluded.toString());
        if (filterParams.availableFrom?.trim()) queryParams.append("availableFrom", filterParams.availableFrom.trim());
        if (filterParams.sortBy && filterParams.sortBy !== "createdAt") queryParams.append("sortBy", filterParams.sortBy);
        if (filterParams.sortOrder && filterParams.sortOrder !== "desc") queryParams.append("sortOrder", filterParams.sortOrder);
        
        queryParams.append("page", page.toString());
        queryParams.append("limit", "12");

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL!}/listing/filter?${queryParams.toString()}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch listings");
        }
        
        const data = await response.json();
        setListings(data.listings || []);
        setTotalCount(data.pagination.totalCount || 0);
        setCurrentPage(page);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings. Please try again.");
        setListings([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  // Initial fetch on component mount
  useEffect(() => {
    debouncedFetch(filters, 1);
  }, [debouncedFetch]);

  // Handle filter changes
  const handleFilterChange = (newFilters: Partial<ListingFilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    debouncedFetch(updatedFilters, 1);
  };

  // Handle pagination
  const handlePageChange = (page: number) => {
    debouncedFetch(filters, page);
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters(initialFilters);
    debouncedFetch(initialFilters, 1);
  };

  return (
    <div className="w-full">
      {/* Hero Section with Search & Filters */}
      <ListingsHero
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error ? (
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">{error}</div>
            <button
              onClick={() => debouncedFetch(filters, currentPage)}
              className="bg-[var(--primary)] text-white px-6 py-2 rounded-lg hover:bg-[var(--primary-dark)] transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <FeaturedListingsSkeletonGrid count={6} />
        ) : (
          <ListingsGrid
            listings={listings}
            totalCount={totalCount}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
