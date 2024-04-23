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

Internally it uses [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) to convert strings to a UTF-8 `Uint8Array`s.

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
let hashNum = xxHash32(str, seed);
console.log(hashNum.toString(16));
```

### Browser

```typescript
// Using a bundler
import { xxHash32 } from 'js-xxhash';
// Using a CDN like jsDelivr
import { xxHash32 } from 'https://cdn.jsdelivr.net/npm/js-xxhash@{version}/index.mjs';

let seed = 0;
let str = 'My text to hash 😊';
let hashNum = xxHash32(str, seed);
console.log(hashNum.toString(16));
```

# Performance

To evaluate performance this package was compared to:

- [xxhashjs](https://www.npmjs.com/package/xxhashjs)
- [xxhash-wasm](https://www.npmjs.com/package/xxhash-wasm)

One average a lorem-ipsum "word" is between 5 and 6 characters.

## Performance for Strings

```
Running Perf Suite: xxhash-string-words-10
Evaluate xxhash performance with a string of 10 words.
✔ js-xxhash string       731_148.14 ops/sec
✔ xxhashjs string        432_753.87 ops/sec
✔ xxhash-wasm string   3_381_907.91 ops/sec

Running Perf Suite: xxhash-string-words-100
Evaluate xxhash performance with a string of 100 words.
✔ js-xxhash string       420_458.19 ops/sec
✔ xxhashjs string        124_443.56 ops/sec
✔ xxhash-wasm string   2_289_457.63 ops/sec

Running Perf Suite: xxhash-string-words-1000
Evaluate xxhash performance with a string of 1000 words.
✔ js-xxhash string        74_861.33 ops/sec
✔ xxhashjs string         16_656.57 ops/sec
✔ xxhash-wasm string     729_339.20 ops/sec

Running Perf Suite: xxhash-string-words-10000
Evaluate xxhash performance with a string of 10000 words.
✔ js-xxhash string         6_293.40 ops/sec
✔ xxhashjs string            551.90 ops/sec
✔ xxhash-wasm string      90_170.30 ops/sec

Running Perf Suite: xxhash-string-words-100000
Evaluate xxhash performance with a string of 100000 words.
✔ js-xxhash string           709.30 ops/sec
✔ xxhashjs string             40.05 ops/sec
✔ xxhash-wasm string       8_093.17 ops/sec
```

### Performance with a Uint8Array Buffer

```
Running Perf Suite: xxhash-buffer-words-10
Evaluate xxhash performance with a buffer containing a string of 10 words.
✔ js-xxhash buffer       2_859_850.03 ops/sec
✔ xxhashjs buffer          699_053.22 ops/sec
✔ xxhash-wasm buffer     3_657_504.67 ops/sec

Running Perf Suite: xxhash-buffer-words-100
Evaluate xxhash performance with a buffer containing a string of 100 words.
✔ js-xxhash buffer         800_609.77 ops/sec
✔ xxhashjs buffer          402_424.91 ops/sec
✔ xxhash-wasm buffer     2_569_294.66 ops/sec

Running Perf Suite: xxhash-buffer-words-1000
Evaluate xxhash performance with a buffer containing a string of 1000 words.
✔ js-xxhash buffer         79_925.04 ops/sec
✔ xxhashjs buffer          55_568.13 ops/sec
✔ xxhash-wasm buffer      753_856.33 ops/sec

Running Perf Suite: xxhash-buffer-words-10000
Evaluate xxhash performance with a buffer containing a string of 10000 words.
✔ js-xxhash buffer          8_152.57 ops/sec
✔ xxhashjs buffer           6_046.82 ops/sec
✔ xxhash-wasm buffer      104_463.50 ops/sec

Running Perf Suite: xxhash-buffer-words-100000
Evaluate xxhash performance with a buffer containing a string of 100000 words.
✔ js-xxhash buffer            458.33 ops/sec
✔ xxhashjs buffer             602.90 ops/sec
✔ xxhash-wasm buffer        9_835.61 ops/sec
```
