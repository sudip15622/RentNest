"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { IoMenu } from "react-icons/io5";
import { MdLogout } from "react-icons/md";

const Navbar = ({ user }: { user: any }) => {
  const router = useRouter();
  const [showDash, setShowDash] = useState<boolean>(false);
  const showDashRef = useRef<HTMLDivElement>(null);

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
    <nav className="sticky top-0 left-0 z-[1000] bg-[var(--background)] w-full flex items-center justify-center border-b-1 border-[var(--border)]">
      <div className="w-full max-w-7xl mx-7 my-2 flex flex-row items-center justify-between">
        <Link href={"/"} className="flex flex-row items-center gap-x-2">
          {/* <Image
            className="w-8 h-8 object-cover"
            src={"/rentnest.png"}
            height={100}
            width={100}
            priority
            alt="logo"
          /> */}
          <span className="text-xl font-semibold">RentNest</span>
        </Link>
        <div className="flex items-center gap-x-8">
          <Link
            href={"/search"}
            className="transition-colors duration-200 ease-in-out hover:text-[var(--primary-dark)] text-lg"
          >
            Search Rooms
          </Link>
          <Link
            href={"/"}
            className="transition-colors duration-200 ease-in-out hover:text-[var(--primary-dark)] text-lg"
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
                className="cursor-pointer rounded-full object-cover h-7 w-7"
                src={user.image}
                width={50}
                height={50}
                alt="user-avatar"
              />
              <div
                className={`z=[1000] absolute overflow-hidden top-5 right-0 bg-[var(--background)] border-1 border-[var(--border)] rounded-2xl shadow-md min-w-44 ${
                  showDash
                    ? "pointer-events-auto opacity-100 translate-y-4"
                    : "pointer-events-none opacity-0"
                } transition-all duration-200 ease-in-out`}
              >
                <Link
                  href={"/dashboard"}
                  onClick={() => setShowDash(false)}
                  className="w-full flex items-center justify-start flex-row pt-4 px-3 pb-2 hover:bg-[var(--primary-light)] transition-colors duration-200 ease-in-out"
                >
                  Dashboard
                </Link>
                <Link
                  href={"/profile"}
                  onClick={() => setShowDash(false)}
                  className="w-full flex items-center justify-start flex-row py-2 px-3  hover:bg-[var(--primary-light)] transition-colors duration-200 ease-in-out"
                >
                  Profile
                </Link>
                <button
                  onClick={() => handleSignOut()}
                  className="w-full flex items-center justify-start flex-row gap-x-2 text-red-500 pt-2 pb-4 px-3 hover:bg-[var(--primary-light)] transition-colors duration-200 ease-in-out"
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
                className="transition-colors duration-200 ease-in-out text-[var(--primary)] hover:text-[var(--primary-dark)] text-lg"
              >
                Login
              </Link>
              <Link
                href={"/signup"}
                className="transition-colors duration-200 ease-in-out bg-[var(--primary)] text-[var(--background)] rounded-lg px-3 py-1 hover:bg-[var(--primary-dark)]"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
