#!/usr/bin/env node

/**
 * Generates CSS custom properties from `school.config.json`
 * so Tailwind utilities can consume theme tokens at build time.
 */
const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const configPath = path.join(
  projectRoot,
  "src",
  "config",
  "school.config.json",
);
const outputPath = path.join(
  projectRoot,
  "src",
  "config",
  "generated-theme.css",
);

const config = JSON.parse(fs.readFileSync(configPath, "utf8"));

const serializeTokens = (tokens) =>
  Object.entries(tokens)
    .map(([token, value]) => `  --${token}: ${value};`)
    .join("\n");

const css = `:root {\n${serializeTokens(config.theme.light)}\n}\n.dark {\n${serializeTokens(
  config.theme.dark,
)}\n}\n`;

fs.writeFileSync(outputPath, css);
