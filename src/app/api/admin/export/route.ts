import { NextRequest, NextResponse } from "next/server";
import { verifySessionToken } from "@/lib/auth";
import { decrypt } from "@/lib/encryption";
import { generateCSV } from "@/lib/csv";
import { createServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  // Verify auth
  const token = request.cookies.get("admin_session")?.value;
  if (!token || !(await verifySessionToken(token))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createServerClient();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }

  // Decrypt ID numbers for export
  const decryptedLeads = (leads || []).map((lead) => {
    try {
      return { ...lead, id_number: decrypt(lead.id_number) };
    } catch {
      return { ...lead, id_number: "[DECRYPTION ERROR]" };
    }
  });

  const csv = generateCSV(decryptedLeads);
  const date = new Date().toISOString().split("T")[0];

  return new NextResponse(csv, {
    status: 200,
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": `attachment; filename=leads-export-${date}.csv`,
    },
  });
}
