import { useParams, Link } from "react-router-dom";
import { usePlace } from "../hooks/usePlace";
import "./place.css"; // scoped CSS for this page

type Row = readonly [label: string, value: string | null | undefined];
const row = (label: string, value: string | null | undefined): Row => [label, value] as const;
const hasValue = (r: Row): r is readonly [string, string] => {
  const v = r[1];
  return typeof v === "string" && v.trim() !== "";
};

export default function PlacePage() {
  const { slug } = useParams();
  const { data: place, loading, error } = usePlace(slug);

  if (loading) {
    return (
      <div className="place-root">
        <div className="page">
          <div className="topbar"><span>Loading…</span></div>
          <header className="header"><h1 className="title-xl">Loading…</h1></header>
        </div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="place-root">
        <div className="page">
          <div className="topbar">
            <Link to="/" className="back">← Back</Link>
          </div>
          <header className="header">
            <h1 className="title-xl">Not found</h1>
            <p className="coords">We couldn’t find that item.</p>
          </header>
        </div>
      </div>
    );
  }

  const rows: readonly Row[] = [
    row("Title", place.title),
    row("Subject", place.subject),
    row("Description", place.description),
    row("Creator", place.creator),
    row("Publisher", place.publisher),
    row("Date", place.date),
    row("Type", place.mediaType),
    row("Format", place.formatType),
    row("Identifier", place.identifier),
    row("Source", place.source),
    row("Language", place.language),
    row("Coverage", place.coverage),
    row("Rights", place.rights),
    row("Collection", place.collection),
  ];

  const visibleRows = rows.filter(hasValue);

  const asideLabels = new Set<string>([
    "Publisher",
    "Date",
    "Identifier",
    "Rights",
    "Collection",
  ]);

  const mainRows = visibleRows.filter(([label]) => !asideLabels.has(label));
  const asideRows = visibleRows.filter(([label]) => asideLabels.has(label));

  return (
    <div className="place-root">
      <div className="page">
        <div className="topbar">
          <Link to="/" className="back">← Back to map</Link>
          {(place.latitude != null && place.longitude != null) && (
            <span className="coords">
              ({place.latitude.toFixed(5)}, {place.longitude.toFixed(5)})
            </span>
          )}
        </div>

        <header className="header">
          <h1 className="title-xl">{place.title ?? "(Untitled)"}</h1>
        </header>

        <div className="detail-grid">
          <div className="stack-16">
            <section className="card photo-card">
              <div className="photo-wrap">
                {place.photoUrl ? (
                  <img
                    src={place.photoUrl}
                    alt={place.title ?? "Item image"}
                    className="photo"
                    loading="lazy"
                  />
                ) : (
                  <div className="photo" style={{ display: "grid", placeItems: "center", color: "var(--muted)" }}>
                    No image
                  </div>
                )}
              </div>
            </section>

            <section className="card section">
              <h2 className="section-heading">Item Description</h2>
              <dl className="meta-lines">
                {mainRows.map(([label, value]) => (
                  <div className="meta-row" key={label}>
                    <dt className="meta-label"><strong>{label}</strong></dt>
                    <dd className="meta-value">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          <aside className="card aside stack-12">
            <div>
              <h3 className="section-heading">About this Item</h3>
              <p className="coords">
                Details provided by the source record. For rights/usage, contact the collection owner.
              </p>
            </div>

            <dl className="meta-lines" style={{ border: "none" }}>
              {asideRows.map(([label, value]) => (
                <div className="meta-row" key={label} style={{ borderBottom: "none", padding: 0 }}>
                  <dt className="meta-label"><strong>{label}</strong></dt>
                  <dd className="meta-value">{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </div>
    </div>
  );
}
