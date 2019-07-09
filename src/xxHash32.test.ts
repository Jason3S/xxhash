import { expect } from 'chai';
import { xxHash32 } from './xxHash32';
import * as lorem from 'lorem-ipsum';
const xxh = require('xxhashjs');

const units: ('words' | 'sentences' | 'paragraphs')[] = ['words', 'sentences', 'paragraphs'];

describe('Validate xxHash32', () => {
    getSamples().forEach(({s, e}) =>
        it(`Test string: "${s.replace(/^(.{20}).*$/, '$1...')}"`, () => {
            const expected = e;
            const buffer = Buffer.from(s, 'utf8');
            const actual = xxHash32(buffer).toString(16);
            const expectedFromXxh = xxh.h32(buffer, 0).toString(16);
            expect(actual).to.be.equal(expected);
            expect(actual).to.be.equal(expectedFromXxh);
        })
    );

    for (let i = 0; i < 20; ++i) {
        const text = lorem({
            count: Math.floor(Math.random() * 20),
            units: units[i % 3],
        });
        it(`Test random string: "${text.slice(0, 30).replace(/^(.{20}).*$/, '$1...')}"`, () => {
            const actual = xxHash32(text).toString(16);
            const expected = xxh.h32(text, 0).toString(16);
            expect(actual).to.be.equal(expected);
        });
        it(`Test random string (as buffer): "${text.slice(0, 30).replace(/^(.{20}).*$/, '$1...')}"`, () => {
            const buffer = Buffer.from(text, 'utf8');
            const actual = xxHash32(buffer).toString(16);
            const expected = xxh.h32(buffer, 0).toString(16);
            expect(actual).to.be.equal(expected);
        });
    }
});

function getSamples() {
    return [
        { s: 'a',                   e: '550d7456'},
        { s: 'ab',                  e: '4999fc53'},
        { s: 'abc',                 e: '32d153ff'},
        { s: 'abcd',                e: 'a3643705'},
        { s: 'abcde',               e: '9738f19b'},
        { s: 'ab'.repeat(10),       e: '244fbf7c'},
        { s: 'abc'.repeat(100),     e: '55cad6be'},
        { s: 'My text to hash 😊',  e: 'af7fd356'},
    ];
}
