import assert from 'node:assert';
import { describe, test } from 'node:test';

import { xxHash32 } from 'js-xxhash';

describe('xxHash32', () => {
    getSamples().forEach(({ s, e }) =>
        test(`Test string: "${s.replace(/^(.{20}).*$/, '$1...')}"`, () => {
            const expected = e;
            const buffer = Buffer.from(s, 'utf8');
            const actual = xxHash32(buffer).toString(16);
            assert.equal(actual, expected);
        }),
    );
});

function getSamples() {
    return [
        { s: 'a', e: '550d7456' },
        { s: 'ab', e: '4999fc53' },
        { s: 'abc', e: '32d153ff' },
        { s: 'abcd', e: 'a3643705' },
        { s: 'abcde', e: '9738f19b' },
        { s: 'ab'.repeat(10), e: '244fbf7c' },
        { s: 'abc'.repeat(100), e: '55cad6be' },
        { s: 'My text to hash 😊', e: 'af7fd356' },
    ];
}
