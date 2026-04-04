import { Lead } from "@/types";

function escapeCSV(value: string | number | boolean | null): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export function generateCSV(leads: Lead[]): string {
  const headers = [
    "ID",
    "First Name",
    "Surname",
    "ID Number",
    "Monthly Income",
    "Consent Given",
    "IP Address",
    "UTM Source",
    "UTM Campaign",
    "Status",
    "Created At",
  ];

  const rows = leads.map((lead) =>
    [
      escapeCSV(lead.id),
      escapeCSV(lead.first_name),
      escapeCSV(lead.surname),
      escapeCSV(lead.id_number),
      escapeCSV(lead.monthly_income),
      escapeCSV(lead.consent_given),
      escapeCSV(lead.ip_address),
      escapeCSV(lead.utm_source),
      escapeCSV(lead.utm_campaign),
      escapeCSV(lead.status),
      escapeCSV(lead.created_at),
    ].join(",")
  );

  return [headers.join(","), ...rows].join("\n");
}
