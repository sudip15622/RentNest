"use client";

import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";

interface BasicInfoProps {
  listing: {
    title: string;
    location: string;
    roomType: string;
    bedrooms: number;
    bathrooms: number;
    floorArea?: string;
    monthlyRent: number;
    securityDeposit: number;
    availableFrom: string;
    leaseDuration: string;
  };
}

export default function BasicInfo({ listing }: BasicInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getRoomTypeLabel = (roomType: string) => {
    const typeMap: Record<string, string> = {
      single: 'Single Room',
      double: 'Double Room',
      master: 'Master Room',
      studio: 'Studio Apartment',
      shared: 'Shared Room',
    };
    return typeMap[roomType] || roomType;
  };

  const getLeaseDurationLabel = (duration: string) => {
    const durationMap: Record<string, string> = {
      monthly: 'Monthly',
      quarterly: '3 Months',
      biannually: '6 Months',
      yearly: '1 Year',
      flexible: 'Flexible',
    };
    return durationMap[duration] || duration;
  };

  return (
    <div className="space-y-6">
      {/* Title and Location */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-3 leading-tight">{listing.title}</h1>
        <div className="flex items-center text-[var(--foreground-sec)]">
          <FaMapMarkerAlt className="w-4 h-4 mr-2 text-[var(--primary)]" />
          <span className="text-base">{listing.location}</span>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[var(--border)]" />

      {/* Price and Room Type */}
      <div className="flex justify-between items-start flex-col sm:flex-row gap-y-3">
        <div>
          <div className="text-2xl font-extrabold text-[var(--primary)] mb-1">
            {formatPrice(listing.monthlyRent)}
            <span className="text-lg text-[var(--foreground-sec)] font-normal">/month</span>
          </div>
          {listing.securityDeposit > 0 && (
            <div className="text-sm text-[var(--foreground-sec)]">
              Security Deposit: <span className="font-medium text-[var(--foreground)]">{formatPrice(listing.securityDeposit)}</span>
            </div>
          )}
        </div>
        <div className="bg-[var(--primary-light)] text-[var(--primary-dark)] px-4 py-2 rounded-full text-sm font-medium border border-[var(--primary)]/20">
          {getRoomTypeLabel(listing.roomType)}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[var(--border)]" />

      {/* Property Details */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Property Details</h3>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--primary)] mb-1">{listing.bedrooms}</div>
            <div className="text-sm text-[var(--foreground-sec)]">Bedroom{listing.bedrooms > 1 ? 's' : ''}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[var(--primary)] mb-1">{listing.bathrooms}</div>
            <div className="text-sm text-[var(--foreground-sec)]">Bathroom{listing.bathrooms > 1 ? 's' : ''}</div>
          </div>
          {listing.floorArea && (
            <div className="text-center">
              <div className="text-2xl font-bold text-[var(--primary)] mb-1">{listing.floorArea}</div>
              <div className="text-sm text-[var(--foreground-sec)]">Floor Area</div>
            </div>
          )}
        </div>
      </div>

      {/* Divider */}
      <hr className="border-[var(--border)]" />

      {/* Availability Information */}
      <div>
        <h3 className="text-lg font-semibold text-[var(--foreground)] mb-4">Availability</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center mr-4">
              <FaCalendarAlt className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-[var(--foreground-sec)] mb-1">Available From</div>
              <div className="text-base font-semibold text-[var(--foreground)]">{formatDate(listing.availableFrom)}</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center mr-4">
              <FaClock className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-sm font-medium text-[var(--foreground-sec)] mb-1">Lease Duration</div>
              <div className="text-base font-semibold text-[var(--foreground)]">{getLeaseDurationLabel(listing.leaseDuration)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
