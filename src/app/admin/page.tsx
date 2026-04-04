import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth";
import LeadsTable from "@/components/admin/LeadsTable";
import ExportButton from "@/components/admin/ExportButton";

export default async function AdminPage() {
  const cookieStore = cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token || !(await verifySessionToken(token))) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-bold text-gray-900">Lead Management</h1>
          <div className="flex items-center gap-3">
            <ExportButton />
            <a
              href="/api/admin/login"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Logout
            </a>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <LeadsTable />
      </main>
    </div>
  );
}
