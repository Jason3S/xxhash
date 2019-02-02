
export function toUtf16(text: string): Uint8Array {
    const limit = text.length * 2;
    const bytes = new Uint8Array(limit);
    for (let i = 0; i < limit; i++) {
        const v = text.charCodeAt(i >> 1);
        bytes[i++] = v;
        bytes[i] = v >> 8;
    }
    return bytes;
}

export default toUtf16;
