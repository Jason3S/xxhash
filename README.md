# xxHash

Pure Javascript / Typescript Implementation of [xxHash](http://cyan4973.github.io/xxHash/)

This is an implementation for the
[XXH32 Algorithm](https://github.com/Cyan4973/xxHash/blob/dev/doc/xxhash_spec.md#xxh32-algorithm-description)
A 64-bit version might come a bit later.

## Why another version

- I needed a fast simple hash for short to medium sized strings.
- It needed to be pure JS.

## Installation

```
npm install --save js-xxhash
```

## Usage

### Pure JS

Uses an internal JS conversion of strings to a UTF-8 `Uint8Array`.
For higher performance consider using dedicated converters in the examples for Node and Browser below.

```typescript
import { xxHash32 } from 'js-xxhash';

let seed = 0;
let str = 'My text to hash 😊';
let hashNum = xxHash32(str, seed);
console.log(hashNum.toString(16));
```

Expected:

```
af7fd356
```

### Node JS

```typescript
import { xxHash32 } from 'js-xxhash';

let seed = 0;
let str = 'My text to hash 😊';
let hashNum = xxHash32(Buffer.from(str, 'utf8'), seed);
console.log(hashNum.toString(16));
```

### Browser

In a browser, you need to use a function or library to create a
[`Uint8Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)

Using [Browserify](http://browserify.org/) you can use it like this:

```typescript
import { xxHash32 } from 'js-xxhash';

let textEncoder = new TextEncoder(); // Note TextEncoder is experimental
let seed = 0;
let str = 'My text to hash 😊';
let hashNum = xxHash32(textEncoder.encode(str), seed);
console.log(hashNum.toString(16));
```
