"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { IoMenu, IoClose } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const Navbar = ({ user }: { user: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showDash, setShowDash] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const showDashRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/";
  const isListRoomPage = pathname === "/list-room";
  const isHeroPage = isHomePage || isListRoomPage;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = 100; // Fixed 100px scroll distance for immediate trigger
      setIsScrolled(scrollPosition > heroHeight);
    };

    if (isHeroPage) {
      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial position
    } else {
      setIsScrolled(true); // Always use white background on non-hero pages
    }

    return () => {
      if (isHeroPage) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, [isHeroPage]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showDashRef.current &&
        !showDashRef.current.contains(event.target as Node)
      ) {
        setShowDash(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await fetch("/api/auth/signout");
    setLoading(false);
    setShowDash(false);
    setIsMobileMenuOpen(false);
    router.refresh();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 z-[1000] w-full flex items-center justify-center transition-all duration-300 ease-out ${
        isScrolled
          ? "bg-[var(--background)]/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-row items-center justify-between">
        <Link href={"/"} className="flex flex-row items-center gap-x-2">
          <Image
            className="object-cover w-8 h-8"
            src={"/rentnest.png"}
            width={50}
            height={50}
            alt="logo"
            priority
          />
          <span
            className={`text-[var(--primary-dark)] text-xl font-extrabold transition-all duration-300 ease-out ${
              isScrolled ? "" : "drop-shadow-sm"
            }`}
          >
            RentNest
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-x-8">
          <Link
            href={"/listings"}
            className={`transition-all duration-300 ease-out font-medium text-lg text-[var(--foreground)] hover:text-[var(--primary-dark)]`}
          >
            Search Rooms
          </Link>
          <Link
            href={"/list-room"}
            className={`transition-all duration-300 ease-out font-medium text-lg text-[var(--foreground)] hover:text-[var(--primary-dark)]`}
          >
            List your Room
          </Link>
          {user ? (
            <div
              ref={showDashRef}
              className="relative flex items-center gap-x-2"
            >
              <Image
                onClick={() => setShowDash(!showDash)}
                className={`cursor-pointer rounded-full object-cover h-8 w-8 ring-2 transition-all duration-300 ease-out ring-[var(--primary)]/30 hover:ring-[var(--primary)]/50`}
                src={user.image}
                priority
                width={32}
                height={32}
                alt="user-avatar"
              />
              <div
                className={`z=[1000] absolute overflow-hidden top-8 right-0 bg-[var(--background)]/95 backdrop-blur-md border border-[var(--border)]/30 rounded-xl shadow-lg min-w-48 ${
                  showDash
                    ? "pointer-events-auto opacity-100 translate-y-2"
                    : "pointer-events-none opacity-0"
                } transition-all duration-200 ease-in-out`}
              >
                <Link
                  href={"/dashboard"}
                  onClick={() => setShowDash(false)}
                  className="w-full flex items-center justify-start flex-row pt-3 px-4 pb-2 hover:bg-[var(--primary-light)] transition-colors duration-200 ease-in-out font-medium"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => {
                    setLoading(true);
                    handleSignOut();
                  }}
                  className="w-full flex items-center justify-between flex-row text-red-500 pt-2 pb-3 px-4 hover:bg-red-50 transition-colors duration-200 ease-in-out font-medium"
                >
                  <div className="flex items-center justify-start gap-x-2">
                    <span>Log Out</span>
                    <span className="flex items-center justify-center">
                      <MdLogout />
                    </span>
                  </div>
                  {loading && (
                    <span className="animate-spin self-end rounded-full h-4 w-4 border-b-2 border-red-500"></span>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href={"/login"}
                className={`transition-all duration-300 ease-out font-medium text-lg ${
                  isScrolled
                    ? "text-[var(--primary)] hover:text-[var(--primary-dark)]"
                    : "text-[var(--primary)] hover:text-[var(--primary-dark)]"
                }`}
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className={`transition-all duration-300 ease-out font-medium rounded-lg px-4 py-2 shadow-lg hover:shadow-xl ${
                  isScrolled
                    ? "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white"
                    : "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white"
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button and User Avatar */}
        <div className="md:hidden flex items-center gap-x-2">
          {user && (
            <Image
              className="rounded-full object-cover h-8 w-8 ring-2 ring-[var(--primary)]/30"
              src={user.image}
              priority
              width={32}
              height={32}
              alt="user-avatar"
            />
          )}
          <div ref={mobileMenuRef}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg transition-all duration-300 ease-out ${
                isScrolled
                  ? "hover:bg-[var(--primary-light)] text-[var(--primary)]"
                  : "hover:bg-[var(--primary-light)] text-[var(--primary)]"
              }`}
            >
              {isMobileMenuOpen ? (
                <IoClose className="w-6 h-6" />
              ) : (
                <IoMenu className="w-6 h-6" />
              )}
            </button>

            {/* Mobile Menu Overlay */}
            <div
              className={`fixed top-[70px] left-0 w-full h-[calc(100vh-70px)] bg-black/20 backdrop-blur-sm z-[998] transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
              onClick={closeMobileMenu}
            />

            {/* Mobile Sidebar */}
            <div
              className={`fixed top-[70px] right-0 w-64 max-w-[75vw] h-[calc(100vh-70px)] bg-[var(--background)]/95 backdrop-blur-md border-l border-[var(--border)]/30 shadow-2xl z-[999] transition-all duration-300 ease-in-out ${
                isMobileMenuOpen
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}
            >
              <div className="flex flex-col h-full p-4">
                {/* Navigation Links */}
                <div className="flex flex-col space-y-0.5 mt-2">
                  <Link
                    href="/listings"
                    onClick={closeMobileMenu}
                    className="text-base font-medium text-[var(--foreground)] hover:text-[var(--primary-dark)] hover:bg-[var(--primary-light)] transition-all duration-200 py-2.5 px-3 rounded-lg"
                  >
                    Search Rooms
                  </Link>
                  <Link
                    href="/list-room"
                    onClick={closeMobileMenu}
                    className="text-base font-medium text-[var(--foreground)] hover:text-[var(--primary-dark)] hover:bg-[var(--primary-light)] transition-all duration-200 py-2.5 px-3 rounded-lg"
                  >
                    List your Room
                  </Link>
                </div>

                {/* Divider */}
                <div className="border-t border-[var(--border)]/30 my-4" />

                {/* User Authentication */}
                {user ? (
                  <div className="flex flex-col space-y-0.5">
                    <Link
                      href="/dashboard"
                      onClick={closeMobileMenu}
                      className="text-base font-medium text-[var(--foreground)] hover:text-[var(--primary-dark)] hover:bg-[var(--primary-light)] transition-all duration-200 py-2.5 px-3 rounded-lg"
                    >
                      Dashboard
                    </Link>
                    
                    <button
                      onClick={() => {
                        setLoading(true);
                        handleSignOut();
                      }}
                      className="flex items-center justify-between text-base font-medium text-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-200 py-2.5 px-3 rounded-lg"
                    >
                      <div className="flex items-center gap-x-2">
                        <span>Log Out</span>
                        <MdLogout />
                      </div>
                      {loading && (
                        <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-500"></span>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-0.5">
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className="text-base font-medium text-[var(--primary)] hover:text-[var(--primary-dark)] hover:bg-[var(--primary-light)] transition-all duration-200 py-2.5 px-3 rounded-lg text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      onClick={closeMobileMenu}
                      className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white font-medium rounded-lg py-2.5 px-3 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                    >
                      Sign Up
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
