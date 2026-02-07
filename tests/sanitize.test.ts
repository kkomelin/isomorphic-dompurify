import { expect, test } from "vitest";
import DOMPurify, { sanitize, isSupported, version } from "../src/index";

test("default export is a functional DOMPurify instance", () => {
  expect(typeof DOMPurify.sanitize).toBe("function");
  expect(DOMPurify.sanitize("<script>alert(1)</script>")).toBe("");
});

test("sanitize strips javascript: from href", () => {
  expect(sanitize(`<a href="javascript:alert('danger')">A link</a>`)).toBe(`<a>A link</a>`);
});

test("sanitize strips inline event handlers", () => {
  expect(sanitize(`<img onload="alert(1)" />`)).toBe(`<img>`);
});

test("sanitize passes config through to DOMPurify", () => {
  expect(sanitize("<b>bold</b><i>italic</i>", { ALLOWED_TAGS: ["b"] })).toBe("<b>bold</b>italic");
});

test("isSupported is true and version is defined", () => {
  expect(isSupported).toBe(true);
  expect(version).toMatch(/^\d+\.\d+\.\d+$/);
});
