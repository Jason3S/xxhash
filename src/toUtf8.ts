export function toUtf8_1(text: string): Uint8Array {
    const bytes: number[] = [];
    const w = new Array<number>(4);
    const h = [0x00, 0xc0, 0xe0, 0xf0];
    const m = [0x7f, 0x3f, 0x3f, 0x3f];
    const p = [0x00, 0x80, 0x80, 0x80];
    for (const char of text) {
        const b = w;
        const cp = char.codePointAt(0)!;

        const n = 0
                 - ((-(cp & 0xffffff80) >> 31))
                 - ((-(cp & 0xfffff800) >> 31))
                 - ((-(cp & 0xffff0000) >> 31));

        const z = m[n];
        const y = p[n];
        b[3] = y | (cp & z);
        b[2] = y | ((cp >>>  6) & z);
        b[1] = y | ((cp >>> 12) & z);
        b[0] = y | ((cp >>> 18) & z);
        const s = 3 - n;
        b[s] |= h[n];

        Array.prototype.push.apply(bytes, b.slice(s));
    }
    return new Uint8Array(bytes);
}

export function toUtf8_2(text: string): Uint8Array {
    const bytes: number[] = [];
    for (const char of text) {
        const cp = char.codePointAt(0)!;
        if (cp < 0x80) {
            bytes.push(cp);
        } else if (cp < 0x800) {
            bytes.push(
                0xC0 | ((cp >> 6) & 0x1f),
                0x80 | cp & 0x3f);
        } else if (cp < 0x10000) {
            bytes.push(
                0xe0 | ((cp >> 12) & 0xf),
                0x80 | (cp >> 6) & 0x3f,
                0x80 | cp & 0x3f);
        } else {
            bytes.push(
                0xf0 | ((cp >> 18) & 0x7),
                0x80 | (cp >> 12) & 0x3f,
                0x80 | (cp >> 6) & 0x3f,
                0x80 | cp & 0x3f);
        }
    }
    return new Uint8Array(bytes);
}

/**
 * Convert text to UTF-8 byte array.
 * @param text text to be converted to utf-8 bytes
 * Note: this one seems to be the fastest based upon perf tests.
 */
export function toUtf8_3(text: string): Uint8Array {
    const bytes: number[] = [];
    for (let i = 0, n = text.length; i < n; ++i) {
        const c = text.charCodeAt(i);
        if (c < 0x80) {
            bytes.push(c);
        } else if (c < 0x800) {
            bytes.push(
                0xC0 | c >> 6,
                0x80 | c & 0x3f);
        } else if (c < 0xd800 || c >= 0xe000) {
            bytes.push(
                0xe0 | c >> 12,
                0x80 | (c >> 6) & 0x3f,
                0x80 | c & 0x3f);
        } else {
            let cp = 0x10000 + ((c & 0x3ff) << 10 | (text.charCodeAt(++i) & 0x3ff));
            bytes.push(
                0xf0 | ((cp >> 18) & 0x7),
                0x80 | (cp >> 12) & 0x3f,
                0x80 | (cp >> 6) & 0x3f,
                0x80 | cp & 0x3f);
        }
    }
    return new Uint8Array(bytes);
}

export const toUtf8 = toUtf8_3;

export default toUtf8;
