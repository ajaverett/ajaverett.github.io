import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

test("exports a complete static resume", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /Alan J\. Averett/);
  assert.match(html, /Booz Allen Hamilton/);
  assert.match(html, /Click a blue employer to open its project story/);
  assert.match(html, /class="pdf-page"/);
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
