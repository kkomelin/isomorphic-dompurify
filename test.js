'use strict';

const { sanitize } = require('./index');

test('DOMPurify removes unwanted JS from HTML anchor', () => {
  const dirty = `<a href="javascript:alert('danger')">A link</a>`;
  const factual = sanitize(dirty);
  const expected = `<a>A link</a>`;
  expect(factual).toBe(expected);
});

test('DOMPurify removes unwanted JS from HTML image', () => {
  const dirty = `<img onload="alert(1)" />`
  const factual = sanitize(dirty);
  const expected = `<img>`;
  expect(factual).toBe(expected);
});
