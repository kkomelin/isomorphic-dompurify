if (typeof window !== "undefined") {
  module.exports =
    window.DOMPurify ||
    (window.DOMPurify = require("dompurify").default || require("dompurify"));
}
