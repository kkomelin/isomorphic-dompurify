# Isomorphic DOMPurify

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

## Supported Environments

The library is aimed to work **everywhere** and has been tested (manually) in the following environments:
- Node.js, CommonJS
- Node.js, Webpack, ES6
- React.js without SSR
- Next.js without SSR
- Next.js with SSR

## License

DOMPurify -
[Apache 2.0 or MPL 2.0](https://github.com/cure53/DOMPurify/blob/master/LICENSE)
© 2015 Mario Heiderich

Isomorphic DOMPurify - [MIT License](LICENSE.md) © 2020 [Konstantin Komelin](https://github.com/kkomelin)
