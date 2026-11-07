/**
 * Single source of truth for VIX-SCAN business details.
 * Update these values once and they flow through the whole website, the
 * enquiry flow and the structured data in index.html.
 */
export const site = {
  brand: "VIX-SCAN",
  tagline: "Clear answers. Better vehicle decisions.",
  domain: "vix-scan.co.uk",
  url: "https://vix-scan.co.uk",
  email: "vix.scan@yahoo.com",
  phoneDisplay: "+44 7440 687650",
  phoneLink: "tel:+447440687650",
  whatsapp: "https://wa.me/447440687650",
  base: "Dalton-in-Furness, Cumbria",
  region: "Furness, Cumbria",
  areas: [
    "Dalton-in-Furness",
    "Barrow-in-Furness",
    "Ulverston",
    "Askam-in-Furness",
    "Walney Island",
    "Lindal-in-Furness",
    "Kirkby-in-Furness",
    "Millom",
  ],
  openingHours: "Appointments by arrangement, Monday to Saturday",
} as const;

export const mailtoLink = (subject: string, body = "") =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;
