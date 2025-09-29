export type Sys = { id: string };

export type Asset = {
  sys: Sys;
  title?: string | null;
  description?: string | null;
  url: string;
};

export type Location = {
  lat: number;
  lon: number;
};

export type Place = {
  sys: Sys;
  title: string;                 // required, unique
  subject?: string | null;       // Text
  description?: string | null;   // Text
  creator?: string | null;       // Text
  publisher?: string | null;     // Text
  date?: string | null;          // Date (ISO string from GraphQL)
  mediaType?: "Image" | "Video" | null;            // Symbol with validations
  formatType?: "Image/JPG" | "Image/PNG" | null;   // Symbol with validations
  identifier?: string | null;    // Text
  source?: string | null;        // Text
  language?: "English" | null;   // Symbol with validations
  coverage?: string | null;      // Text
  rights?: string | null;        // Text
  collection?: string | null;    // Text
  primaryMedia?: Asset | null;   // Link to Asset (single)
  latitudeLongitude?: Location | null; // Location
  slug?: string | null;          // Symbol (optional in your model)
};

export type PlacesResponse = {
  placeCollection: { items: Place[] };
};

export type PlaceBySlugResponse = {
  placeCollection: { items: Place[] };
};
