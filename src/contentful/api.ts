import { contentful } from "./client";
import { GET_PLACES, GET_PLACE_BY_SLUG } from "./queries";
import type { Place, PlacesResponse, PlaceBySlugResponse } from "./types";

export async function fetchPlaces(limit = 200): Promise<Place[]> {
  const data = await contentful.request<PlacesResponse>(GET_PLACES, { limit });
  return data?.placeCollection?.items ?? [];
}

export async function fetchPlaceBySlug(slug: string): Promise<Place | null> {
  const data = await contentful.request<PlaceBySlugResponse>(GET_PLACE_BY_SLUG, { slug });
  return data?.placeCollection?.items?.[0] ?? null;
}
