import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { VixScan } from "./VixScan";
import "./site.css";

const container = document.getElementById("root");

if (!container) {
  throw new Error("VIX-SCAN root element is missing from index.html");
}

const app = (
  <StrictMode>
    <VixScan />
  </StrictMode>
);

// Production builds ship pre-rendered HTML, so hydrate. The dev server starts
// from an empty root, so fall back to a client render there.
if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
