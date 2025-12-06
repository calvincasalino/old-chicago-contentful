import type { Place as CFPlace } from "../contentful/types";
import type { Place as UIPlace } from "../types";

// Helper to force Contentful images to browser-safe formats
function optimizeContentfulImage(url: string | undefined): string | null {
  if (!url) return null;

  // Determine if we need '?' or '&' to start the query params
  const separator = url.includes("?") ? "&" : "?";

  // fm=jpg: Converts TIFF (and others) to JPEG
  // fl=progressive: Loads the JPEG in "waves" (blur to sharp) for better UX
  return `${url}${separator}fm=jpg&fl=progressive`;
}

export function mapCFPlaceToUI(p: CFPlace): UIPlace | null {
  if (!p) return null;

  const lat = p.latitudeLongitude?.lat ?? null;
  const lon = p.latitudeLongitude?.lon ?? null;

  return {
    slug: p.slug ?? p.title,      // fallback to title if slug missing
    name: p.title,
    lat: lat ?? 0,
    lng: lon ?? 0,

    title: p.title,
    subject: p.subject ?? null,
    description: p.description ?? null,
    creator: p.creator ?? null,
    publisher: p.publisher ?? null,
    date: p.date ?? null,
    mediaType: (p.mediaType as any) ?? null,
    formatType: (p.formatType as any) ?? null,
    identifier: p.identifier ?? null,
    source: p.source ?? null,
    language: (p.language as any) ?? null,
    coverage: p.coverage ?? null,
    rights: p.rights ?? null,
    collection: p.collection ?? null,
    
    // UPDATED: Now runs through the optimizer
    photoUrl: optimizeContentfulImage(p.primaryMedia?.url),
    
    latitude: lat,
    longitude: lon,
  };
}