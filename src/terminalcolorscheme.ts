import toml from "toml";
import { RgbColor } from "./rgbcolor";

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

export interface TerminalColorScheme {
	background: RgbColor
	foreground: RgbColor
	ansi: Ansi

	cursorBackground?: RgbColor
	cursorBorder?: RgbColor
	cursorForeground?: RgbColor

	selectionBackground?: RgbColor
	selectionForeground?: RgbColor
}

export function terminalColorSchemeFromAlacritty(colorSchemeText: string): TerminalColorScheme {
	try {
		var data = toml.parse(colorSchemeText);
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

export function terminalColorSchemeToWezTerm(terminalColorScheme: TerminalColorScheme): string {
	const colorSchemeText = `[colors]
ansi = [
	${[
		terminalColorScheme.ansi.black,
		terminalColorScheme.ansi.red,
		terminalColorScheme.ansi.green,
		terminalColorScheme.ansi.yellow,
		terminalColorScheme.ansi.blue,
		terminalColorScheme.ansi.magenta,
		terminalColorScheme.ansi.cyan,
		terminalColorScheme.ansi.white,
	].map((color) => `'${color.toHex}'`).join(",\n\t")}
]
brights = [
	${[
		terminalColorScheme.ansi.brightBlack,
		terminalColorScheme.ansi.brightRed,
		terminalColorScheme.ansi.brightGreen,
		terminalColorScheme.ansi.brightYellow,
		terminalColorScheme.ansi.brightBlue,
		terminalColorScheme.ansi.brightMagenta,
		terminalColorScheme.ansi.brightCyan,
		terminalColorScheme.ansi.brightWhite,
	].map((color) => `'${color.toHex}'`).join(",\n\t")}
]

background = '${terminalColorScheme.background.toHex()}'
foreground = '${terminalColorScheme.foreground.toHex()}'`;

	return colorSchemeText;
}