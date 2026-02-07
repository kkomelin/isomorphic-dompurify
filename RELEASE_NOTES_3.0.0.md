# isomorphic-dompurify v3.0.0-rc.2

## Memory Leak Fix for Long-Running Server Processes

New `clearWindow()` export that closes the internal jsdom window and creates a fresh one, preventing unbounded memory growth and progressive slowdown in long-running Node.js processes ([#368](https://github.com/kkomelin/isomorphic-dompurify/issues/368)).

```javascript
import { sanitize, clearWindow } from "isomorphic-dompurify";

// Call clearWindow() when you want to release accumulated DOM state,
// e.g. periodically, after a batch, or per-request in a server:
app.use((req, res, next) => {
  res.on("finish", () => clearWindow());
  next();
});
```

Note: `clearWindow()` is a no-op in the browser build (no jsdom to manage). Any hooks or config set via `addHook`/`setConfig` will need to be re-applied after calling it.

## ESM Support

The library now ships proper ESM alongside CommonJS. Both `import` and `require` work out of the box with correct module resolution.

```javascript
// ESM — now works natively
import DOMPurify, { sanitize } from "isomorphic-dompurify";

// CJS — still works
const DOMPurify = require("isomorphic-dompurify");
```

## Breaking Changes

- **Named exports are now available.** `sanitize`, `addHook`, `removeHook`, `removeHooks`, `removeAllHooks`, `setConfig`, `clearConfig`, `isValidAttribute`, `isSupported`, `version`, and `removed` are all exported directly.
- **`global.DOMPurify` singleton removed.** The library no longer writes to `global.DOMPurify`. Module caching provides singleton behavior in both ESM and CJS. This also fixes a security concern where malicious code could preempt the global before the module loaded ([#324](https://github.com/kkomelin/isomorphic-dompurify/issues/324)).
- **Build output moved to `dist/`.** Entry points are now `dist/index.js` (CJS), `dist/index.mjs` (ESM), `dist/browser.js` (CJS), `dist/browser.mjs` (ESM). The `exports` map handles this automatically — no changes needed for consumers using standard imports.
- **Type definitions are auto-generated.** The hand-written `index.d.ts` using `export = DOMPurify` is replaced by generated `.d.ts` and `.d.mts` files with proper `export default` and named exports.
- **Node.js version constraint tightened.** Now requires `^20.19.0 || ^22.12.0 || >=24.0.0` to match jsdom 28's requirements. Node 21.x, 23.x, and 22.0–22.11 are no longer allowed.

## Issues Fixed

- [#368](https://github.com/kkomelin/isomorphic-dompurify/issues/368) — Memory leak and progressive slowdown in long-running Node.js processes
- [#163](https://github.com/kkomelin/isomorphic-dompurify/issues/163) — ESM support
- [#324](https://github.com/kkomelin/isomorphic-dompurify/issues/324) — Security concern with `global.DOMPurify`
- [#353](https://github.com/kkomelin/isomorphic-dompurify/issues/353) — `lru-cache` ESM resolution errors in Nuxt/Nitro builds
- [#350](https://github.com/kkomelin/isomorphic-dompurify/issues/350) — Build error with Astro + Cloudflare adapter
- [#203](https://github.com/kkomelin/isomorphic-dompurify/issues/203) — Build error in Angular Universal

## Issues Mitigated

- [#330](https://github.com/kkomelin/isomorphic-dompurify/issues/330), [#349](https://github.com/kkomelin/isomorphic-dompurify/issues/349) — `createWindow` TypeError in Next.js 15 (jsdom is now external, reducing bundler conflicts)
- [#356](https://github.com/kkomelin/isomorphic-dompurify/issues/356) — `webidl-conversions` error in Node.js 22 + Next.js
- [#54](https://github.com/kkomelin/isomorphic-dompurify/issues/54) — `canvas` resolution error in serverless environments

## Internal Changes

- Source rewritten in TypeScript
- Build toolchain switched from terser to tsup (dual CJS/ESM output via esbuild)
- CI updated to `actions/checkout@v4`, `actions/setup-node@v4`, `pnpm/action-setup@v4`
- Tests converted to TypeScript with expanded coverage of the wrapper API
- Validated against Astro, Next.js, Nuxt, React, and SvelteKit via [isomorphic-dompurify-playgrounds](https://github.com/kkomelin/isomorphic-dompurify-playgrounds)
