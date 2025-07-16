"use client";
import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./LoginForm";
import SocialButton from "../../signup/_components/SocialButton";

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
      <div className="w-full max-w-sm">
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-[var(--border)] p-8">
          {/* Logo and Header */}
          <div className="text-center mb-8">
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
            <h1 className="text-2xl font-bold text-[var(--foreground)] mb-1">
              Welcome back
            </h1>
            <p className="text-[var(--foreground-sec)]">
              Please sign in to your account
            </p>
          </div>

          <SocialButton />
          
          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-[var(--border)]"></div>
            <span className="px-3 text-sm text-[var(--foreground-sec)]">or</span>
            <div className="flex-1 h-px bg-[var(--border)]"></div>
          </div>
          
          <LoginForm />

          {/* Sign up link */}
          <div className="text-center mt-6 pt-6 border-t border-[var(--border)]">
            <span className="text-[var(--foreground-sec)]">Don't have an account? </span>
            <Link
              className="text-[var(--primary)] font-semibold hover:text-[var(--primary-dark)] transition-colors"
              href={"/signup"}
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
