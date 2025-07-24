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
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-lg mb-6 border border-[var(--border)]">
            <Image
              className="w-10 h-10 object-cover"
              src={"/rentnest.png"}
              width={40}
              height={40}
              priority
              alt="RentNest"
            />
          </div>
          <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">
            Start Earning from Your Property
          </h1>
          <p className="text-xl text-[var(--foreground-sec)] max-w-2xl mx-auto">
            Join thousands of successful landlords on RentNest. List your property, 
            connect with quality tenants, and maximize your rental income.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[var(--border)]">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h3 className="font-semibold text-[var(--foreground)] mb-2">Easy Listing</h3>
            <p className="text-sm text-[var(--foreground-sec)]">
              Create professional listings in minutes with our simple form
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[var(--border)]">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-semibold text-[var(--foreground)] mb-2">Quality Tenants</h3>
            <p className="text-sm text-[var(--foreground-sec)]">
              Connect with verified tenants looking for their perfect home
            </p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-lg shadow-sm border border-[var(--border)]">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="font-semibold text-[var(--foreground)] mb-2">Maximize Income</h3>
            <p className="text-sm text-[var(--foreground-sec)]">
              Get competitive rates and reduce vacancy periods
            </p>
          </div>
        </div>

        {/* Signup Form */}
        <SignupForm />
      </div>
    </main>
  );
};

export default Signup;
