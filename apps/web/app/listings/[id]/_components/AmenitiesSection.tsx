"use client";

import { 
  FaWifi, 
  FaCar, 
  FaSnowflake, 
  FaUtensils, 
  FaTv,
  FaShieldAlt, 
  FaCheck,
  FaTimes,
  FaPlus
} from "react-icons/fa";

interface AmenitiesSectionProps {
  amenities: string[];
  extraAmenities?: string;
  utilitiesIncluded: boolean;
  internetIncluded: boolean;
}

export default function AmenitiesSection({ 
  amenities, 
  extraAmenities, 
  utilitiesIncluded, 
  internetIncluded 
}: AmenitiesSectionProps) {
  
  const getAmenityIcon = (amenity: string) => {
    const lowerAmenity = amenity.toLowerCase();
    if (lowerAmenity.includes('wifi') || lowerAmenity.includes('internet')) return FaWifi;
    if (lowerAmenity.includes('parking') || lowerAmenity.includes('car')) return FaCar;
    if (lowerAmenity.includes('ac') || lowerAmenity.includes('air conditioning') || lowerAmenity.includes('cooling')) return FaSnowflake;
    if (lowerAmenity.includes('kitchen') || lowerAmenity.includes('cooking')) return FaUtensils;
    if (lowerAmenity.includes('tv') || lowerAmenity.includes('television')) return FaTv;
    if (lowerAmenity.includes('security') || lowerAmenity.includes('guard')) return FaShieldAlt;
    return FaCheck; // Default icon
  };

  const formatAmenityName = (amenity: string) => {
    return amenity.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="space-y-6">
      {/* Divider */}
      <hr className="border-[var(--border)]" />
      
      {/* Amenities & Features */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Amenities & Features</h2>
        
        {/* Main Amenities Grid */}
        {amenities && amenities.length > 0 && (
          <div className="mb-6">
            <div className="mb-4">
              <div className="inline-block">
                <h3 className="text-base font-medium text-[var(--foreground)] mb-2">Available Amenities</h3>
                <div className="h-px border-t border-[var(--border)] w-full"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {amenities.map((amenity, index) => {
                const IconComponent = getAmenityIcon(amenity);
                return (
                  <div key={index} className="flex items-center">
                    <IconComponent className="w-4 h-4 text-[var(--primary)] mr-3" />
                    <span className="text-[var(--foreground)] text-sm">{formatAmenityName(amenity)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Utilities Section */}
        <div className="mb-6">
          <div className="mb-4">
            <div className="inline-block">
              <h3 className="text-base font-medium text-[var(--foreground)] mb-2">Utilities & Services</h3>
              <div className="h-px border-t border-[var(--border)] w-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              {utilitiesIncluded ? (
                <FaCheck className="w-4 h-4 mr-3 text-green-600" />
              ) : (
                <FaTimes className="w-4 h-4 mr-3 text-red-600" />
              )}
              <span className="text-[var(--foreground)] text-sm">
                Utilities {utilitiesIncluded ? 'Included' : 'Not Included'}
              </span>
            </div>
            
            <div className="flex items-center">
              {internetIncluded ? (
                <FaCheck className="w-4 h-4 mr-3 text-green-600" />
              ) : (
                <FaTimes className="w-4 h-4 mr-3 text-red-600" />
              )}
              <span className="text-[var(--foreground)] text-sm">
                Internet {internetIncluded ? 'Included' : 'Not Included'}
              </span>
            </div>
          </div>
        </div>

        {/* Extra Amenities */}
        {extraAmenities && (
          <div>
            <div className="mb-4">
              <div className="inline-block">
                <h3 className="text-base font-medium text-[var(--foreground)] mb-2 flex items-center">
                  <FaPlus className="w-4 h-4 mr-2 text-[var(--primary)]" />
                  Additional Features
                </h3>
                <div className="h-px border-t border-[var(--border)] w-full"></div>
              </div>
            </div>
            <div className="text-[var(--foreground-sec)] text-sm leading-relaxed whitespace-pre-line">
              {extraAmenities}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
