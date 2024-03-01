import toml from "toml";
import { RgbColor, rgbColorFromHex, rgbColorToHex } from "./rgb_color";

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

export interface TerminalTheme {
	background: RgbColor
	foreground: RgbColor
	ansi: Ansi

	cursorBackground?: RgbColor
	cursorBorder?: RgbColor
	cursorForeground?: RgbColor

	selectionBackground?: RgbColor
	selectionForeground?: RgbColor
}

export function terminalThemeFromAlacritty(themeText: string): TerminalTheme {
	try {
		var data = toml.parse(themeText);
	} catch (err) {
		throw new Error(`Parsing TOML failed: ${err}`)
	}

	const ansi: Ansi = {
		black: rgbColorFromHex(data.colors.normal.black),
		red: rgbColorFromHex(data.colors.normal.red),
		green: rgbColorFromHex(data.colors.normal.green),
		yellow: rgbColorFromHex(data.colors.normal.yellow),
		blue: rgbColorFromHex(data.colors.normal.blue),
		magenta: rgbColorFromHex(data.colors.normal.magenta),
		cyan: rgbColorFromHex(data.colors.normal.cyan),
		white: rgbColorFromHex(data.colors.normal.white),
		brightBlack: rgbColorFromHex(data.colors.bright.black),
		brightRed: rgbColorFromHex(data.colors.bright.red),
		brightGreen: rgbColorFromHex(data.colors.bright.green),
		brightYellow: rgbColorFromHex(data.colors.bright.yellow),
		brightBlue: rgbColorFromHex(data.colors.bright.blue),
		brightMagenta: rgbColorFromHex(data.colors.bright.magenta),
		brightCyan: rgbColorFromHex(data.colors.bright.cyan),
		brightWhite: rgbColorFromHex(data.colors.bright.white)
	};

	return {
		background: rgbColorFromHex(data.colors.primary.background),
		foreground: rgbColorFromHex(data.colors.primary.foreground),
		ansi: ansi,
		cursorForeground: rgbColorFromHex(data.colors.cursor.text),
		cursorBackground: rgbColorFromHex(data.colors.cursor.cursor),
	}
}

export function terminalThemeToWezTerm(terminalTheme: TerminalTheme): string {
	const theme = `[colors]
ansi = [
	${[
		terminalTheme.ansi.black,
		terminalTheme.ansi.red,
		terminalTheme.ansi.green,
		terminalTheme.ansi.yellow,
		terminalTheme.ansi.blue,
		terminalTheme.ansi.magenta,
		terminalTheme.ansi.cyan,
		terminalTheme.ansi.white,
	].map((color) => `'${rgbColorToHex(color)}'`).join(",\n\t")}
]
brights = [
	${[
		terminalTheme.ansi.brightBlack,
		terminalTheme.ansi.brightRed,
		terminalTheme.ansi.brightGreen,
		terminalTheme.ansi.brightYellow,
		terminalTheme.ansi.brightBlue,
		terminalTheme.ansi.brightMagenta,
		terminalTheme.ansi.brightCyan,
		terminalTheme.ansi.brightWhite,
	].map((color) => `'${rgbColorToHex(color)}'`).join(",\n\t")}
]

background = '${rgbColorToHex(terminalTheme.background)}'
foreground = '${rgbColorToHex(terminalTheme.foreground)}'`;

	return theme;
}