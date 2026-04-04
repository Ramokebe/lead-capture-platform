"use client";

import { useEffect, useState } from "react";
import { Lead } from "@/types";

export default function LeadsTable() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const limit = 20;

  useEffect(() => {
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/admin/leads?page=${page}&limit=${limit}`
      );
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin/login";
          return;
        }
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setLeads(data.leads);
      setTotal(data.total);
    } catch {
      setError("Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const maskId = (id: string) => {
    if (id.length < 6) return id;
    return id.substring(0, 3) + "*".repeat(7) + id.substring(10);
  };

  const toggleReveal = (leadId: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(leadId)) {
        next.delete(leadId);
      } else {
        next.add(leadId);
      }
      return next;
    });
  };

  const totalPages = Math.ceil(total / limit);

  const statusColors: Record<string, string> = {
    new: "bg-blue-100 text-blue-800",
    qualified: "bg-green-100 text-green-800",
    submitted: "bg-yellow-100 text-yellow-800",
    declined: "bg-red-100 text-red-800",
  };

  if (loading && leads.length === 0) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchLeads}
          className="text-primary-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {total} total lead{total !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-x-auto shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Name</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">ID Number</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Income</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">UTM Source</th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-900">
                  {lead.first_name} {lead.surname}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleReveal(lead.id)}
                    className="font-mono text-gray-700 hover:text-primary-600"
                    title="Click to toggle"
                  >
                    {revealedIds.has(lead.id)
                      ? lead.id_number
                      : maskId(lead.id_number)}
                  </button>
                </td>
                <td className="px-4 py-3 text-gray-700">
                  R{Number(lead.monthly_income).toLocaleString("en-ZA")}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      statusColors[lead.status] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {lead.utm_source || "-"}
                </td>
                <td className="px-4 py-3 text-gray-500">
                  {new Date(lead.created_at).toLocaleDateString("en-ZA")}
                </td>
              </tr>
            ))}
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                  No leads yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1.5 text-sm border rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
