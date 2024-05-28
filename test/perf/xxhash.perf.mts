import { suite } from 'perf-insight';
import { xxHash32 } from 'js-xxhash';
import { h32 } from 'xxhashjs';
import { loremIpsum } from 'lorem-ipsum';
import xxhashWasm from 'xxhash-wasm';
import assert from 'node:assert';

const xxWasm = (await xxhashWasm()).h32;

const wordCount = [10, 100, 1000, 10000, 100000];

suite('xxhash-short-strings', 'Evaluate xxhash performance with 10k short strings.', (test) => {
    const count = 10000;
    const words = loremIpsum({ count, units: 'words' }).split(' ');

    const testJsXxHash = () => {
        let h = 0;
        for (const word of words) {
            h += xxHash32(word, 42);
        }
        return h;
    };

    const testXxhashjs = () => {
        let h = 0;
        for (const word of words) {
            h += h32(word, 42).toNumber();
        }
        return h;
    };

    const testXxhashWasm = () => {
        let h = 0;
        for (const word of words) {
            h += xxWasm(word, 42);
        }
        return h;
    };

    const h0 = testJsXxHash();
    const h1 = testXxhashjs();
    const h2 = testXxhashWasm();

    assert(h0 == h1);
    assert(h1 == h2);

    test('js-xxhash string', testJsXxHash);
    test('xxhashjs string', testXxhashjs);
    test('xxhash-wasm string', testXxhashWasm);
});

// strings.
for (const count of wordCount) {
    suite(
        `xxhash-string-words-${count}`,
        `Evaluate xxhash performance with a string of ${count} words.`,
        async (test) => {
            const words = loremIpsum({ count, units: 'words' });
            const xxWasm = (await xxhashWasm()).h32;

            test('js-xxhash string', () => xxHash32(words, 42));
            test('xxhashjs string', () => h32(words, 42));
            test('xxhash-wasm string', () => xxWasm(words, 42));
        },
    ).setTimeout(count < 100 ? 1000 : 500);
}

// buffers.
for (const count of wordCount) {
    suite(
        `xxhash-buffer-words-${count}`,
        `Evaluate xxhash performance with a buffer containing a string of ${count} words.`,
        async (test) => {
            const words = loremIpsum({ count, units: 'words' });
            const buffer = Buffer.from(words);
            const xxWasm = (await xxhashWasm()).h32Raw;

            test('js-xxhash buffer', () => xxHash32(buffer, 42));
            test('xxhashjs buffer', () => h32(buffer, 42));
            test('xxhash-wasm buffer', () => xxWasm(buffer, 42));
        },
    ).setTimeout(count < 100 ? 1000 : 500);
}
