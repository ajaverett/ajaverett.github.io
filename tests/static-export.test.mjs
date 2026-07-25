import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

test("exports a complete static resume", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /Alan J\. Averett/);
  assert.match(html, /Booz Allen Hamilton/);
  assert.match(html, /Hover a blue name and watch the page come alive/);
  assert.match(html, /title="Open About Alan J Averett"/);
  assert.match(html, /title="Open education details for Brigham Young University–Idaho"/);
  assert.match(html, /title="Open scholarship details"/);
  assert.match(html, /class="pdf-page"/);
  assert.match(html, /class="pdf-list-bullet"/);
  assert.match(html, /Soc of Hispanic Professional Engineer Scholarship/);
  assert.match(html, /QPAS technical standards to ~76 stakeholders/);
  assert.match(html, /Wilford Woodruff Papers Foundation/);
  assert.match(html, /id="volunteer">Volunteer/);
  assert.match(html, /Database Administrator/);
  assert.match(html, /County-Level Civic Engagement Organization/);
  assert.match(html, /May 2026 - Present/);
  assert.match(html, /Administered Neon CRM, maintaining constituent records/);
  assert.match(html, /Imported, cleaned, deduplicated, and standardized contact/);
  assert.match(html, /Protected sensitive information through access controls/);
  assert.doesNotMatch(html, /Interactive document/);
  assert.match(html, /R’s tidyverse/);
  assert.match(html, /Python\/R/);
  assert.match(html, /https:\/\/ajaverett\.github\.io\/og\.png/);
  assert.doesNotMatch(html, /chatgpt\.site|codex-preview/i);
});

test("includes static assets needed by GitHub Pages", async () => {
  const assetEntries = await readdir(new URL("_next/static/", outputRoot));

  assert.ok(assetEntries.length > 0);
  await access(new URL("og.png", outputRoot));
  await access(new URL("alan-averett-resume.pdf", outputRoot));
  await assert.rejects(access(new URL(".openai/hosting.json", projectRoot)));
});

test("connects the hover world to the expanded destination", async () => {
  const [pageSource, css] = await Promise.all([
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/globals.css", projectRoot), "utf8"),
  ]);

  assert.match(pageSource, /viewTransitionName: "theme-world"/);
  assert.match(pageSource, /openFromPreview/);
  assert.match(pageSource, /case-hero case-hero--expanded/);
  assert.doesNotMatch(pageSource, /setHoverPreview\(null\)/);
  assert.match(css, /::view-transition-group\(theme-world\)/);
  assert.match(css, /\.case-theme-world\.immersive-world/);
});
