"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaHome,
  FaMapMarkerAlt,
  FaCamera,
  FaShieldAlt,
  FaCheckCircle,
  FaClock,
  FaArrowRight,
  FaPlus,
  FaStar,
  FaUsers,
  FaRocket,
  FaEye,
  FaHandshake,
  FaChartLine,
} from "react-icons/fa";

const ListRoom = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--primary-light)] to-[var(--background)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--primary)] opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-20 right-20 w-48 h-48 bg-amber-400 opacity-10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-[var(--primary)] opacity-5 rounded-full blur-lg"></div>
        </div>
        
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-[var(--primary)]/20 rounded-full px-4 py-2 mb-6">
              <FaRocket className="text-[var(--primary)] w-4 h-4" />
              <span className="text-sm font-medium text-[var(--primary)]">Nepal's #1 Rental Platform</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--foreground)] mb-6 leading-tight">
              Turn Your Room Into a{" "}
              <span className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">
                Revenue Stream
              </span>
            </h1>
            
            <p className="text-xl text-[var(--foreground-sec)] max-w-3xl mx-auto mb-8 leading-relaxed">
              Join Nepal's most trusted rental marketplace. List your room in minutes, 
              connect with verified tenants, and start earning passive income today.
            </p>

            {/* Hero Stats */}
            <div className="flex flex-wrap justify-center gap-6 mb-10">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center">
                    <FaUsers className="text-white w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-[var(--foreground)]">5,000+</div>
                    <div className="text-sm text-[var(--foreground-sec)]">Active Tenants</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-white w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-[var(--foreground)]">98%</div>
                    <div className="text-sm text-[var(--foreground-sec)]">Success Rate</div>
                  </div>
                </div>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                    <FaStar className="text-white w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-[var(--foreground)]">4.9/5</div>
                    <div className="text-sm text-[var(--foreground-sec)]">User Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/list-room/create"
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <FaPlus className="w-5 h-5" />
                List Your Room Now
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="inline-flex items-center justify-center gap-2 bg-white/80 backdrop-blur-sm border border-[var(--border)] text-[var(--foreground)] px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-white hover:shadow-lg">
                <FaEye className="w-4 h-4" />
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Redesigned */}
      <section className="py-20 bg-[var(--background)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Start Earning in 3 Simple Steps
            </h2>
            <p className="text-lg text-[var(--foreground-sec)] max-w-2xl mx-auto">
              Our streamlined process gets your room listed and earning in no time
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl h-0.5 bg-gradient-to-r from-[var(--primary)] via-[var(--primary)] to-[var(--primary)] opacity-20"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Step 1 */}
              <div className="relative text-center group">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <FaHome className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--primary)] text-white text-sm font-bold rounded-full flex items-center justify-center z-20">
                  1
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Add Room Details
                </h3>
                <p className="text-[var(--foreground-sec)] leading-relaxed">
                  Fill in your room information, set competitive pricing, and describe all amenities in our intuitive form.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative text-center group">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <FaCamera className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--primary)] text-white text-sm font-bold rounded-full flex items-center justify-center z-20">
                  2
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Upload Stunning Photos
                </h3>
                <p className="text-[var(--foreground-sec)] leading-relaxed">
                  Add high-quality photos that showcase your room's best features and attract premium tenants.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative text-center group">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <FaHandshake className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--primary)] text-white text-sm font-bold rounded-full flex items-center justify-center z-20">
                  3
                </div>
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                  Connect & Earn
                </h3>
                <p className="text-[var(--foreground-sec)] leading-relaxed">
                  Get matched with verified tenants instantly and start earning passive income from day one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section - Redesigned */}
      <section className="py-20 bg-gradient-to-br from-[var(--primary-light)] to-[var(--background)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Why Landlords Choose RentNest
            </h2>
            <p className="text-lg text-[var(--foreground-sec)] max-w-2xl mx-auto">
              Experience the difference with Nepal's most advanced rental platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Verified Tenants Only</h3>
              <p className="text-[var(--foreground-sec)] leading-relaxed">
                Every tenant goes through our rigorous verification process including ID, income, and background checks.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Lightning Fast Listing</h3>
              <p className="text-[var(--foreground-sec)] leading-relaxed">
                Get your room live in under 5 minutes with our AI-powered listing optimization.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaChartLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Maximum Exposure</h3>
              <p className="text-[var(--foreground-sec)] leading-relaxed">
                Reach over 10,000 monthly active room seekers across all major cities in Nepal.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaCheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Zero Hidden Costs</h3>
              <p className="text-[var(--foreground-sec)] leading-relaxed">
                Complete transparency with no surprise fees. Start listing for free and pay only when you earn.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaStar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">24/7 Expert Support</h3>
              <p className="text-[var(--foreground-sec)] leading-relaxed">
                Our dedicated success team is always ready to help you maximize your rental income.
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">Smart Tenant Matching</h3>
              <p className="text-[var(--foreground-sec)] leading-relaxed">
                Our AI algorithm matches you with tenants who perfectly fit your requirements and preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 bg-[var(--background)]">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-4">
              Success Stories from Real Landlords
            </h2>
            <p className="text-lg text-[var(--foreground-sec)] max-w-2xl mx-auto">
              See how RentNest has transformed rental experiences across Nepal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[var(--primary)]/5 to-[var(--primary-dark)]/5 rounded-3xl p-8 border border-[var(--primary)]/10 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <p className="text-[var(--foreground-sec)] mb-6 italic">
                "Found the perfect tenant within 2 days! The verification process gave me complete peace of mind."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">S</span>
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)]">Sujan Maharjan</div>
                  <div className="text-sm text-[var(--foreground-sec)]">Kathmandu</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <p className="text-[var(--foreground-sec)] mb-6 italic">
                "RentNest helped me increase my rental income by 40%. The platform is incredibly user-friendly!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">P</span>
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)]">Priya Sharma</div>
                  <div className="text-sm text-[var(--foreground-sec)]">Lalitpur</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
              </div>
              <p className="text-[var(--foreground-sec)] mb-6 italic">
                "The support team is amazing! They helped me optimize my listing and now I get quality inquiries daily."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">R</span>
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)]">Raj Thapa</div>
                  <div className="text-sm text-[var(--foreground-sec)]">Bhaktapur</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA - Redesigned */}
      <section className="py-20 bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Room Into Income?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join over 10,000 successful landlords who've already started their rental journey with RentNest. 
              Your perfect tenant is just one click away.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/list-room/create"
                className="group inline-flex items-center justify-center gap-3 bg-white text-[var(--primary)] px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                <FaPlus className="w-5 h-5" />
                Start Your Journey Today
                <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <div className="flex items-center gap-2 text-white/80">
                <FaCheckCircle className="w-4 h-4" />
                <span className="text-sm">Free to start • No setup fees</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ListRoom;
