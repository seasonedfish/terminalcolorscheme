import toml from "toml";
import * as rgb_color from "./rgb_color.js";
import RgbColor from "./rgb_color.js";

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
        black: rgb_color.fromHex(data.colors.normal.black),
        red: rgb_color.fromHex(data.colors.normal.red),
        green: rgb_color.fromHex(data.colors.normal.green),
        yellow: rgb_color.fromHex(data.colors.normal.yellow),
        blue: rgb_color.fromHex(data.colors.normal.blue),
        magenta: rgb_color.fromHex(data.colors.normal.magenta),
        cyan: rgb_color.fromHex(data.colors.normal.cyan),
        white: rgb_color.fromHex(data.colors.normal.white),
        brightBlack: rgb_color.fromHex(data.colors.bright.black),
        brightRed: rgb_color.fromHex(data.colors.bright.red),
        brightGreen: rgb_color.fromHex(data.colors.bright.green),
        brightYellow: rgb_color.fromHex(data.colors.bright.yellow),
        brightBlue: rgb_color.fromHex(data.colors.bright.blue),
        brightMagenta: rgb_color.fromHex(data.colors.bright.magenta),
        brightCyan: rgb_color.fromHex(data.colors.bright.cyan),
        brightWhite: rgb_color.fromHex(data.colors.bright.white)
    };
    
    return {
        background: rgb_color.fromHex(data.colors.primary.background),
        foreground: rgb_color.fromHex(data.colors.primary.foreground),
        ansi: ansi,
        cursorForeground: rgb_color.fromHex(data.colors.cursor.text),
        cursorBackground: rgb_color.fromHex(data.colors.cursor.cursor),
    }
}

