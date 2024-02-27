import toml from "toml";
import * as rgbColor from "./rgbColor.js";
import RgbColor from "./rgbColor.js";

export interface Ansi {
    black: RgbColor;
    red: RgbColor;
    green: RgbColor;
    yellow: RgbColor;
    blue: RgbColor;
    magenta: RgbColor;
    cyan: RgbColor;
    white: RgbColor;

    brightBlack: RgbColor;
    brightRed: RgbColor;
    brightGreen: RgbColor;
    brightYellow: RgbColor;
    brightBlue: RgbColor;
    brightMagenta: RgbColor;
    brightCyan: RgbColor;
    brightWhite: RgbColor;
}

export default interface TerminalTheme {
    background: RgbColor
    foreground: RgbColor
    ansi: Ansi

    cursorBackground?: RgbColor
    cursorBorder?: RgbColor
    cursorForeground?: RgbColor

    selectionBackground?:RgbColor
    selectionForeground?:RgbColor
}

export function fromAlacritty(themeText: string): TerminalTheme {
    try {
        var data = toml.parse(themeText);
    } catch (err) {
        throw new Error(`Parsing TOML failed: ${err}`)
    }

    const ansi: Ansi = {
        black: rgbColor.fromHex(data.colors.normal.black),
        red: rgbColor.fromHex(data.colors.normal.red),
        green: rgbColor.fromHex(data.colors.normal.green),
        yellow: rgbColor.fromHex(data.colors.normal.yellow),
        blue: rgbColor.fromHex(data.colors.normal.blue),
        magenta: rgbColor.fromHex(data.colors.normal.magenta),
        cyan: rgbColor.fromHex(data.colors.normal.cyan),
        white: rgbColor.fromHex(data.colors.normal.white),
        brightBlack: rgbColor.fromHex(data.colors.bright.black),
        brightRed: rgbColor.fromHex(data.colors.bright.red),
        brightGreen: rgbColor.fromHex(data.colors.bright.green),
        brightYellow: rgbColor.fromHex(data.colors.bright.yellow),
        brightBlue: rgbColor.fromHex(data.colors.bright.blue),
        brightMagenta: rgbColor.fromHex(data.colors.bright.magenta),
        brightCyan: rgbColor.fromHex(data.colors.bright.cyan),
        brightWhite: rgbColor.fromHex(data.colors.bright.white)
    };
    
    return {
        background: rgbColor.fromHex(data.colors.primary.background),
        foreground: rgbColor.fromHex(data.colors.primary.foreground),
        ansi: ansi,
        cursorForeground: rgbColor.fromHex(data.colors.cursor.text),
        cursorBackground: rgbColor.fromHex(data.colors.cursor.cursor),
    }
}

