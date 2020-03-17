function r(m){return m && m.default || m;}
module.exports = global.DOMPurify = global.DOMPurify || (
	typeof process === 'undefined' ? r(require('dompurify')) : (function() {
    const DOMPurifyInitializer = r(require('dompurify'));
    const { JSDOM } = r(require('jsdom'));
    const { window } = new JSDOM('<!DOCTYPE html>');
    return DOMPurifyInitializer(window);
	})()
);