import { expect, test } from 'vitest'
import type { NodeHook as BrowserNodeHook } from '../src/browser'
import {
  addHook,
  type Config,
  type DocumentFragmentHook,
  type ElementHook,
  type HookName,
  type NodeHook,
  type RemovedAttribute,
  type RemovedElement,
  removeAllHooks,
  sanitize,
  type UponSanitizeAttributeHook,
  type UponSanitizeElementHook,
} from '../src/index'

test('hook types are re-exported and accepted by addHook', () => {
  const nodeHook: NodeHook = (currentNode) => {
    void currentNode
  }
  const elementHook: ElementHook = (currentNode) => {
    void currentNode
  }
  const fragmentHook: DocumentFragmentHook = (currentNode) => {
    void currentNode
  }
  const onElement: UponSanitizeElementHook = (currentNode, data) => {
    void currentNode
    void data.tagName
  }
  const onAttribute: UponSanitizeAttributeHook = (currentNode, data) => {
    void currentNode
    void data.attrName
  }

  const beforeElements: HookName = 'beforeSanitizeElements'
  const beforeAttributes: HookName = 'beforeSanitizeAttributes'
  const beforeShadow: HookName = 'beforeSanitizeShadowDOM'

  addHook(beforeElements as 'beforeSanitizeElements', nodeHook)
  addHook(beforeAttributes as 'beforeSanitizeAttributes', elementHook)
  addHook(beforeShadow as 'beforeSanitizeShadowDOM', fragmentHook)
  addHook('uponSanitizeElement', onElement)
  addHook('uponSanitizeAttribute', onAttribute)

  expect(sanitize('<b>ok</b>')).toBe('<b>ok</b>')
  removeAllHooks()
})

test('Config and Removed* types align with runtime API', () => {
  const config: Config = { ALLOWED_TAGS: ['b'] }
  expect(sanitize('<b>x</b><i>y</i>', config)).toBe('<b>x</b>y')

  const item: RemovedElement | RemovedAttribute = { element: {} as Node }
  expect(item).toBeDefined()
})

test('browser entry re-exports NodeHook as well', () => {
  const hook: BrowserNodeHook = (currentNode) => {
    void currentNode
  }
  expect(typeof hook).toBe('function')
})
