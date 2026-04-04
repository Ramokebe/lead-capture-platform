import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  // Verify auth
  const token = request.cookies.get("admin_session")?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse query params
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
  const offset = (page - 1) * limit;

  const supabase = createServerClient();

  let query = supabase
    .from("leads")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status) {
    query = query.eq("status", status);
  }

  const { data: leads, error, count } = await query;

  if (error) {
    console.error("Fetch leads error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }

  // Decrypt ID numbers for admin view
  const decryptedLeads = (leads || []).map((lead) => {
    try {
      return { ...lead, id_number: decrypt(lead.id_number) };
    } catch {
      return { ...lead, id_number: "[DECRYPTION ERROR]" };
    }
  });

  return NextResponse.json({
    leads: decryptedLeads,
    total: count || 0,
    page,
    limit,
  });
}
