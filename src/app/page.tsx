import { Suspense } from "react";
import Link from "next/link";
import LeadCaptureForm from "@/components/forms/LeadCaptureForm";
import ProductCarousel from "@/components/ui/ProductCarousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0e0e1f] flex flex-col overflow-x-hidden">
      {/* Navigation */}
      <nav className="w-full px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="2,22 9,10 16,18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <polyline points="16,18 23,6 30,14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <polyline points="26,6 30,6 30,10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </svg>
          <span className="text-white font-bold text-xl tracking-widest">MY MONEY</span>
          <div className="border-2 border-white px-2.5 py-0.5">
            <span className="text-white font-bold text-xl tracking-widest">HUB</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <Link href="/" className="text-white hover:text-blue-400 transition-colors">HOME</Link>
          <Link href="#services" className="hover:text-white transition-colors">SERVICES</Link>
          <Link href="#about" className="hover:text-white transition-colors">ABOUT</Link>
          <Link href="#how-it-works" className="hover:text-white transition-colors">HOW IT WORKS</Link>
          <Link href="#contact" className="hover:text-white transition-colors">CONTACT</Link>
        </div>

        <button className="md:hidden text-gray-400 hover:text-white transition-colors p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <div className="flex-1 flex flex-col lg:flex-row items-stretch">
        <div className="w-full lg:flex-1 flex flex-col justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-8 sm:py-10 lg:max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-1">
            Find Out What You
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 leading-tight mb-3">
            Qualify for in Minutes
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 font-medium mb-2">
            Real financial solutions. No guesswork. No pressure.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-md">
            We help you connect to the options that can move you forward — quickly and simply.
          </p>

          <div className="mb-6">
            <ProductCarousel />
          </div>

          <Suspense fallback={<div className="h-64 animate-pulse bg-white/5 rounded-xl" />}>
            <LeadCaptureForm />
          </Suspense>

          <p className="mt-6 text-xs text-gray-600">
            www.mymoneyhub.co.za
          </p>
        </div>

        {/* Right Side — Blob Visual (desktop only) */}
        <div className="hidden lg:flex flex-1 relative items-center justify-center overflow-hidden">
          <div className="absolute w-[520px] h-[520px] bg-blue-600/25 blur-3xl" style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }} />
          <div className="absolute w-[420px] h-[420px] bg-gradient-to-br from-blue-600 to-blue-800" style={{ borderRadius: "55% 45% 65% 35% / 50% 60% 40% 50%", transform: "translate(30px, -20px)" }} />
          <div className="absolute w-[380px] h-[380px] border-2 border-white/20" style={{ borderRadius: "40% 60% 50% 50% / 35% 45% 55% 65%", transform: "translate(-30px, 30px)" }} />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-10 gap-4">
            {/* Why use us bullets */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/15 max-w-xs">
              <p className="text-white font-semibold text-lg mb-3">Why Use Us?</p>
              <ul className="text-gray-300 text-sm space-y-2 text-left">
                <li className="flex gap-2"><span className="text-blue-400">&#10003;</span> No complicated processes</li>
                <li className="flex gap-2"><span className="text-blue-400">&#10003;</span> No guesswork — just real options</li>
                <li className="flex gap-2"><span className="text-blue-400">&#10003;</span> Fast, simple, and secure</li>
                <li className="flex gap-2"><span className="text-blue-400">&#10003;</span> Trusted providers only</li>
                <li className="flex gap-2"><span className="text-blue-400">&#10003;</span> No pressure, no obligation</li>
              </ul>
            </div>
            <div className="flex gap-3 mt-4">
              <div className="w-3 h-3 rounded-full bg-white" />
              <div className="w-3 h-3 rounded-full bg-blue-400/60" />
              <div className="w-3 h-3 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="bg-[#0a0a18] py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Find the Right Financial Solution for You
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We connect you to trusted financial providers based on your needs and what you qualify for — quickly and simply.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Personal Loans */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Personal Loans</h3>
              <p className="text-gray-400 text-sm mb-4">Access the funds you need to move forward. Whether you&apos;re dealing with an unexpected expense or planning something important.</p>
              <ul className="text-gray-400 text-sm space-y-1.5">
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Cover urgent expenses when life happens</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Consolidate smaller debts into one payment</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Fund important life moments</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Structured repayments you can manage</li>
              </ul>
            </div>

            {/* Debt Counselling */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Debt Counselling</h3>
              <p className="text-gray-400 text-sm mb-4">Take back control of your finances — without the overwhelm. Restructure your debt into something more manageable.</p>
              <ul className="text-gray-400 text-sm space-y-1.5">
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> One affordable monthly payment</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Protection from legal action by creditors</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> A clear plan to become debt-free</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Reduce stress and regain breathing room</li>
              </ul>
            </div>

            {/* Store Cards */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-blue-500/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Store Cards</h3>
              <p className="text-gray-400 text-sm mb-4">Flexible access to everyday essentials. Get what you need now and pay it off in a way that suits your budget.</p>
              <ul className="text-gray-400 text-sm space-y-1.5">
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Buy essentials when you need them most</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Spread payments over time</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Build or improve your credit profile</li>
                <li className="flex gap-2"><span className="text-blue-400 shrink-0">&#x2022;</span> Exclusive deals from partnered retailers</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="bg-[#0e0e1f] py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-12">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">1</div>
              <h3 className="text-white font-semibold text-lg mb-2">Tell Us About Your Needs</h3>
              <p className="text-gray-400 text-sm">Complete a quick and secure form with your basic details.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">2</div>
              <h3 className="text-white font-semibold text-lg mb-2">See What You Qualify For</h3>
              <p className="text-gray-400 text-sm">We match you to relevant financial solutions based on your profile.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold">3</div>
              <h3 className="text-white font-semibold text-lg mb-2">Get Connected</h3>
              <p className="text-gray-400 text-sm">We pass your details to trusted providers who can assist you further.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="bg-[#0a0a18] py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">About My Money Hub</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            We&apos;re people who understand how heavy money problems can feel — because we&apos;ve lived it. After years in the financial industry helping others find solutions, we saw a gap: people don&apos;t need more complexity… they need clarity.
          </p>
          <p className="text-gray-400 leading-relaxed mb-8">
            So we built a simple way to help you check what you qualify for and connect you to real financial solutions — quickly, honestly, and without judgment. Because sometimes all you need is one opportunity to change everything.
          </p>
          <p className="text-blue-400 font-semibold text-lg italic">
            &ldquo;Your situation doesn&apos;t define you — what you do next does.&rdquo;
          </p>
        </div>
      </section>

      {/* ===== WHY USE US (Mobile — also visible on desktop) ===== */}
      <section className="bg-[#0e0e1f] py-16 sm:py-20 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-10">Why Use Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "No complicated processes" },
              { icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", text: "No guesswork — just real options" },
              { icon: "M13 10V3L4 14h7v7l9-11h-7z", text: "Fast, simple, and secure" },
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", text: "Trusted providers only" },
              { icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", text: "No pressure, no obligation" },
            ].map((item) => (
              <div key={item.text} className="flex flex-col items-center gap-3 p-5 bg-white/5 border border-white/10 rounded-2xl text-center">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <p className="text-gray-300 text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="contact" className="bg-[#070711] border-t border-white/10 py-10 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <svg width="28" height="22" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polyline points="2,22 9,10 16,18" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <polyline points="16,18 23,6 30,14" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                <polyline points="26,6 30,6 30,10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
              <span className="text-white font-bold tracking-widest text-sm">MY MONEY</span>
              <div className="border border-white px-1.5 py-0.5">
                <span className="text-white font-bold tracking-widest text-sm">HUB</span>
              </div>
            </div>
            <div className="text-center md:text-right space-y-1">
              <p className="text-gray-400 text-sm">
                Your personal information is processed in accordance with POPIA.
              </p>
              <p className="text-gray-500 text-xs">
                <a href="#" className="text-blue-400/70 hover:text-blue-400 underline">Privacy Policy</a>
                {" "}&middot;{" "}
                <a href="#" className="text-blue-400/70 hover:text-blue-400 underline">Terms of Service</a>
              </p>
              <p className="text-gray-600 text-xs">&copy; {new Date().getFullYear()} My Money Hub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
