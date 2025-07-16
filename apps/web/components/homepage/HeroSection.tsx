"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaPlus,
  FaMapMarkerAlt,
  FaDollarSign,
  FaHome,
} from "react-icons/fa";

const HeroSection = () => {

  return (
    <section className="container mx-auto px-2 sm:px-4 lg:px-6 w-full text-center flex items-center flex-col gap-y-4">
      {/* Hero Content */}
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] px-3 py-1.5 rounded-full w-fit">
          <FaHome className="text-[var(--primary)] text-xs" />
          <span className="text-[var(--primary)] font-semibold text-xs uppercase tracking-wider">
            Room Rental Platform
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--foreground) leading-tight">
          Find Your Next Room &ndash;{" "}
          <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">
            Hassle-Free
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-base sm:text-lg text-[var(--foreground-sec)] max-w-xl mx-auto mb-2">
          Browse verified room listings or post your own with ease. Connect with
          trusted landlords and find your perfect home.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-x-5 gap-y-3 justify-center items-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-3 py-2 rounded-lg font-medium text-base transition-all duration-300 transform shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <FaSearch className="text-sm" />
            Search Rooms
          </Link>
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary-dark)] hover:text-white px-3 py-2 rounded-lg font-medium text-base transition-all duration-300 w-full sm:w-auto"
          >
            <FaPlus className="text-sm" />
            List a Room
          </Link>
        </div>
    </section>
  );
};

export default HeroSection;
