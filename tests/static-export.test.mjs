import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

test("exports a complete static resume", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /AJ Averett/);
  assert.match(html, /Booz Allen Hamilton/);
  assert.match(
    html,
    /Hover a highlighted entity for a peek · click to expand/,
  );
  assert.match(html, /aria-label="Explore AJ Averett"/);
  assert.match(html, /aj-averett-resume\.pdf/);
  assert.match(html, /Print or save the résumé as a PDF/);
  assert.doesNotMatch(html, /Original PDF|href="\/alan-averett-resume\.pdf"/);
  assert.match(
    html,
    /aria-label="Explore Brigham Young University–Idaho"/,
  );
  assert.match(html, /aria-label="Explore Data Science, Statistics"/);
  assert.match(
    html,
    /aria-label="Explore Soc of Hispanic Professional Engineer Scholarship"/,
  );
  assert.match(html, /aria-label="Explore Salt Lake City, UT"/);
  assert.match(html, /class="pdf-page"/);
  assert.match(html, /class="pdf-list-bullet"/);
  assert.match(html, /QPAS technical standards to ~76 stakeholders/);
  assert.match(html, /Wilford Woodruff Papers Foundation/);
  assert.match(html, /id="volunteer">Volunteer/);
  assert.match(html, /Database Administrator/);
  assert.match(html, /County-Level Civic Engagement Organization/);
  assert.match(html, /May 2026 - Present/);
  assert.match(html, /Idaho Falls, ID/);
  assert.match(html, /Saratoga Springs, UT/);
  assert.doesNotMatch(html, /aria-label="Explore Idaho Falls, ID"/);
  assert.doesNotMatch(html, /aria-label="Explore Saratoga Springs, UT"/);
  assert.match(html, /Administered Neon CRM, maintaining constituent records/);
  assert.match(html, /Imported, cleaned, deduplicated, and standardized contact/);
  assert.match(html, /Protected sensitive information through access controls/);
  assert.match(html, /R’s tidyverse/);
  assert.match(html, /Python\/R/);
  assert.match(html, /https:\/\/ajaverett\.github\.io\/og-v2\.png/);
  assert.doesNotMatch(
    html,
    /#work\/|Interactive document|chatgpt\.site|codex-preview/i,
  );
});

test("includes static assets needed by GitHub Pages", async () => {
  const assetEntries = await readdir(new URL("_next/static/", outputRoot));

  assert.ok(assetEntries.length > 0);
  await access(new URL("og-v2.png", outputRoot));
  await assert.rejects(access(new URL(".openai/hosting.json", projectRoot)));
});

test("uses one entity interaction system without routed pages", async () => {
  const [pageSource, css] = await Promise.all([
    readFile(new URL("app/page.tsx", projectRoot), "utf8"),
    readFile(new URL("app/globals.css", projectRoot), "utf8"),
  ]);

  assert.match(pageSource, /function EntityTrigger/);
  assert.match(pageSource, /function PeekCard/);
  assert.match(pageSource, /function DetailCanvas/);
  assert.match(pageSource, /function AttachmentRenderer/);
  assert.match(pageSource, /className="pdf-page-frame"/);
  assert.match(pageSource, /className="pdf-page-content"/);
  assert.match(pageSource, /--resume-content-width/);
  assert.match(pageSource, /iteration < 14/);
  assert.match(pageSource, /kind: "video"/);
  assert.match(pageSource, /kind: "embed"/);
  assert.match(pageSource, /runSurfaceTransition/);
  assert.match(pageSource, /document\.startViewTransition/);
  assert.match(pageSource, /window\.print\(\)/);
  assert.doesNotMatch(
    pageSource,
    /pushState|CaseStudy|InfoStory/,
  );
  assert.match(css, /\.entity-trigger:hover/);
  assert.doesNotMatch(css, /\.entity-trigger(?::hover|:focus-visible|--active)?::after/);
  assert.match(css, /--resume-serif: "Times New Roman"/);
  assert.match(css, /font-family: var\(--resume-serif\)/);
  assert.match(css, /aspect-ratio: 8\.5 \/ 11/);
  assert.match(css, /height: 11in/);
  assert.match(css, /\.pdf-page-frame/);
  assert.match(css, /scale\(var\(--resume-page-scale\)\)/);
  assert.doesNotMatch(css, /\bzoom:/);
  assert.match(css, /"company location"\s+"title dates"/);
  assert.match(css, /grid-area: title/);
  assert.match(css, /grid-area: dates/);
  assert.match(css, /width: var\(--resume-content-width\)/);
  assert.match(css, /scale\(var\(--resume-content-scale\)\)/);
  assert.match(css, /transform-origin: top left/);
  assert.match(css, /-webkit-text-size-adjust: none/);
  assert.match(css, /text-size-adjust: none/);
  assert.match(css, /\.peek-card/);
  assert.match(css, /\.detail-layer/);
  assert.match(css, /\.attachment-board/);
  assert.match(css, /view-transition-name: entity-surface/);
  assert.match(css, /::view-transition-group\(entity-surface\)/);
});
