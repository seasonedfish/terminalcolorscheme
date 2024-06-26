import { expect, test } from 'vitest'
import { fromHex, toHex } from "../src/main";

test("create RgbColor from hex", () => {
    const color = fromHex("#4d5d53");
    expect(color.r).toBe(77);
    expect(color.g).toBe(93);
    expect(color.b).toBe(83);
});

test("create RgbColor from hex with low values", () => {
    const color = fromHex("#000f01");
    expect(color.r).toBe(0);
    expect(color.g).toBe(15);
    expect(color.b).toBe(1);
});

test("create RgbColor from hex without pound sign", () => {
    const color = fromHex("967bb6");
    expect(color.r).toBe(150);
    expect(color.g).toBe(123);
    expect(color.b).toBe(182);
});

test("inequality of two different RgbColors", () => {
    const color1 = fromHex("#8BC59C");
    const color2 = fromHex("#1F1F1F");
    expect(color1.r).not.toBe(color2.r);
    expect(color1.g).not.toBe(color2.g);
    expect(color1.b).not.toBe(color2.b);
    expect(color1).not.toEqual(color2);
});

test("export to hex", () => {
    const color = {r: 113, g: 56, b: 6};
    expect(toHex(color)).toBe("#713806");
})
