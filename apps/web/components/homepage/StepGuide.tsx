"use client";
import React from "react";
import { FaSearch, FaEye, FaHandshake } from "react-icons/fa";

const StepGuide = () => {
  const steps = [
    {
      id: 1,
      icon: <FaSearch className="text-3xl text-[var(--primary)]" />,
      title: "Search & Filter",
      description: "Browse through thousands of verified room listings. Use our advanced filters to find rooms that match your budget, location, and preferences.",
    },
    {
      id: 2,
      icon: <FaEye className="text-3xl text-[var(--primary)]" />,
      title: "View & Compare",
      description: "Explore detailed room photos, amenities, and reviews from previous tenants. Compare multiple options to make an informed decision.",
    },
    {
      id: 3,
      icon: <FaHandshake className="text-3xl text-[var(--primary)]" />,
      title: "Connect & Move In",
      description: "Contact verified landlords directly through our platform. Schedule visits, negotiate terms, and secure your perfect room hassle-free.",
    },
  ];

  return (
    <section className="w-full py-12 lg:py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] mb-4">
            How It Works
          </h2>
          <p className="text-lg text-[var(--foreground-sec)] max-w-2xl mx-auto">
            Finding your perfect room is just three simple steps away
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="relative group">
              {/* Step Card */}
              <div className="text-center transition-all duration-300 hover:transform">
                {/* Step Number */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 mx-auto bg-[var(--primary-light)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </div>
                </div>

                {/* Step Content */}
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">
                  {step.title}
                </h3>
                <p className="text-[var(--foreground-sec)] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Connector Arrow (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-6 lg:-right-8 text-[var(--primary)] opacity-50">
                  <svg 
                    className="w-8 h-8" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StepGuide;
