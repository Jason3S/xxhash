import { suite } from 'perf-insight';
import { loremIpsum } from 'lorem-ipsum';

import { toUtf8, toUtf8_1, toUtf8_2, toUtf8_3 } from './toUtf8.js';

const wordCount = [10, 100, 1000, 10000, 100000];

for (const count of wordCount) {
    const innerTestIterations = Math.max(100 / count, 1);

    suite(`utf8-encoding-${count}`, `Evaluate encoding ${count} words.`, (test) => {
        const words = loremIpsum({ count, units: 'words' });
        const iterations = innerTestIterations;
        const textEncoder = new TextEncoder();

        const testMethod = (fn: (s: string) => unknown) => {
            for (let i = iterations; i > 0; --i) {
                fn(words);
            }
        };

        test('toUtf8', () => testMethod(toUtf8));
        test('toUtf8_1', () => testMethod(toUtf8_1));
        test('toUtf8_2', () => testMethod(toUtf8_2));
        test('toUtf8_3', () => testMethod(toUtf8_3));
        test('Buffer.from', () => testMethod(Buffer.from));
        test('TextEncoder', () => testMethod(textEncoder.encode.bind(textEncoder)));
    });
}
