import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const distDir = path.resolve("dist");
const indexFile = path.join(distDir, "index.html");
const serverBundle = path.resolve(".ssr/entry-server.js");
const marker = '<div id="root"></div>';

const template = await fs.readFile(indexFile, "utf8");

if (!template.includes(marker)) {
  throw new Error(
    `Cannot pre-render: "${marker}" was not found in ${indexFile}.`,
  );
}

const { render } = await import(pathToFileURL(serverBundle).href);
const markup = render();

await fs.writeFile(
  indexFile,
  template.replace(marker, `<div id="root">${markup}</div>`),
  "utf8",
);

await fs.rm(path.resolve(".ssr"), { recursive: true, force: true });

console.log(
  `[prerender] Injected ${markup.length.toLocaleString()} characters of static HTML into dist/index.html`,
);
