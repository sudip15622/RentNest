"use client";

import { FaPhone, FaLock, FaCheckCircle } from "react-icons/fa";

interface OwnerInfoProps {
  owner: {
    id: string;
    name: string;
    phoneNumber: string;
    isVerified: boolean;
  };
}

export default function OwnerInfo({ owner }: OwnerInfoProps) {
  return (
    <div className="space-y-6">
      {/* Divider */}
      <hr className="border-[var(--border)]" />
      
      {/* Property Owner */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--foreground)] mb-6">Property Owner</h2>
        
        <div className="flex items-start space-x-4 mb-6">
          {/* Enhanced Avatar */}
          <div className="flex-shrink-0 relative">
            <div className="w-16 h-16 bg-gradient-to-br from-[var(--primary)] to-[var(--primary-dark)] rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg ring-2 ring-[var(--primary-light)]">
              {owner.name.charAt(0).toUpperCase()}
            </div>
            {owner.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[var(--primary)] rounded-full flex items-center justify-center border-2 border-white">
                <FaCheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>
          
          {/* Owner Details */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-[var(--foreground)]">{owner.name}</h3>
              {owner.isVerified && (
                <div className="flex items-center bg-[var(--primary-light)] text-[var(--primary-dark)] px-3 py-1.5 rounded-full text-xs font-medium border border-[var(--primary)]/20">
                  <FaCheckCircle className="w-3 h-3 mr-1.5" />
                  Verified
                </div>
              )}
            </div>
            <p className="text-[var(--foreground-sec)] text-sm mb-3">Property Owner & Landlord</p>
            
            {/* Contact Info */}
            <div className="flex items-center text-[var(--foreground)]">
              <FaPhone className="w-4 h-4 mr-2 text-[var(--foreground-sec)]" />
              <span className="text-sm">{owner.phoneNumber}</span>
            </div>
          </div>
        </div>
        
        {/* Trust Indicators */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-[var(--foreground)]">
              <FaLock className="w-4 h-4 mr-2 text-[var(--foreground-sec)]" />
              <span className="text-sm">Identity Verified</span>
            </div>
            {owner.isVerified && (
              <FaCheckCircle className="w-4 h-4 text-green-600" />
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-[var(--foreground)]">
              <FaPhone className="w-4 h-4 mr-2 text-[var(--foreground-sec)]" />
              <span className="text-sm">Phone Verified</span>
            </div>
            <FaCheckCircle className="w-4 h-4 text-green-600" />
          </div>
        </div>
        
        {/* Response Time */}
        <div className="flex items-center justify-between text-[var(--foreground)] text-sm">
          <span>Response time:</span>
          <span className="font-medium text-[var(--primary)]">Usually within 2 hours</span>
        </div>
      </div>
    </div>
  );
}
