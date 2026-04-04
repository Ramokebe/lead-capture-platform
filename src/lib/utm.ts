export function extractUTMParams(searchParams: URLSearchParams): {
  utmSource?: string;
  utmCampaign?: string;
} {
  const utmSource = searchParams.get("utm_source");
  const utmCampaign = searchParams.get("utm_campaign");

  return {
    utmSource: utmSource
      ? utmSource.replace(/[^a-zA-Z0-9_-]/g, "").substring(0, 100)
      : undefined,
    utmCampaign: utmCampaign
      ? utmCampaign.replace(/[^a-zA-Z0-9_-]/g, "").substring(0, 100)
      : undefined,
  };
}
