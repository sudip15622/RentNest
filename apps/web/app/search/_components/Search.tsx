"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputWithoutLabel from "../../../components/ui/InputWithoutLabel";
import SelectWithoutLabel from "../../../components/ui/SelectWithoutLabel";
import Button from "../../../components/ui/Button";

import {
  FaSearch,
  FaPlus,
  FaMapMarkerAlt,
  FaDollarSign,
  FaHome,
} from "react-icons/fa";

interface SearchFormType {
  searchText: string;
  city: string;
  minPrice: string;
  maxPrice: string;
  roomType: string;
}

const Search = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormType>({
    defaultValues: {
      searchText: "",
      city: "",
      minPrice: "",
      maxPrice: "",
      roomType: "",
    },
    mode: "onChange",
  });

  const cities = [
    "Kathmandu",
    "Pokhara",
    "Lalitpur",
    "Bhaktapur",
    "Chitwan",
    "Butwal",
    "Biratnagar",
    "Dharan",
    "Itahari",
    "Nepalgunj",
  ];

  const roomTypes = [
    "Private Room",
    "Shared Room",
    "Studio Apartment",
    "1 Bedroom",
    "2+ Bedrooms",
  ];

  const onSubmit = (data: SearchFormType) => {
    // Handle search logic here
    console.log("Search filters:", data);
  };

  return (
    <main className="page-content">
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] text-center mb-5">
          Find Your Perfect Room
        </h2>
        <p className="text-center text-lg text-[var(--foreground-sec)] mb-10 max-w-2xl mx-auto">
          Search through thousands of verified listings to discover your ideal
          living space
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-8 rounded-xl shadow-xl border-1 border-[var(--border)] bg-white/50 backdrop-blur-sm"
        >
          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
            {/* Search Text */}
            <div className="relative">
              <label className="flex items-center text-sm font-medium text-[var(--foreground-sec)] mb-2">
                <FaSearch className="mr-2 text-[var(--primary)]" />
                Search
              </label>
              <Controller
                name="searchText"
                control={control}
                render={({ field, fieldState }) => (
                  <InputWithoutLabel
                    field={field}
                    error={fieldState.error}
                    placeholder="Room title, keywords..."
                    type="text"
                  />
                )}
              />
            </div>

            {/* City/Area Dropdown */}
            <div className="relative">
              <label className="flex items-center text-sm font-medium text-[var(--foreground-sec)] mb-2">
                <FaMapMarkerAlt className="mr-2 text-[var(--primary)]" />
                Location
              </label>
              <Controller
                name="city"
                control={control}
                render={({ field, fieldState }) => (
                  <SelectWithoutLabel
                    field={field}
                    error={fieldState.error}
                    options={cities}
                    placeholder="Select City/Area"
                  />
                )}
              />
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="flex items-center text-sm font-medium text-[var(--foreground-sec)] mb-2">
                  <FaDollarSign className="mr-2 text-[var(--primary)]" />
                  Min Price
                </label>
                <Controller
                  name="minPrice"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputWithoutLabel
                      field={field}
                      error={fieldState.error}
                      placeholder="Min"
                      type="number"
                    />
                  )}
                />
              </div>
              <div>
                <label className="flex items-center text-sm font-medium text-[var(--foreground-sec)] mb-2">
                  <FaPlus className="mr-2 text-[var(--primary)]" />
                  Max Price
                </label>
                <Controller
                  name="maxPrice"
                  control={control}
                  render={({ field, fieldState }) => (
                    <InputWithoutLabel
                      field={field}
                      error={fieldState.error}
                      placeholder="Max"
                      type="number"
                    />
                  )}
                />
              </div>
            </div>

            {/* Room Type Dropdown */}
            <div>
              <label className="flex items-center text-sm font-medium text-[var(--foreground-sec)] mb-2">
                <FaHome className="mr-2 text-[var(--primary)]" />
                Room Type
              </label>
              <Controller
                name="roomType"
                control={control}
                render={({ field, fieldState }) => (
                  <SelectWithoutLabel
                    field={field}
                    error={fieldState.error}
                    options={roomTypes}
                    placeholder="Select Room Type"
                  />
                )}
              />
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <Button
                icon={<FaSearch />}
                isSubmitting={isSubmitting}
                type="submit"
              />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t-1 border-[var(--border)]">
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">
                1,200+
              </div>
              <div className="text-sm text-[var(--foreground-sec)]">
                Active Listings
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">850+</div>
              <div className="text-sm text-[var(--foreground-sec)]">
                Verified Landlords
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">95%</div>
              <div className="text-sm text-[var(--foreground-sec)]">
                Success Rate
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)]">24/7</div>
              <div className="text-sm text-[var(--foreground-sec)]">
                Support
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Search;
