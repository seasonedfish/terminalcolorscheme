import { test, expect } from "vitest";
import { IncompleteColorSchemeError, TOMLError, fromAlacritty } from "../../src/main"

test("import Alacritty color scheme", () => {
    /* 
    zenbones_dark.toml

    MIT License

    Copyright (c) 2022 Michael Chris Lopez

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
const schemeText = `# This file is auto-generated by shipwright.nvim
[colors.bright]
black = "#403833"
red = "#E8838F"
green = "#8BAE68"
yellow = "#D68C67"
blue = "#61ABDA"
magenta = "#CF86C1"
cyan = "#65B8C1"
white = "#888F94"
[colors.cursor]
cursor = "#C4CACF"
text = "#1C1917"
[colors.normal]
black = "#1C1917"
blue = "#6099C0"
cyan = "#66A5AD"
green = "#819B69"
magenta = "#B279A7"
red = "#DE6E7C"
white = "#B4BDC3"
yellow = "#B77E64"
[colors.primary]
background = "#1C1917"
foreground = "#B4BDC3"
`
    const scheme = fromAlacritty(schemeText);
    expect(scheme.ansi.brightBlack).toEqual({r: 0x40, g: 0x38, b: 0x33});
});

test("invalid TOML throws TOMLError", () => {
    expect(() => fromAlacritty(":")).toThrowError(new TOMLError());
})

test("incomplete color scheme errors", () => {
    // expect(() => TerminalColorScheme.fromAlacritty("")).toThrowError(IncompleteColorSchemeError);

    const schemeText = `[colors.normal]
black = "#000000"
`
    expect(() => fromAlacritty(schemeText)).toThrowError(new IncompleteColorSchemeError());
})
