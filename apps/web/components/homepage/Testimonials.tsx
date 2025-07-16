"use client";
import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Kathmandu",
      rating: 5,
      review: "Found my perfect room within days! The platform made it so easy to connect with verified landlords. Highly recommend RentNest.",
      avatar: "/default_user.png",
    },
    {
      id: 2,
      name: "Raj Patel",
      location: "Lalitpur",
      rating: 5,
      review: "As a landlord, RentNest helped me find reliable tenants quickly. The verification process gives me peace of mind.",
      avatar: "/default_user.png",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      location: "Pokhara",
      rating: 4,
      review: "Great experience overall. The search filters are amazing and I loved seeing real reviews from previous tenants.",
      avatar: "/default_user.png",
    },
  ];

  return (
    <section className="w-full py-12 lg:py-16 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Statement */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[var(--primary-light)] px-4 py-2 rounded-full mb-6">
            <span className="text-[var(--primary)] font-semibold text-sm uppercase tracking-wider">
              Trusted by 100+ renters and room owners
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--foreground)] mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-[var(--foreground-sec)] max-w-2xl mx-auto">
            Real experiences from real people who found their perfect rooms through RentNest
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--border)] relative flex flex-col h-full"
            >
              {/* Quote Icon */}
              <div className="absolute -top-3 left-6">
                <div className="w-8 h-8 bg-[var(--primary)] rounded-full flex items-center justify-center">
                  <FaQuoteLeft className="text-white text-sm" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center mb-4 pt-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`w-4 h-4 ${
                      index < testimonial.rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[var(--foreground-sec)] mb-6 leading-relaxed flex-grow">
                "{testimonial.review}"
              </p>

              {/* User Info */}
              <div className="flex items-center mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold text-[var(--foreground)]">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-[var(--foreground-sec)]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl font-bold text-[var(--primary)]">1,200+</div>
            <div className="text-sm text-[var(--foreground-sec)]">Happy Renters</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--primary)]">850+</div>
            <div className="text-sm text-[var(--foreground-sec)]">Verified Owners</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--primary)]">4.8/5</div>
            <div className="text-sm text-[var(--foreground-sec)]">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[var(--primary)]">24/7</div>
            <div className="text-sm text-[var(--foreground-sec)]">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
