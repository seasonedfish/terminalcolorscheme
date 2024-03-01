import toml from "toml";
import { RgbColor } from "./rgb_color";

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
		black: RgbColor.fromHex(data.colors.normal.black),
		red: RgbColor.fromHex(data.colors.normal.red),
		green: RgbColor.fromHex(data.colors.normal.green),
		yellow: RgbColor.fromHex(data.colors.normal.yellow),
		blue: RgbColor.fromHex(data.colors.normal.blue),
		magenta: RgbColor.fromHex(data.colors.normal.magenta),
		cyan: RgbColor.fromHex(data.colors.normal.cyan),
		white: RgbColor.fromHex(data.colors.normal.white),
		brightBlack: RgbColor.fromHex(data.colors.bright.black),
		brightRed: RgbColor.fromHex(data.colors.bright.red),
		brightGreen: RgbColor.fromHex(data.colors.bright.green),
		brightYellow: RgbColor.fromHex(data.colors.bright.yellow),
		brightBlue: RgbColor.fromHex(data.colors.bright.blue),
		brightMagenta: RgbColor.fromHex(data.colors.bright.magenta),
		brightCyan: RgbColor.fromHex(data.colors.bright.cyan),
		brightWhite: RgbColor.fromHex(data.colors.bright.white)
	};

	return {
		background: RgbColor.fromHex(data.colors.primary.background),
		foreground: RgbColor.fromHex(data.colors.primary.foreground),
		ansi: ansi,
		cursorForeground: RgbColor.fromHex(data.colors.cursor.text),
		cursorBackground: RgbColor.fromHex(data.colors.cursor.cursor),
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
	].map((color) => `'${color.toHex}'`).join(",\n\t")}
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
	].map((color) => `'${color.toHex}'`).join(",\n\t")}
]

background = '${terminalTheme.background.toHex()}'
foreground = '${terminalTheme.foreground.toHex()}'`;

	return theme;
}