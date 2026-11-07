import { renderToString } from "react-dom/server";
import { VixScan } from "./VixScan";

/**
 * Used at build time by scripts/prerender.mjs so the deployed page ships real
 * HTML (better first paint, SEO and no-JS resilience) and then hydrates.
 */
export function render(): string {
  return renderToString(<VixScan />);
}
