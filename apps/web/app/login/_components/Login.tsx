"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "./LoginForm";
import SocialButton from "../../signup/_components/SocialButton";

const Login = () => {
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
          <h1 className="text-2xl font-semibold text-center">Log In</h1>
        </div>

        <LoginForm />
        <div className="w-full flex items-center justify-center">
          <span className="w-full h-[1px] bg-[var(--border)]"></span>
          <span>Or</span>
          <span className="w-full h-[1px] bg-[var(--border)]"></span>
        </div>
        <SocialButton />

        <div className="flex flex-row gap-x-2 justify-center">
          <p>Don&apos;t have an account?</p>
          <Link
            className="underline font-semibold text-[var(--blue)]"
            href={"/signup"}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Login;
