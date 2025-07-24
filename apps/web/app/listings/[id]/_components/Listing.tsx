"use client";

import { useState } from "react";
import PhotoGallery from "./PhotoGallery";
import BasicInfo from "./BasicInfo";
import PropertyDetails from "./PropertyDetails";
import AmenitiesSection from "./AmenitiesSection";
import OwnerInfo from "./OwnerInfo";
import InquirySection from "./InquirySection";

interface ListingData {
  id: string;
  title: string;
  description: string;
  location: string;
  roomType: string;
  bedrooms: number;
  bathrooms: number;
  floorArea?: string;
  amenities: string[];
  extraAmenities?: string;
  photos: string[];
  mainPhotoIndex: number;
  monthlyRent: number;
  securityDeposit: number;
  availableFrom: string;
  leaseDuration: string;
  utilitiesIncluded: boolean;
  internetIncluded: boolean;
  specialTerms?: string;
  status: string;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  owner: {
    id: string;
    name: string;
    phoneNumber: string;
    isVerified: boolean;
  };
}

interface ListingProps {
  listing: ListingData;
}

export default function Listing({ listing }: ListingProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(listing.mainPhotoIndex || 0);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24 pb-24 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 70% width (2/3 columns) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Photo Gallery Section */}
            <div className="mb-8">
              <PhotoGallery
                photos={listing.photos}
                selectedIndex={selectedPhotoIndex}
                onPhotoSelect={setSelectedPhotoIndex}
                title={listing.title}
              />
            </div>

            {/* Basic Information */}
            <BasicInfo listing={listing} />

            {/* Property Details */}
            <PropertyDetails listing={listing} />

            {/* Amenities */}
            <AmenitiesSection 
              amenities={listing.amenities}
              extraAmenities={listing.extraAmenities}
              utilitiesIncluded={listing.utilitiesIncluded}
              internetIncluded={listing.internetIncluded}
            />

            {/* Owner Information - At the bottom of left side */}
            <OwnerInfo owner={listing.owner} />
          </div>

          {/* Sidebar - 30% width (1/3 column) */}
          <div className="lg:col-span-1">
            {/* Inquiry Section - Sticky */}
            <div className="lg:sticky lg:top-24">
              <InquirySection 
                listingId={listing.id}
                ownerName={listing.owner.name}
                ownerPhone={listing.owner.phoneNumber}
                monthlyRent={listing.monthlyRent}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
