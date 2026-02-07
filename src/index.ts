import DOMPurifyFactory from 'dompurify';
import type { DOMPurify as DOMPurifyI } from 'dompurify';
import { JSDOM } from 'jsdom';

let window = new JSDOM('<!DOCTYPE html>').window;
let purify: DOMPurifyI = DOMPurifyFactory(window as unknown as Parameters<typeof DOMPurifyFactory>[0]);

// Proxy so `DOMPurify.method()` always delegates to the current instance
const DOMPurify: DOMPurifyI = new Proxy({} as DOMPurifyI, {
  get(_, prop) {
    const value = (purify as any)[prop];
    return typeof value === 'function' ? value.bind(purify) : value;
  },
});

export default DOMPurify;
export const sanitize = ((dirty: any, config?: any) => purify.sanitize(dirty, config)) as DOMPurifyI['sanitize'];
export const isSupported = DOMPurify.isSupported;
export const addHook = ((entryPoint: any, hookFunction: any) => purify.addHook(entryPoint, hookFunction)) as DOMPurifyI['addHook'];
export const removeHook = ((entryPoint: any) => purify.removeHook(entryPoint)) as DOMPurifyI['removeHook'];
export const removeHooks = ((entryPoint: any) => purify.removeHooks(entryPoint)) as DOMPurifyI['removeHooks'];
export const removeAllHooks = (() => purify.removeAllHooks()) as DOMPurifyI['removeAllHooks'];
export const setConfig = ((config: any) => purify.setConfig(config)) as DOMPurifyI['setConfig'];
export const clearConfig = (() => purify.clearConfig()) as DOMPurifyI['clearConfig'];
export const isValidAttribute = ((tag: any, attr: any, value: any) => purify.isValidAttribute(tag, attr, value)) as DOMPurifyI['isValidAttribute'];
export const version = DOMPurify.version;
export const removed: DOMPurifyI['removed'] = new Proxy([] as DOMPurifyI['removed'], {
  get(_, prop) {
    return Reflect.get(purify.removed, prop);
  },
});

export function clearWindow(): void {
  window.close();
  window = new JSDOM('<!DOCTYPE html>').window;
  purify = DOMPurifyFactory(window as unknown as Parameters<typeof DOMPurifyFactory>[0]);
}
