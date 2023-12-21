function importModule(requiredModule) {
    return requiredModule && requiredModule.default || requiredModule;
}

function initDOMPurifyWithJSDOM() {
  const DOMPurifyInitializer = importModule(require('dompurify'));
  const { JSDOM } = importModule(require('jsdom'));
  const { window } = new JSDOM('<!DOCTYPE html>');
  return DOMPurifyInitializer(window);
}

function resolveDOMPurify() {
  const isClientSide = typeof window !== 'undefined';
  return isClientSide ? importModule(require('dompurify')) : initDOMPurifyWithJSDOM();
}

module.exports = global.DOMPurify = global.DOMPurify || resolveDOMPurify();
