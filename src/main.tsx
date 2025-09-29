import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeMapPage from "./pages/homepage";
import PlacePage from "./pages/placepage";
import "./index.css";

// (Optional) Fix default marker icons in Vite/Leaflet
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// IMPORTANT for GitHub Pages subpath:
const router = createBrowserRouter(
  [
    { path: "/", element: <HomeMapPage /> },
    { path: "/place/:slug", element: <PlacePage /> },
  ],
  { basename: "/old-chicago-contentful" } // <-- your repo name
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
