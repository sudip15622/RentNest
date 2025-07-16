"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const Navbar = ({ user }: { user: any }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [showDash, setShowDash] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const showDashRef = useRef<HTMLDivElement>(null);
  
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = 100; // Fixed 100px scroll distance for immediate trigger
      setIsScrolled(scrollPosition > heroHeight);
    };

    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Check initial position
    } else {
      setIsScrolled(true); // Always use white background on non-homepage
    }

    return () => {
      if (isHomePage) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isHomePage]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showDashRef.current &&
        !showDashRef.current.contains(event.target as Node)
      ) {
        setShowDash(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    await fetch("/api/auth/signout");
    setShowDash(false);
    router.refresh();
  };

  return (
    <nav className={`fixed top-0 left-0 z-[1000] w-full flex items-center justify-center transition-all duration-300 ease-out ${
      isScrolled 
        ? 'bg-[var(--background)]/95 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-row items-center justify-between">
        <Link href={"/"} className="flex flex-row items-center gap-x-2">
          <span className={`text-2xl font-bold transition-all duration-300 ease-out ${
            isScrolled 
              ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] bg-clip-text text-transparent'
              : 'text-[var(--primary-dark)] drop-shadow-sm'
          }`}>
            RentNest
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-x-8">
          <Link
            href={"/search"}
            className={`transition-all duration-300 ease-out font-medium text-lg ${
              isScrolled 
                ? 'text-[var(--foreground)] hover:text-[var(--primary)]'
                : 'text-[var(--foreground)] hover:text-[var(--primary-dark)]'
            }`}
          >
            Search Rooms
          </Link>
          <Link
            href={"/"}
            className={`transition-all duration-300 ease-out font-medium text-lg ${
              isScrolled 
                ? 'text-[var(--foreground)] hover:text-[var(--primary)]'
                : 'text-[var(--foreground)] hover:text-[var(--primary-dark)]'
            }`}
          >
            List a Room
          </Link>
          {user ? (
            <div
              ref={showDashRef}
              className="relative flex items-center gap-x-2"
            >
              <Image
                onClick={() => setShowDash(!showDash)}
                className={`cursor-pointer rounded-full object-cover h-8 w-8 ring-2 transition-all duration-300 ease-out ${
                  isScrolled 
                    ? 'ring-[var(--primary)]/20 hover:ring-[var(--primary)]/40'
                    : 'ring-[var(--primary)]/30 hover:ring-[var(--primary)]/50'
                }`}
                src={user.image}
                width={50}
                height={50}
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
                <Link
                  href={"/profile"}
                  onClick={() => setShowDash(false)}
                  className="w-full flex items-center justify-start flex-row py-2 px-4 hover:bg-[var(--primary-light)] transition-colors duration-200 ease-in-out font-medium"
                >
                  Profile
                </Link>
                <button
                  onClick={() => handleSignOut()}
                  className="w-full flex items-center justify-start flex-row gap-x-2 text-red-500 pt-2 pb-3 px-4 hover:bg-red-50 transition-colors duration-200 ease-in-out font-medium"
                >
                  <span>Log Out</span>
                  <span className="flex items-center justify-center">
                    <MdLogout />
                  </span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href={"/login"}
                className={`transition-all duration-300 ease-out font-medium text-lg ${
                  isScrolled 
                    ? 'text-[var(--primary)] hover:text-[var(--primary-dark)]'
                    : 'text-[var(--primary)] hover:text-[var(--primary-dark)]'
                }`}
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className={`transition-all duration-300 ease-out font-medium rounded-lg px-4 py-2 shadow-lg hover:shadow-xl ${
                  isScrolled 
                    ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white'
                    : 'bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white'
                }`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className={`p-2 rounded-lg transition-all duration-300 ease-out ${
            isScrolled 
              ? 'hover:bg-[var(--primary-light)] text-[var(--primary)]'
              : 'hover:bg-[var(--primary-light)] text-[var(--primary)]'
          }`}>
            <IoMenu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
