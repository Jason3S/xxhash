import { expect } from 'chai';
import { toUtf16 } from './toUtf16.js';

describe('Validate toUtf16le', () => {
    getSamples().forEach((text) =>
        it('test conversion is correct', () => {
            const expected = Buffer.from(text, 'utf16le');
            expect(toString(toUtf16(text))).to.be.equal(text);
            expect(toUtf16(text)).to.be.deep.equal(expected);
        }),
    );
});

function toString(bytes: Uint8Array): string {
    const charCodes: number[] = [];

    for (let i = 0; i < bytes.length; i++) {
        charCodes.push(bytes[i] | (bytes[++i] << 8));
    }

    return String.fromCharCode(...charCodes);
}

function getSamples() {
    return ['❤️', 'hello', 'a', 'á ä £ ™ ¢', '', 'नी ›', 'My text to convert 😊'];
}
