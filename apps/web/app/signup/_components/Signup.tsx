"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import SignupForm from "./SignupForm";
import SocialButton from "./SocialButton";

const Signup = () => {
  return (
    <main>
      <div className="mx-auto w-full max-w-sm shadow-xl border-1 border-[var(--border)] py-5 px-10 rounded-2xl flex flex-col items-center gap-y-5">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="w-10 h-10 object-cover"
            src={"/rentnest.png"}
            width={80}
            height={80}
            priority
            alt="Room RS"
          />
          <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
        </div>
        
        <SignupForm />
        <div className="w-full flex items-center justify-center">
          <span className="w-full h-[1px] bg-[var(--border)]"></span>
          <span>Or</span>
          <span className="w-full h-[1px] bg-[var(--border)]"></span>
        </div>
        <SocialButton />
        
        <div className="flex flex-row gap-x-2 justify-center">
          <p>Already have an account?</p>
          <Link
            className="underline font-semibold text-[var(--blue)]"
            href={"/login"}
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Signup;
