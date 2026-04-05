import { Suspense } from "react";
import Link from "next/link";
import LeadCaptureForm from "@/components/forms/LeadCaptureForm";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0e0e1f] flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <nav className="w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between shrink-0">
        {/* MORE MONEY Logo */}
        <div className="flex items-center gap-3">
          {/* M icon — upward trending arrows */}
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Left arrow chevron */}
            <polyline points="2,22 9,10 16,18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            {/* Right arrow chevron */}
            <polyline points="16,18 23,6 30,14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            {/* Arrow tip */}
            <polyline points="26,6 30,6 30,10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          {/* MORE plain text */}
          <span className="text-white font-bold text-xl tracking-widest">MORE</span>
          {/* MONEY in rectangle box */}
          <div className="border-2 border-white px-2.5 py-0.5">
            <span className="text-white font-bold text-xl tracking-widest">MONEY</span>
          </div>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/" className="text-white hover:text-blue-400 transition-colors">HOME</Link>
          <Link href="#" className="hover:text-white transition-colors">SERVICES</Link>
          <Link href="#" className="hover:text-white transition-colors">ABOUT</Link>
          <Link href="#" className="hover:text-white transition-colors">CONTACT</Link>
          <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden text-gray-400 hover:text-white transition-colors p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch">
        {/* Left Side — always full width on mobile, half on desktop */}
        <div className="w-full lg:flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 sm:py-10 lg:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-1">
            Apply Now
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 leading-tight mb-5">
            to Get Your Offer
          </h2>

          {/* Product Carousel */}
          <div className="mb-6">
            <ProductCarousel />
          </div>

          <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md">
            Fill in your details below to get matched with financial products tailored to your profile.
            We check your eligibility in seconds — fully secure and POPIA compliant.
          </p>

          <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl" />}>
            <LeadCaptureForm />
          </Suspense>

          <p className="mt-6 text-xs text-gray-600">
            www.leadcapture.co.za
          </p>
        </div>

        {/* Right Side — Blob Visual (desktop only) */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
          {/* Background blob */}
          <div
            className="absolute w-[520px] h-[520px] bg-blue-600/25 blur-3xl"
            style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
          />
          {/* Blue filled blob */}
          <div
            className="absolute w-[420px] h-[420px] bg-gradient-to-br from-blue-600 to-blue-800"
            style={{ borderRadius: "55% 45% 65% 35% / 50% 60% 40% 50%", transform: "translate(30px, -20px)" }}
          />
          {/* White outlined blob */}
          <div
            className="absolute w-[380px] h-[380px] border-2 border-white/20"
            style={{ borderRadius: "40% 60% 50% 50% / 35% 45% 55% 65%", transform: "translate(-30px, 30px)" }}
          />
          {/* Inner content */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-10">
            <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 border border-white/20">
              <svg className="w-16 h-16 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
              </svg>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-5 border border-white/15 max-w-xs">
              <p className="text-white font-semibold text-lg mb-1">Fast Approval</p>
              <p className="text-gray-300 text-sm">Get matched with offers in under 2 minutes</p>
            </div>
            <div className="flex gap-3 mt-8">
              <div className="w-3 h-3 rounded-full bg-white" />
              <div className="w-3 h-3 rounded-full bg-blue-400/60" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
