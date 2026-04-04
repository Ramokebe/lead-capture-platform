import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validation/schemas";
import { validateSAID } from "@/lib/validation/sa-id";
import { encrypt } from "@/lib/encryption";
import { rateLimit } from "@/lib/rate-limit";
import { sanitiseString } from "@/lib/sanitise";
import { createServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  // 1. Get IP address
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  // 2. Rate limit
  const { allowed, retryAfter } = rateLimit(ip);
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(retryAfter) },
      }
    );
  }

  // 3. Parse body
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body" },
      { status: 400 }
    );
  }

  // 4. Sanitise string inputs
  if (body.firstName) body.firstName = sanitiseString(body.firstName);
  if (body.surname) body.surname = sanitiseString(body.surname);
  if (body.utmSource) body.utmSource = sanitiseString(body.utmSource);
  if (body.utmCampaign) body.utmCampaign = sanitiseString(body.utmCampaign);

  // 5. Validate with Zod
  const result = leadFormSchema.safeParse(body);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }
    return NextResponse.json(
      { success: false, error: "Validation failed", fieldErrors },
      { status: 422 }
    );
  }

  const data = result.data;

  // 6. Server-side SA ID validation
  const idValidation = validateSAID(data.idNumber);
  if (!idValidation.valid) {
    return NextResponse.json(
      {
        success: false,
        error: "Validation failed",
        fieldErrors: { idNumber: idValidation.error || "Invalid ID number" },
      },
      { status: 422 }
    );
  }

  // 7. Encrypt ID number
  const encryptedId = encrypt(data.idNumber);

  // 8. Insert into Supabase
  try {
    const supabase = createServerClient();
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        first_name: data.firstName,
        surname: data.surname,
        id_number: encryptedId,
        monthly_income: data.monthlyIncome,
        consent_given: data.consentGiven,
        ip_address: ip === "unknown" ? null : ip,
        utm_source: data.utmSource || null,
        utm_campaign: data.utmCampaign || null,
        status: "new",
      })
      .select("id")
      .single();

    if (error) {
      console.error("Supabase insert error:", error.message);
      return NextResponse.json(
        { success: false, error: "Failed to save your information. Please try again." },
        { status: 500 }
      );
    }

    // Return first 8 chars of UUID as reference
    const reference = lead.id.substring(0, 8).toUpperCase();
    return NextResponse.json({ success: true, reference }, { status: 201 });
  } catch (err) {
    console.error("Server error:", err instanceof Error ? err.message : "Unknown");
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
