"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import SignupForm from "./SignupForm";

const Signup = () => {
  return (
    <main className="page-content min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--background)] rounded-2xl shadow-sm mb-4 border border-[var(--border)]">
            <Image
              className="w-8 h-8 object-cover"
              src={"/rentnest.png"}
              width={32}
              height={32}
              priority
              alt="RentNest"
            />
          </div>
          <h1 className="text-2xl font-bold text-[var(--foreground)] mb-2">
            Become a Landlord
          </h1>
          <p className="text-[var(--foreground-sec)]">
            Join our platform and start earning from your property today
          </p>
        </div>

        {/* Signup Form */}
        <SignupForm />
      </div>
    </main>
  );
};

export default Signup;
