import { createRoot } from "react-dom/client";
import { VixScan } from "../../src/components/mockups/vix-scan/VixScan";
import "./site.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("The VIX-SCAN page root element is missing.");
}

createRoot(root).render(<VixScan />);
