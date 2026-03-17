import { JSDOM } from 'jsdom'
import { assert, expect, test } from 'vitest'

// import CreateDOMPurify from "dompurify"; // reference implementation
import CreateDOMPurify from '../src/index' // regression: default export must be callable as a factory

const domWindow = new JSDOM().window
const DOMPurify = CreateDOMPurify(new JSDOM().window)

// Regression test for https://github.com/kkomelin/isomorphic-dompurify/issues/405
// Verifies that RETURN_DOM + FORCE_BODY nodes can be compared via isEqualNode
// against nodes from a separate JSDOM context without throwing or returning false.
test('RETURN_DOM node is equal to dirty body from a separate JSDOM context', () => {
  const html = '<p>Text</p>'

  const dirtyBody = domWindow.document.createElement('body')
  dirtyBody.innerHTML = html

  const cleanBody = DOMPurify.sanitize(html, {
    FORCE_BODY: true,
    RETURN_DOM: true,
  }) as Node | HTMLBodyElement

  // Cannot use instanceof because HTML element classes are not supported in Node
  assert('tagName' in cleanBody, 'Unexpected lack of body')

  expect(cleanBody.isEqualNode(dirtyBody)).toBe(true)
})
