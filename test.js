'use strict';

const { sanitize } = require('./index');

const dirty = `<a href="javascript:alert('danger')">A link</a>`;

test('DOMPurify sanitizes HTML', () => {
  const factual = sanitize(dirty);
  const expected = `<a>A link</a>`;
  expect(factual).toBe(expected);
});
