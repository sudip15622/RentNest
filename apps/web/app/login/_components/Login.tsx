"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./LoginForm";

const Login = () => {
  const searchParams = useSearchParams();
  const shouldRefresh = searchParams.get('refresh');

  useEffect(() => {
    // If we're redirected here after session deletion, trigger a page refresh
    // to update the navbar and other components
    if (shouldRefresh === 'true') {
      // Remove the refresh parameter from URL and reload
      const url = new URL(window.location.href);
      url.searchParams.delete('refresh');
      window.history.replaceState({}, '', url.toString());
      window.location.reload();
    }
  }, [shouldRefresh]);

  return (
    <main className="page-content min-h-screen bg-[var(--background)] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg border border-[var(--border)] p-8">
          {/* Logo and Header */}
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
              Landlord Login
            </h1>
            <p className="text-[var(--foreground-sec)]">
              Access your property management dashboard
            </p>
          </div>
          
          <LoginForm />

          {/* Sign up link */}
          <div className="text-center mt-6 pt-6 border-t border-[var(--border)]">
            <p className="text-[var(--foreground-sec)] text-sm">
              Don't have an account?{" "}
              <Link
                className="text-[var(--primary)] font-bold hover:text-[var(--primary-dark)] transition-colors"
                href={"/signup"}
              >
                Become a Landlord
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
