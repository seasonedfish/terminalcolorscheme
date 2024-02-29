import { test } from '@japa/runner';
import * as rgb_color from "../src/rgb_color";

test("create RgbColor from hex", ({ expect }) => {
    const color = rgb_color.fromHex("#4d5d53");
    expect(color.r).toBe(77);
    expect(color.g).toBe(93);
    expect(color.b).toBe(83);
});

test("create RgbColor from hex with low values", ({ expect }) => {
    const color = rgb_color.fromHex("#000f01");
    expect(color.r).toBe(0);
    expect(color.g).toBe(15);
    expect(color.b).toBe(1);
});

test("create RgbColor from hex without pound sign", ({ expect }) => {
    const color = rgb_color.fromHex("967bb6");
    expect(color.r).toBe(150);
    expect(color.g).toBe(123);
    expect(color.b).toBe(182);
});

test("inequality of two different RgbColors", ({ expect }) => {
    const color1 = rgb_color.fromHex("#8BC59C");
    const color2 = rgb_color.fromHex("#1F1F1F");
    expect(color1.r).not.toBe(color2.r);
    expect(color1.g).not.toBe(color2.g);
    expect(color1.b).not.toBe(color2.b);
    expect(color1).not.toEqual(color2);
});

