export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-500">
            Your personal information is processed in accordance with the
            Protection of Personal Information Act (POPIA).
          </p>
          <p className="text-sm text-gray-500">
            By submitting this form, you consent to the collection and
            processing of your data as outlined in our{" "}
            <a href="#" className="text-primary-600 underline hover:text-primary-800">
              Privacy Policy
            </a>
            .
          </p>
          <p className="text-xs text-gray-400 pt-2">
            &copy; {new Date().getFullYear()} LeadCapture. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
