import { test } from '@japa/runner';
import * as rgb_color from "../src/rgb_color";

test("Create RgbColor from hex", ({ expect }) => {
    const color = rgb_color.fromHex("#4d5d53");
    expect(color.r).toBe(77);
    expect(color.g).toBe(93);
    expect(color.b).toBe(83);
});
