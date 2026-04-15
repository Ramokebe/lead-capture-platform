import Link from "next/link";

export default function SuccessPage({
  searchParams,
}: {
  searchParams: { ref?: string };
}) {
  const reference = searchParams.ref;

  return (
    <div className="min-h-screen bg-[#0e0e1f] flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-white mb-2">Application Submitted!</h1>
        <p className="text-gray-400 text-sm mb-8">
          Thank you for choosing <span className="text-white font-semibold">My Money Hub</span>. We have received your details and will be in touch soon.
        </p>

        {reference && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-sm text-gray-500 mb-1">Your Reference Number</p>
            <p className="text-3xl font-bold text-white tracking-widest">{reference}</p>
            <p className="text-xs text-gray-600 mt-2">Keep this for your records</p>
          </div>
        )}

        <div className="bg-blue-600/10 border border-blue-500/20 rounded-2xl p-6 mb-8 text-left">
          <h2 className="font-semibold text-white mb-3">What Happens Next?</h2>
          <ol className="text-sm text-gray-400 space-y-2">
            <li className="flex gap-2">
              <span className="font-bold text-blue-400 shrink-0">1.</span>
              We review your details against available offers
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-400 shrink-0">2.</span>
              You will be matched with suitable financial products
            </li>
            <li className="flex gap-2">
              <span className="font-bold text-blue-400 shrink-0">3.</span>
              A consultant may contact you with your options
            </li>
          </ol>
        </div>

        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm font-medium">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
