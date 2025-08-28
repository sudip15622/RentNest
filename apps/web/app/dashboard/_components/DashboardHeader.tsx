"use client";
import React from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

interface DashboardHeaderProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
    phoneNumber: string;
    citizenshipNumber: string;
    propertyAddress: string;
  };
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <div className="bg-[var(--background)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 sm:flex-row flex-col gap-y-2">
          {/* Welcome Message */}
          <div>
            <h1 className="text-2xl font-bold text-[var(--foreground)] text-center sm:text-left">
              Welcome back, {user.name}!
            </h1>
            <p className="text-[var(--foreground-sec)] mt-1 text-center sm:text-left">
              Manage your listings and track your inquiries
            </p>
          </div>

          {/* Add New Listing Button */}
          <Link
            href="/list-room"
            className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg font-medium hover:bg-[var(--primary-dark)] transition-colors duration-300 flex items-center gap-2 shadow-md"
          >
            <FaPlus size={16} />
            Add New Listing
          </Link>
        </div>
      </div>
    </div>
  );
}
