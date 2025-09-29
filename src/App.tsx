import { useEffect, useState } from "react";
import { fetchPlaces } from "./contentful/api";
import type { Place } from "./contentful/types";

export default function App() {
  const [items, setItems] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetchPlaces();
        setItems(res);
      } catch (e: any) {
        setErr(e?.message ?? "Failed to load places");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="p-6">Loading…</div>;
  if (err) return <div className="p-6 text-red-600">{err}</div>;

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Old Chicago — Contentful (place)</h1>

      {items.length === 0 ? (
        <p>No entries found. Publish your entries in Contentful.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((p) => (
            <li key={p.sys.id} className="border rounded p-4">
              <div className="flex items-start gap-4">
                {p.primaryMedia?.url && (
                  <img
                    src={p.primaryMedia.url}
                    alt={p.primaryMedia.title ?? ""}
                    className="h-24 w-24 object-cover rounded"
                  />
                )}
                <div>
                  <h2 className="text-lg font-semibold">{p.title}</h2>
                  <p className="text-sm opacity-80">
                    <strong>Slug:</strong> {p.slug || "—"}
                    {p.latitudeLongitude && (
                      <> • <strong>Loc:</strong> {p.latitudeLongitude.lat}, {p.latitudeLongitude.lon}</>
                    )}
                    {p.date && <> • <strong>Date:</strong> {new Date(p.date).toLocaleDateString()}</>}
                  </p>
                  {p.description && <p className="mt-2 text-sm">{p.description}</p>}
                </div>
              </div>

              <details className="mt-3">
                <summary className="cursor-pointer">More metadata</summary>
                <div className="mt-2 text-sm grid grid-cols-2 gap-x-6 gap-y-1">
                  <div><strong>Subject:</strong> {p.subject ?? "—"}</div>
                  <div><strong>Creator:</strong> {p.creator ?? "—"}</div>
                  <div><strong>Publisher:</strong> {p.publisher ?? "—"}</div>
                  <div><strong>MediaType:</strong> {p.mediaType ?? "—"}</div>
                  <div><strong>FormatType:</strong> {p.formatType ?? "—"}</div>
                  <div><strong>Identifier:</strong> {p.identifier ?? "—"}</div>
                  <div><strong>Source:</strong> {p.source ?? "—"}</div>
                  <div><strong>Language:</strong> {p.language ?? "—"}</div>
                  <div><strong>Coverage:</strong> {p.coverage ?? "—"}</div>
                  <div><strong>Rights:</strong> {p.rights ?? "—"}</div>
                  <div><strong>Collection:</strong> {p.collection ?? "—"}</div>
                </div>
              </details>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
