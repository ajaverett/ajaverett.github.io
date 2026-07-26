import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

test("exports a complete static resume", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /Alan J\. Averett/);
  assert.match(html, /Booz Allen Hamilton/);
  assert.match(
    html,
    /Hover a highlighted entity for a peek · click to expand/,
  );
  assert.match(html, /aria-label="Explore Alan J Averett"/);
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
  await access(new URL("alan-averett-resume.pdf", outputRoot));
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
  assert.match(pageSource, /kind: "video"/);
  assert.match(pageSource, /kind: "embed"/);
  assert.doesNotMatch(
    pageSource,
    /pushState|startViewTransition|CaseStudy|InfoStory/,
  );
  assert.match(css, /\.entity-trigger:hover/);
  assert.match(css, /\.peek-card/);
  assert.match(css, /\.detail-layer/);
  assert.match(css, /\.attachment-board/);
});
