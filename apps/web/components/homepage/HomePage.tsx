"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "./HeroSection";
import FeaturedListings from "./FeaturedListings";

const HomePage = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedListings />
    </main>
  );
};

export default HomePage;
