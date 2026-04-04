"use client";

const products = [
  {
    label: "Personal Loans",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    label: "Store Card",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
  {
    label: "Debt Consolidation",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    label: "Insurance",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

// Duplicate to create seamless infinite loop
const track = [...products, ...products];

export default function ProductCarousel() {
  return (
    <div className="w-full overflow-hidden" style={{ maxWidth: "min(384px, 100%)" }}>
      <style>{`
        @keyframes carousel-spin {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .carousel-track {
          animation: carousel-spin 8s linear infinite;
        }
        .carousel-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="flex carousel-track w-max">
        {track.map((product, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-2 px-2"
            style={{ width: "112px" }}
          >
            <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-blue-400 shrink-0 hover:bg-blue-600/30 hover:border-blue-500/40 transition-colors cursor-default">
              {product.icon}
            </div>
            <span className="text-xs text-gray-400 text-center leading-tight font-medium">
              {product.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
