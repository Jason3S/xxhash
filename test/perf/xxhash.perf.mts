import { suite } from 'perf-insight';
import { xxHash32 } from 'js-xxhash';
import { h32 } from 'xxhashjs';
import { loremIpsum } from 'lorem-ipsum';
import xxhashWasm from 'xxhash-wasm';

const wordCount = [10, 100, 1000, 10000, 100000];

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
