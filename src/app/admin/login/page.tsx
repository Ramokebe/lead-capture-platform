import AdminLoginForm from "@/components/admin/AdminLoginForm";

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h1 className="text-xl font-bold text-gray-900 text-center mb-1">
            Admin Login
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter the admin password to continue
          </p>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
