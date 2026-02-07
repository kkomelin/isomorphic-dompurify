import DOMPurifyFactory from 'dompurify';
import type { DOMPurify as DOMPurifyI } from 'dompurify';
import { JSDOM } from 'jsdom';

const { window } = new JSDOM('<!DOCTYPE html>');
const DOMPurify: DOMPurifyI = DOMPurifyFactory(window as unknown as Parameters<typeof DOMPurifyFactory>[0]);

export default DOMPurify;
export const sanitize = DOMPurify.sanitize.bind(DOMPurify);
export const isSupported = DOMPurify.isSupported;
export const addHook = DOMPurify.addHook.bind(DOMPurify);
export const removeHook = DOMPurify.removeHook.bind(DOMPurify);
export const removeHooks = DOMPurify.removeHooks.bind(DOMPurify);
export const removeAllHooks = DOMPurify.removeAllHooks.bind(DOMPurify);
export const setConfig = DOMPurify.setConfig.bind(DOMPurify);
export const clearConfig = DOMPurify.clearConfig.bind(DOMPurify);
export const isValidAttribute = DOMPurify.isValidAttribute.bind(DOMPurify);
export const version = DOMPurify.version;
export const removed = DOMPurify.removed;
