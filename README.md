# Isomorphic DOMPurify
[![npm version](https://badge.fury.io/js/isomorphic-dompurify.svg)](https://badge.fury.io/js/isomorphic-dompurify)
[![Test Status](https://github.com/kkomelin/isomorphic-dompurify/actions/workflows/build_test.yml/badge.svg)](https://github.com/kkomelin/isomorphic-dompurify/actions/workflows/build_test.yml)
[![Bundlephobia Minified Size](https://badgen.net/bundlephobia/min/isomorphic-dompurify)](https://bundlephobia.com/result?p=isomorphic-dompurify)

The library makes it possible to seamlessly use [DOMPurify](https://github.com/cure53/DOMPurify) on server and client in the same way.
It does nothing by itself except providing an isomorthic/universal wrapper around DOMPurify, so all credits go to DOMPurify authors and contributors.

> DOMPurify - a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG. DOMPurify works with a secure default, but offers a lot of configurability and hooks. 
- [DOMPurify Demo](https://cure53.de/purify)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify/blob/master/README.md)

## Motivation

DOMPurify needs a DOM tree to base on, which is not available in Node by default. To work on the server side, we need a fake DOM to be created and supplied to DOMPurify. It means that DOMPurify initialization logic on server is not the same as on client.

This project was born with the idea of encapsulating DOMPurify initilization details and providing an easy way to import the library on both, server and client, for example in Next.js apps.

It was inspired by [Isomorphic Unfetch](https://github.com/developit/unfetch/tree/master/packages/isomorphic-unfetch).


## Installation

```shell_script
$ npm i isomorphic-dompurify
```

## Updates

Please note that DOMPurify library [doesn't follow Semantic Versioning](https://github.com/cure53/DOMPurify/issues/446#issuecomment-643761433), so we have to release every change as a minor version because we cannot be 100% sure whether new features are added to patch DOMPurify releases or not.

## Usage

1. Import the library:

```javascript
// Import as an ES6 module.
import DOMPurify from 'isomorphic-dompurify';

// Or as a CommonJS module.
const DOMPurify = require('isomorphic-dompurify');
```

2. Sanitize a string:

```javascript
var clean = DOMPurify.sanitize(dirty);
```

## Known Issues

1. [Can't resolve 'canvas' on Next.js serverless app](https://github.com/kkomelin/isomorphic-dompurify/issues/54) 
2. [Starting from 0.16.0, there is a dependency conflict which causes `ReferenceError: TextEncoder is not defined`](https://github.com/kkomelin/isomorphic-dompurify/issues/91)

## License

DOMPurify -
[Apache 2.0 or MPL 2.0](https://github.com/cure53/DOMPurify/blob/master/LICENSE)
© 2015 Mario Heiderich

Isomorphic DOMPurify - [MIT License](LICENSE) © 2020 [Konstantin Komelin](https://github.com/kkomelin) and [contributors](https://github.com/kkomelin/isomorphic-dompurify/graphs/contributors)
