"use client";
import React from "react";
import {
  FaMapMarkerAlt,
  FaHome,
  FaFilter,
  FaTimes,
} from "react-icons/fa";
import { ListingFilterState, ROOM_TYPES } from "../_types";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";

interface ListingsHeroProps {
  filters: ListingFilterState;
  onFilterChange: (filters: Partial<ListingFilterState>) => void;
  onReset: () => void;
}

export default function ListingsHero({
  filters,
  onFilterChange,
  onReset,
}: ListingsHeroProps) {
  const [showFilters, setShowFilters] = React.useState(false);

  const hasActiveFilters = () => {
    return (
      (filters.searchText?.trim() || "") !== "" ||
      (filters.city || "") !== "" ||
      (filters.district || "") !== "" ||
      (filters.minRent || 0) > 0 ||
      (filters.maxRent || 0) > 0 ||
      filters.roomType !== undefined ||
      (filters.minBedrooms || 0) > 0 ||
      (filters.maxBedrooms || 0) > 0 ||
      (filters.minBathrooms || 0) > 0 ||
      (filters.maxBathrooms || 0) > 0 ||
      (filters.amenities?.length || 0) > 0 ||
      filters.utilitiesIncluded !== undefined ||
      filters.internetIncluded !== undefined ||
      (filters.availableFrom?.trim() || "") !== "" ||
      (filters.sortBy || "createdAt") !== "createdAt" ||
      (filters.sortOrder || "desc") !== "desc"
    );
  };

  return (
    <div className="bg-[var(--background)] mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold mb-4 text-[var(--foreground)]">
            Find Your Perfect Room
          </h1>
        </div>

        {/* Search Bar and Clear Filters */}
        <div className="max-w-3xl mx-auto mb-6 flex items-center gap-3">
          <div className="flex-1">
            <SearchBar
              value={filters.searchText || ""}
              onChange={(searchText: string) => onFilterChange({ searchText })}
              placeholder="Search by title, location, or keywords..."
              //   className="h-10 text-base"
            />
          </div>
          {hasActiveFilters() && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] text-sm font-medium px-3 py-2 rounded-md border border-[var(--primary)] shadow-sm transition-colors duration-200"
            >
              <FaTimes size={12} />
              Clear Filters
            </button>
          )}
        </div>

        {/* Quick Filters & Advanced Toggle */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* City Quick Filters */}
            {["Kathmandu", "Chitwan", "Pokhara"].map((district) => (
              <button
                key={district}
                onClick={() =>
                  onFilterChange({ district: filters.district === district ? "" : district })
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-1 border-[var(--border)] ${
                  filters.district === district
                    ? "bg-[var(--primary)] text-[var(--background)]"
                    : "hover:bg-[var(--primary-light)]"
                }`}
              >
                <FaMapMarkerAlt className="inline mr-2" size={12} />
                {district}
              </button>
            ))}

            {/* Room Type Quick Filters */}
            {ROOM_TYPES.slice(0, 4).map((type) => (
              <button
                key={type.value}
                onClick={() =>
                  onFilterChange({
                    roomType:
                      filters.roomType === type.value ? undefined : type.value,
                  })
                }
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border-1 border-[var(--border)] ${
                  filters.roomType === type.value
                    ? "bg-[var(--primary)] text-[var(--background)]"
                    : "hover:bg-[var(--primary-light)]"
                }`}
              >
                <FaHome className="inline mr-2" size={12} />
                {type.label}
              </button>
            ))}
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border-1 border-[var(--border)] ${
              showFilters || hasActiveFilters()
                ? "bg-[var(--primary)] text-[var(--background)]"
                : "hover:bg-[var(--primary-light)]"
            }`}
          >
            <FaFilter size={12} />
            {showFilters ? "Hide Filters" : "More Filters"}
          </button>
        </div>

        {/* Advanced Filters Panel */}
        {showFilters && (
          <div className="mt-8">
            <FilterPanel
              filters={filters}
              onFilterChange={onFilterChange}
              //   useCustomInputs={true}
            />
          </div>
        )}
      </div>
    </div>
  );
}
