"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaSearch,
  FaPlus,
  FaMapMarkerAlt,
  FaUsers,
  FaShieldAlt,
  FaStar,
  FaPlay,
  FaArrowRight,
} from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--primary-light)] to-[var(--background)] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-400 opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[var(--primary)] opacity-5 rounded-full blur-lg"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-[75vh]">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-[var(--primary)]/20">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400 w-4 h-4" />
                <FaStar className="text-yellow-400 w-4 h-4" />
                <FaStar className="text-yellow-400 w-4 h-4" />
                <FaStar className="text-yellow-400 w-4 h-4" />
                <FaStar className="text-yellow-400 w-4 h-4" />
              </div>
              <span className="text-[var(--foreground)] font-semibold text-sm">
                Trusted by 2000+ Users
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] leading-tight">
                Find Your Perfect{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-[var(--primary)] via-amber-500 to-[var(--primary-dark)] bg-clip-text text-transparent">
                    Room
                  </span>
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[var(--primary)] to-amber-500 rounded-full"></div>
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-[var(--foreground-sec)] max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Connect with verified landlords, explore authentic listings, and find your ideal living space. 
              Safe, simple, and designed for Nepal.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm">
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full">
                <FaUsers className="text-[var(--primary)] w-4 h-4" />
                <span className="font-semibold text-[var(--foreground)]">1200+ Happy Renters</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full">
                <FaShieldAlt className="text-[var(--primary)] w-4 h-4" />
                <span className="font-semibold text-[var(--foreground)]">100% Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-2 rounded-full">
                <FaMapMarkerAlt className="text-[var(--primary)] w-4 h-4" />
                <span className="font-semibold text-[var(--foreground)]">All Major Cities</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/search"
                className="group inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaSearch className="w-4 h-4" />
                Start Searching
                <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/list-room"
                className="group inline-flex items-center justify-center gap-2 bg-white/90 backdrop-blur-sm border-2 border-[var(--primary)] text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FaPlus className="w-4 h-4" />
                List Your Room
              </Link>
            </div>

            {/* Additional CTA */}
            <div className="pt-4">
              <button className="group inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-dark)] font-medium transition-colors">
                <div className="w-8 h-8 bg-[var(--primary)]/10 rounded-full flex items-center justify-center group-hover:bg-[var(--primary)]/20 transition-colors">
                  <FaPlay className="w-3 h-3 ml-0.5" />
                </div>
                Watch How It Works
              </button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative lg:h-full flex items-center justify-center">
            {/* Main Image Container */}
            <div className="relative w-full max-w-lg">
              {/* Floating Cards */}
              <div className="absolute -top-8 -left-8 bg-white rounded-xl p-4 shadow-lg border border-[var(--primary)]/10 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[var(--primary-light)] rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-[var(--primary)] w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)] text-sm">Kathmandu</div>
                    <div className="text-[var(--foreground-sec)] text-xs">850+ Rooms Available</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-8 -right-8 bg-white rounded-xl p-4 shadow-lg border border-[var(--primary)]/10 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <FaShieldAlt className="text-green-600 w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-[var(--foreground)] text-sm">100% Verified</div>
                    <div className="text-[var(--foreground-sec)] text-xs">Safe & Secure</div>
                  </div>
                </div>
              </div>

              {/* Hero Image */}
              <div className="relative bg-gradient-to-br from-white to-[var(--primary-light)] rounded-2xl p-8 shadow-2xl">
                <Image
                  src="/hero_image.png"
                  alt="Find Perfect Rooms in Nepal"
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-xl"
                  priority
                />
                
                {/* Overlay Badge */}
                <div className="absolute top-4 right-4 bg-[var(--primary)] text-white px-3 py-1 rounded-full text-sm font-semibold">
                  #1 in Nepal
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-[var(--foreground-sec)] text-sm mb-6">Trusted by leading property owners and renters across Nepal</p>
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-[var(--foreground)] font-semibold">Kathmandu Properties</div>
            <div className="w-px h-4 bg-[var(--border)]"></div>
            <div className="text-[var(--foreground)] font-semibold">Pokhara Homes</div>
            <div className="w-px h-4 bg-[var(--border)]"></div>
            <div className="text-[var(--foreground)] font-semibold">Chitwan Rentals</div>
            <div className="w-px h-4 bg-[var(--border)]"></div>
            <div className="text-[var(--foreground)] font-semibold">Lalitpur Living</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
