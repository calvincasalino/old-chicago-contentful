import { useParams, Link } from "react-router-dom";
import { usePlace } from "../hooks/usePlace";
import "./place.css"; // scoped CSS for this page

type Row = readonly [label: string, value: string | null | undefined];
const row = (label: string, value: string | null | undefined): Row => [label, value] as const;

// Helper to format date into M/D/YYYY
function formatDate(value: string | null | undefined): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return value; // fallback: return raw string if invalid
  return d.toLocaleDateString("en-US", { year: "numeric", month: "numeric", day: "numeric" });
}

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

  // Build detail rows (Description handled separately)
  const rows: readonly Row[] = [
    row("Title", place.title),
    row("Subject", place.subject),
    row("Creator", place.creator),
    row("Publisher", place.publisher),
    row("Date", formatDate(place.date)),
    row("Type", place.mediaType),
    row("Format", place.formatType),
    row("Identifier", place.identifier),
    row("Source", place.source),
    row("Language", place.language),
    row("Coverage", place.coverage),
    row("Rights", place.rights),
    row("Collection", place.collection),
  ];

  return (
    <div className="place-root">
      <div className="page">
        {/* Back bar */}
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
          {/* LEFT: Photo */}
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
                <div className="photo placeholder">No image</div>
              )}
            </div>
          </section>

          {/* RIGHT: Unified details card */}
          <aside className="card details-card">
            {/* Description */}
            <section className="section">
              <h2 className="section-heading">Description</h2>
              <p className="body-text">{place.description || "—"}</p>
            </section>

            {/* Metadata */}
            <section className="section">
              <h3 className="section-heading">Details</h3>
              <dl className="meta-lines">
                {rows.map(([label, value]) => (
                  <div className="meta-row" key={label}>
                    <dt className="meta-label">{label}</dt>
                    <dd className="meta-value">{value || "—"}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
