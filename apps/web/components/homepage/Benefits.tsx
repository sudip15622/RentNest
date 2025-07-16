"use client";
import React from "react";
import { FaCheckCircle, FaShieldAlt, FaMapMarkerAlt, FaEdit, FaStar, FaLock } from "react-icons/fa";

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: <FaCheckCircle className="w-8 h-8 text-[var(--primary)]" />,
      title: "Verified Listings",
      description: "Every property and landlord is verified to ensure authenticity and reliability. No fake listings, no scams.",
      features: ["Identity verification", "Property documentation", "Background checks", "24/7 monitoring"]
    },
    {
      id: 2,
      icon: <FaEdit className="w-8 h-8 text-[var(--primary)]" />,
      title: "Easy Posting",
      description: "List your room in minutes with our simple, guided posting process. No technical expertise required.",
      features: ["Quick setup", "Photo upload", "Instant publishing", "Edit anytime"]
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt className="w-8 h-8 text-[var(--primary)]" />,
      title: "Nepal-Focused Filters",
      description: "Search filters designed specifically for Nepal's rental market with local insights and preferences.",
      features: ["City-wise search", "Local amenities", "Transportation access", "Cultural preferences"]
    },
    {
      id: 4,
      icon: <FaShieldAlt className="w-8 h-8 text-[var(--primary)]" />,
      title: "Safe & Secure",
      description: "Your data and transactions are protected with bank-level security. Peace of mind guaranteed.",
      features: ["Encrypted data", "Secure payments", "Privacy protection", "Fraud prevention"]
    }
  ];

  return (
    <section className="w-full py-12 lg:py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] px-4 py-2 rounded-full mb-6">
            <FaStar className="text-[var(--primary)] w-4 h-4" />
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider">
              Why Choose RentNest?
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] mb-4">
            The Smart Way to Find Rooms in Nepal
          </h2>
          <p className="text-lg text-[var(--foreground-sec)] max-w-3xl mx-auto">
            Experience the difference with Nepal's most trusted room rental platform. Built by locals, for locals.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--border)] group hover:border-[var(--primary)] hover:-translate-y-1 flex flex-col h-full"
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-[var(--primary-light)] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[var(--foreground)] text-center mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--foreground-sec)] text-center mb-4 leading-relaxed flex-grow">
                {benefit.description}
              </p>

              {/* Features List */}
              <ul className="space-y-2 mt-auto">
                {benefit.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-[var(--foreground-sec)]">
                    <FaCheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-[var(--primary)] to-amber-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <FaLock className="w-6 h-6 mr-2" />
              <h3 className="text-2xl font-bold">100% Safe & Trusted</h3>
            </div>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of satisfied users who've found their perfect rooms through RentNest
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center">
                <FaCheckCircle className="w-4 h-4 mr-2" />
                <span>No Hidden Fees</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="w-4 h-4 mr-2" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="w-4 h-4 mr-2" />
                <span>Money Back Guarantee</span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="w-4 h-4 mr-2" />
                <span>Instant Verification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
