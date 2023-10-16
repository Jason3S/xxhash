import { expect } from 'chai';
import { toUtf8, toUtf8_1, toUtf8_2, toUtf8_3 } from './toUtf8.js';

import { loremIpsum as lorem } from 'lorem-ipsum';

const units: ('words' | 'sentences' | 'paragraphs')[] = ['words', 'sentences', 'paragraphs'];

describe('Validate toUtf8', () => {
    getSamples().forEach((s) =>
        it(`Test string: "${s.replace(/^(.{20}).*$/, '$1...')}"`, () => {
            const expected = Buffer.from(s, 'utf8');
            const actual = toUtf8(s);
            expect(actual).to.deep.equal(expected);
            expect(toUtf8_1(s)).to.deep.equal(expected);
            expect(toUtf8_2(s)).to.deep.equal(expected);
            expect(toUtf8_3(s)).to.deep.equal(expected);
        }),
    );

    for (let i = 0; i < 0; ++i) {
        const text = lorem({
            count: Math.floor(Math.random() * 20),
            units: units[i % 3],
        });
        it(`Test random string: "${text.slice(0, 30).replace(/^(.{20}).*$/, '$1...')}"`, () => {
            const expected = Buffer.from(text, 'utf8');
            const actual = toUtf8(text);
            expect(actual).to.deep.equal(expected);
            expect(toUtf8_1(text)).to.deep.equal(expected);
            expect(toUtf8_2(text)).to.deep.equal(expected);
            expect(toUtf8_3(text)).to.deep.equal(expected);
        });
    }
});

function getSamples() {
    return ['a', 'á ä £ ™ ¢', '', 'नी ›', 'My text to hash 😊'];
}
