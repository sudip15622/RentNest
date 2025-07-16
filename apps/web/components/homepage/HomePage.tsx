"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "./HeroSection";
import FeaturedListings from "./FeaturedListings";
import StepGuide from "./StepGuide";
import Benefits from "./Benefits";
import Testimonials from "./Testimonials";

const HomePage = () => {
  return (
    <main className="relative z-10">
      <HeroSection />
      
      {/* Divider */}
      <div className="w-full flex justify-center py-4">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent"></div>
      </div>
      
      <FeaturedListings />
      
      {/* Divider */}
      <div className="w-full flex justify-center py-4">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent"></div>
      </div>
      
      <StepGuide />
      
      {/* Divider */}
      <div className="w-full flex justify-center py-4">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent"></div>
      </div>
      
      <Benefits />
      
      {/* Divider */}
      <div className="w-full flex justify-center py-4">
        <div className="w-48 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent"></div>
      </div>
      
      <Testimonials />
    </main>
  );
};

export default HomePage;
