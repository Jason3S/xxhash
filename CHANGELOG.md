# Changelog

## [3.0.0](https://github.com/Jason3S/xxhash/compare/v2.0.0...v3.0.0) (2023-10-16)


### ⚠ BREAKING CHANGES

* Export both CommonJS and ESM ([#417](https://github.com/Jason3S/xxhash/issues/417))

### Features

* Export both CommonJS and ESM ([#417](https://github.com/Jason3S/xxhash/issues/417)) ([e31e40c](https://github.com/Jason3S/xxhash/commit/e31e40c337f41d9c8199d4ff383b836f961710c8))

## Changelog

[2.0.0]
**BREAKING:** dropping support for node 12

The code should still run, but maintaining the tools to test on earlier versions of node is becoming too difficult to maintain.

[1.0.3]
- Do not publish source or map files.

[1.0.2]
- allow automatic conversion of strings to utf-8 before calculating the hash.

[1.0.1] Initial release.
