type DataLayerEvent = {
  event: string;
  [key: string]: unknown;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

export function pushToDataLayer(
  event: string,
  data?: Record<string, unknown>
): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}
