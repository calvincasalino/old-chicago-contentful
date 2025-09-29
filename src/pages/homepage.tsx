import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap } from "react-leaflet";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LatLngBounds } from "leaflet";
import { usePlaces } from "../hooks/usePlaces";
import type { Place } from "../types";

function FitToBounds({ points }: { points: Array<[number, number]> }) {
  const map = useMap();
  const bounds = useMemo(() => (points.length ? new LatLngBounds(points) : null), [points]);
  useEffect(() => { if (bounds) map.fitBounds(bounds.pad(0.2)); }, [bounds, map]);
  return null;
}

export default function HomeMapPage() {
  const navigate = useNavigate();
  const { data: places, loading, error } = usePlaces();

  const points = useMemo(
    () => (places ?? [])
      .filter((p): p is Place => Number.isFinite(p.lat) && Number.isFinite(p.lng))
      .map((p) => [p.lat, p.lng]) as Array<[number, number]>,
    [places]
  );

  return (
    <div className="page">
      <header className="header">
        <h1>Old Chicago</h1>
        <p>Click a dot to view historical photos from that location.</p>
      </header>

      <div className="map-wrap">
        <MapContainer className="map" center={[41.8781, -87.6298]} zoom={12} scrollWheelZoom>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {!!points.length && <FitToBounds points={points} />}

          {loading && <div className="p-3">Loading…</div>}
          {!!error && <div className="p-3 text-red-600">Failed to load.</div>}

          {(places ?? []).map(p => (
            <CircleMarker
              key={p.slug}
              center={[p.lat, p.lng]}
              radius={7}
              weight={2}
              opacity={1}
              fillOpacity={0.8}
              eventHandlers={{ click: () => navigate(`/place/${p.slug}`) }}
            >
              <Tooltip>{p.title}</Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
