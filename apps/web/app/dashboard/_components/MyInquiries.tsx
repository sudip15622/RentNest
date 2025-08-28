"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaUser, FaCalendar, FaReply, FaChevronDown } from "react-icons/fa";
import { getInquiriesByUser, updateInquiryStatus as updateInquiryStatusAction } from "../../../lib/actions";

// Custom Status Select Component
const StatusSelect = ({ 
  value, 
  onChange, 
  options 
}: { 
  value: string; 
  onChange: (value: string) => void; 
  options: { value: string; label: string }[] 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find(option => option.value === value);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);
  
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent flex items-center justify-between hover:border-[var(--primary)] transition-colors min-w-[120px]"
      >
        <span className="text-[var(--foreground)] mr-3">
          {selectedOption?.label || "Select Status"}
        </span>
        <FaChevronDown 
          size={12} 
          className={`text-[var(--foreground-sec)] transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg z-50">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-[var(--border)] transition-colors first:rounded-t-lg last:rounded-b-lg ${
                value === option.value ? 'bg-[var(--primary-light)] text-[var(--primary)]' : 'text-[var(--foreground)]'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface MyInquiriesProps {
  userId: string;
  isPreview?: boolean;
}

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  status: "pending" | "responded" | "closed";
  createdAt: string;
  updatedAt: string;
  listing: {
    id: string;
    title: string;
    location: string;
    photos: string[];
    monthlyRent: number;
    roomType: string;
  };
}

export default function MyInquiries({ userId, isPreview = false }: MyInquiriesProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  // Determine how many items to show
  const itemsToShow = isPreview ? 3 : (showMore ? inquiries.length : 5);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        setLoading(true);
        const result = await getInquiriesByUser({
          limit: isPreview ? 3 : 10
        });
        
        if (result && result.inquiries) {
          setInquiries(result.inquiries);
        } else {
          setInquiries([]);
        }
      } catch (error) {
        console.error("Error fetching inquiries:", error);
        setInquiries([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, [userId, isPreview]);

  const updateInquiryStatus = async (inquiryId: string, status: "pending" | "responded" | "closed") => {
    try {
      const result = await updateInquiryStatusAction(inquiryId, status);
      
      if (result.success) {
        setInquiries(inquiries.map(inquiry => 
          inquiry.id === inquiryId 
            ? { ...inquiry, status }
            : inquiry
        ));
      } else {
        console.error("Failed to update inquiry status:", result.message);
        // You could show a toast notification here
      }
    } catch (error) {
      console.error("Error updating inquiry status:", error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="bg-[var(--background)] rounded-xl border border-[var(--border)] p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(isPreview ? 2 : 3)].map((_, index) => (
            <div key={index} className="p-4 border border-[var(--border)] rounded-lg animate-pulse">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                  <div className="w-16 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                <div className="w-full h-12 bg-gray-200 rounded"></div>
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
          Inquiries {!isPreview && `(${inquiries.length})`}
        </h2>
      </div>

      {/* Inquiries */}
      {inquiries.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaEnvelope className="text-gray-400" size={24} />
          </div>
          <h3 className="text-lg font-medium text-[var(--foreground)] mb-2">
            No inquiries yet
          </h3>
          <p className="text-[var(--foreground-sec)]">
            When people are interested in your listings, their inquiries will appear here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries.slice(0, itemsToShow).map((inquiry) => (
            <div
              key={inquiry.id}
              className="p-4 border border-[var(--border)] rounded-lg hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row sm:items-start justify-between mb-3 gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <FaUser className="text-white" size={14} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-[var(--foreground)] truncate">
                      {inquiry.name}
                    </h3>
                    <div className="flex flex-col gap-1 text-xs text-[var(--foreground-sec)]">
                      <div className="flex items-center gap-1">
                        <FaEnvelope size={10} />
                        <span className="truncate">{inquiry.email}</span>
                      </div>
                      {inquiry.phoneNumber && (
                        <div className="flex items-center gap-1">
                          <FaPhone size={10} />
                          <span>{inquiry.phoneNumber}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    inquiry.status === "pending"
                      ? "bg-blue-100 text-blue-800"
                      : inquiry.status === "responded"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}>
                    {inquiry.status.charAt(0).toUpperCase() + inquiry.status.slice(1)}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-[var(--foreground-sec)]">
                    <FaCalendar size={10} />
                    {formatDate(inquiry.createdAt)}
                  </div>
                </div>
              </div>

              {/* Listing Info */}
              <div className="mb-3">
                <Link
                  href={`/listings/${inquiry.listing.id}`}
                  className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] truncate block"
                >
                  Re: {inquiry.listing.title}
                </Link>
              </div>

              {/* Message */}
              <div className="mb-4">
                <p className="text-[var(--foreground)] text-sm leading-relaxed">
                  {inquiry.message}
                </p>
              </div>

              {/* Actions */}
              {!isPreview && (
                <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-[var(--border)]">
                  <a
                    href={`mailto:${inquiry.email}?subject=Re: ${inquiry.listing.title}&body=Hi ${inquiry.name},%0D%0A%0D%0AThank you for your inquiry about "${inquiry.listing.title}".%0D%0A%0D%0A`}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-dark)] transition-colors text-sm font-medium"
                    onClick={() => updateInquiryStatus(inquiry.id, "responded")}
                  >
                    <FaReply size={12} />
                    Reply via Email
                  </a>
                  
                  {inquiry.phoneNumber && (
                    <a
                      href={`tel:${inquiry.phoneNumber}`}
                      className="flex items-center justify-center gap-2 px-4 py-2 border border-[var(--primary)] text-[var(--primary)] rounded-lg hover:bg-[var(--primary-light)] transition-colors text-sm font-medium"
                    >
                      <FaPhone size={12} />
                      Call
                    </a>
                  )}
                  
                  <StatusSelect
                    value={inquiry.status}
                    onChange={(value) => updateInquiryStatus(inquiry.id, value as "pending" | "responded" | "closed")}
                    options={[
                      { value: "pending", label: "Pending" },
                      { value: "responded", label: "Responded" },
                      { value: "closed", label: "Closed" }
                    ]}
                  />
                </div>
              )}
            </div>
          ))}

          {/* Show More Button */}
          {!isPreview && inquiries.length > 5 && (
            <div className="text-center pt-4">
              <button
                onClick={() => setShowMore(!showMore)}
                className="flex items-center justify-center gap-2 mx-auto px-4 py-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm border border-[var(--primary)] hover:bg-[var(--primary-light)] rounded-lg transition-colors"
              >
                {showMore ? "Show Less" : `Show More (${inquiries.length - 5} more)`}
                <FaChevronDown 
                  size={12} 
                  className={`transform transition-transform ${showMore ? 'rotate-180' : ''}`} 
                />
              </button>
            </div>
          )}

          {isPreview && inquiries.length > 0 && (
            <div className="text-center pt-4">
              <Link
                href="/dashboard?tab=inquiries"
                className="text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium text-sm"
              >
                View all inquiries →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
