import { JSDOM } from 'jsdom'
import { expect, test } from 'vitest'
import DOMPurify, { isSupported, sanitize, version } from '../src/index'

test('default export is a functional DOMPurify instance', () => {
  expect(typeof DOMPurify.sanitize).toBe('function')
  expect(DOMPurify.sanitize('<script>alert(1)</script>')).toBe('')
})

test('sanitize strips javascript: from href', () => {
  expect(sanitize(`<a href="javascript:alert('danger')">A link</a>`)).toBe(`<a>A link</a>`)
})

test('sanitize strips inline event handlers', () => {
  expect(sanitize(`<img onload="alert(1)" />`)).toBe(`<img>`)
})

test('sanitize passes config through to DOMPurify', () => {
  expect(sanitize('<b>bold</b><i>italic</i>', { ALLOWED_TAGS: ['b'] })).toBe('<b>bold</b>italic')
})

test('isSupported is true and version is defined', () => {
  expect(isSupported).toBe(true)
  expect(version).toMatch(/^\d+\.\d+\.\d+$/)
})

// Test for https://github.com/kkomelin/isomorphic-dompurify/issues/405
// Verifies that RETURN_DOM nodes can be compared with isEqualNode against nodes
// from a separate JSDOM context (e.g. a test framework's own JSDOM environment).
test('sanitize with RETURN_DOM returns a node comparable via isEqualNode with a node from a separate JSDOM context', () => {
  const html = '<b>hello</b>'

  // Simulate a user's separate DOM context (e.g. a test environment's JSDOM)
  const { window: userWindow } = new JSDOM('<!DOCTYPE html>')
  const dirtyBody = userWindow.document.createElement('body')
  dirtyBody.innerHTML = html

  const cleanBody = sanitize(html, { RETURN_DOM: true }) as Element

  // Should not throw even though the two nodes come from different JSDOM instances
  expect(() => cleanBody.isEqualNode(dirtyBody)).not.toThrow()
})
