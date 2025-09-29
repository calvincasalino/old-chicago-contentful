import type { Place as CFPlace } from "../contentful/types";
import type { Place as UIPlace } from "../types";

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
    photoUrl: p.primaryMedia?.url ?? null,
    latitude: lat,
    longitude: lon,
  };
}
