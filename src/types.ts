export type Place = {
  slug: string;
  name: string;               // mapped from title
  lat: number;
  lng: number;
  // detail page fields
  title: string;
  subject?: string | null;
  description?: string | null;
  creator?: string | null;
  publisher?: string | null;
  date?: string | null;       // ISO
  mediaType?: "Image" | "Video" | null;
  formatType?: "Image/JPG" | "Image/PNG" | null;
  identifier?: string | null;
  source?: string | null;
  language?: "English" | null;
  coverage?: string | null;
  rights?: string | null;
  collection?: string | null;
  photoUrl?: string | null;   // primaryMedia.url
  latitude?: number | null;   // convenience for placepage.tsx
  longitude?: number | null;  // convenience for placepage.tsx
};
