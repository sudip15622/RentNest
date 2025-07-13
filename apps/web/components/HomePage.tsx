"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import { FaArrowRightLong } from "react-icons/fa6";

const HomePage = () => {
  return (
    <main>
      <section className="w-full flex flex-col gap-x-4 items-center justify-center text-center gap-y-5">
        <p className="font-semibold text-xs text-[var(--blue)]">
          ROOM RENTAL SERVICE
        </p>
        <h1 className="relative text-4xl font-extrabold flex flex-col gap-y-2">
          <div>Room RS, Helping you</div>
          <div>
            <span>Find & </span>
            <span className="bg-[var(--blue-light)] px-2 border-r-4 border-[var(--blue)] rounded-l-md ">
              Book Rooms Online
            </span>
          </div>
          <span className="absolute bottom-[42px] -right-[26px] text-xs text-[var(--background)] bg-[var(--blue)] rounded-r-sm px-1 font-medium">Fast</span>
        </h1>
        <p className="w-full max-w-lg text-lg text-[var(--foreground-sec)]">
          Generate sleek, customizable invoices effortlessly. No sign-up
          required — just fill, download, and get paid faster. Perfect for
          freelancers, small businesses, and professionals.
        </p>
        {/* <Link href={"/invoice/new"} className="flex items-center justify-center w-fit gap-x-2 bg-[var(--blue)] py-1 px-3 rounded-xl text-[var(--background)] hover:bg-[var(--blue-dark)] transition-colors duration-200 ease-in-out">
          <span>Get Started Free</span>
          <span className="flex items-center justify-center"><FaArrowRightLong /></span>
        </Link> */}
      </section>

      <section className="flex items-center justify-center w-full">
        <Image src={"/demo.png"} width={1100} height={800} alt="demo" className="w-full h-full"/>
      </section>
    </main>
  );
};

export default HomePage;
