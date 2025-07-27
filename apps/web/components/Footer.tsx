"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaEnvelope,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[var(--background)] border-t border-[var(--border)] footer-spacing">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[var(--primary-light)] rounded-xl flex items-center justify-center">
                <Image
                  src="/rentnest.png"
                  alt="RentNest"
                  width={24}
                  height={24}
                  className="object-cover"
                  priority
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent">
                RentNest
              </span>
            </div>
            <p className="text-[var(--foreground-sec)] text-sm leading-relaxed">
              Nepal's most trusted platform for finding and renting rooms.
              Connect with verified landlords and discover your perfect living
              space.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/listings"
                  className="text-[var(--foreground-sec)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Search Rooms
                </Link>
              </li>
              <li>
                <Link
                  href="/list-room"
                  className="text-[var(--foreground-sec)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  List Your Room
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[var(--foreground-sec)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[var(--foreground-sec)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-[var(--foreground-sec)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[var(--foreground-sec)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[var(--foreground-sec)] hover:text-[var(--primary)] transition-colors text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              Get in Touch
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaPhone className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-sm text-[var(--foreground-sec)]">
                  +977 1-234-5678
                </span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="w-4 h-4 text-[var(--primary)]" />
                <span className="text-sm text-[var(--foreground-sec)]">
                  hello@rentnest.com
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="w-8 h-8 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <FaFacebookF className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <FaTwitter className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <FaInstagram className="w-4 h-4" />
              </Link>
              <Link
                href="#"
                className="w-8 h-8 bg-[var(--primary-light)] rounded-full flex items-center justify-center text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white transition-colors"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-[var(--border)] my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <div className="text-sm text-[var(--foreground-sec)] text-center">
            <span className="block sm:inline">© 2025 RentNest.</span>
            <span className="hidden sm:inline"> Made with </span>
            <FaHeart className="hidden sm:inline w-4 h-4 text-red-500 mx-1" />
            <span className="hidden sm:inline"> in Nepal.</span>
            <span className="block sm:inline"> All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
