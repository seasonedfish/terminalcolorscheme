import toml from "toml";
import { RgbColor, fromHex, toHex } from "./rgbcolor";

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

export function normalColors(ansi: Ansi): Array<RgbColor> {
	return [
		ansi.black,
		ansi.red,
		ansi.green,
		ansi.yellow,
		ansi.blue,
		ansi.magenta,
		ansi.cyan,
		ansi.white,
	]
}

export function brightColors(ansi: Ansi): Array<RgbColor> {
	return [
		ansi.brightBlack,
		ansi.brightRed,
		ansi.brightGreen,
		ansi.brightYellow,
		ansi.brightBlue,
		ansi.brightMagenta,
		ansi.brightCyan,
		ansi.brightWhite,
	]
}

export function allColors(ansi: Ansi): Array<RgbColor> {
	return [...normalColors(ansi), ...brightColors(ansi)]
}

/**
 * Represents a color scheme for terminal emulators.
 */
export interface TerminalColorScheme {
	background: RgbColor
	foreground: RgbColor
	ansi: Ansi

	cursorBackground?: RgbColor
	cursorBorder?: RgbColor
	cursorForeground?: RgbColor

	selectionBackground?: RgbColor
	selectionForeground?: RgbColor

	name?: string
}

/**
 * Thrown when parsing TOML failed.
 */
export class TOMLError extends Error {
	constructor(cause?: any) {
		super("Parsing TOML failed");
		Object.setPrototypeOf(this, TOMLError.prototype);

		this.name = "TOMLError";
		this.cause = cause;
	}
}

export class IncompleteColorSchemeError extends Error {
	constructor(cause?: any) {
		super("Given color scheme is missing fields");
		Object.setPrototypeOf(this, TOMLError.prototype);

		this.name = "IncompleteColorSchemeError";
		this.cause = cause;
	}
}

/**
 * Creates a new TerminalColorScheme from the Alacritty TOML format.
 */
export function fromAlacritty(colorSchemeText: string): TerminalColorScheme {
	try {
		var data = toml.parse(colorSchemeText);
	} catch (err) {
		throw new TOMLError(err)
	}
	
	try {
		const ansi = {
			black: fromHex(data.colors.normal.black),
			red: fromHex(data.colors.normal.red),
			green: fromHex(data.colors.normal.green),
			yellow: fromHex(data.colors.normal.yellow),
			blue: fromHex(data.colors.normal.blue),
			magenta: fromHex(data.colors.normal.magenta),
			cyan: fromHex(data.colors.normal.cyan),
			white: fromHex(data.colors.normal.white),
			brightBlack: fromHex(data.colors.bright.black),
			brightRed: fromHex(data.colors.bright.red),
			brightGreen: fromHex(data.colors.bright.green),
			brightYellow: fromHex(data.colors.bright.yellow),
			brightBlue: fromHex(data.colors.bright.blue),
			brightMagenta: fromHex(data.colors.bright.magenta),
			brightCyan: fromHex(data.colors.bright.cyan),
			brightWhite: fromHex(data.colors.bright.white)
		};
	
		return {
			background: fromHex(data.colors.primary.background),
			foreground: fromHex(data.colors.primary.foreground),
			ansi: ansi,
			cursorForeground: fromHex(data.colors.cursor.text),
			cursorBackground: fromHex(data.colors.cursor.cursor),
		}
	} catch (err) {
		throw new IncompleteColorSchemeError(err);
	}
}

/**
 * Exports a TerminalColorScheme to the WezTerm TOML format.
 */
export function toWezTerm(scheme: TerminalColorScheme): string {
	const colorSchemeText = `[colors]
ansi = [
${normalColors(scheme.ansi)
	.map((color) => `'${toHex(color)}'`)
	.join(",\n\t")
}
]
brights = [
${brightColors(scheme.ansi)
	.map((color) => `'${toHex(color)}'`)
	.join(",\n\t")
}
]

background = '${toHex(scheme.background)}'
foreground = '${toHex(scheme.foreground)}'`;

	return colorSchemeText;
}

/**
 * Exports a TerminalColorScheme to the Windows Terminal JSON format.
 */
export function toWindowTerminal(scheme: TerminalColorScheme): string {
	type WindowsTerminalColorScheme = {
		name: string
		cursorColor?: string;
		selectionBackground?: string;
		background: string;
		foreground: string;
		black: string;
		blue: string;
		cyan: string;
		green: string;
		purple: string;
		red: string;
		white: string;
		yellow: string;
		brightBlack: string;
		brightBlue: string;
		brightCyan: string;
		brightGreen: string;
		brightPurple: string;
		brightRed: string;
		brightWhite: string;
		brightYellow: string;
	}

	const colorSchemeObject: WindowsTerminalColorScheme = {
		"name": scheme.name ?? "Unnamed",
	
		"background": toHex(scheme.background),
		"foreground": toHex(scheme.foreground),
	
		"black": toHex(scheme.ansi.black),
		"blue": toHex(scheme.ansi.blue),
		"cyan": toHex(scheme.ansi.cyan),
		"green": toHex(scheme.ansi.green),
		"purple": toHex(scheme.ansi.magenta),
		"red": toHex(scheme.ansi.red),
		"white": toHex(scheme.ansi.white),
		"yellow": toHex(scheme.ansi.yellow),
	
		"brightBlack": toHex(scheme.ansi.brightBlack),
		"brightBlue": toHex(scheme.ansi.brightBlue),
		"brightCyan": toHex(scheme.ansi.brightCyan),
		"brightGreen": toHex(scheme.ansi.brightGreen),
		"brightPurple": toHex(scheme.ansi.brightMagenta),
		"brightRed": toHex(scheme.ansi.brightRed),
		"brightWhite": toHex(scheme.ansi.brightWhite),
		"brightYellow": toHex(scheme.ansi.brightYellow)
	};

	if (typeof scheme.cursorBackground !== "undefined") {
		colorSchemeObject.cursorColor = toHex(scheme.cursorBackground);
	}

	if (typeof scheme.selectionBackground !== "undefined") {
		colorSchemeObject.selectionBackground = toHex(scheme.selectionBackground);
	}

	return JSON.stringify(colorSchemeObject);
}

/**
 * Exports a TerminalColorScheme to the Ghostty config format.
 */
export function toGhostty(scheme: TerminalColorScheme): string {
	var colorSchemeText = `background = ${toHex(scheme.background)}
foreground = ${toHex(scheme.foreground)}

${allColors(scheme.ansi)
	.map((color, index) => `palette = ${index}=${toHex(color)}`)
	.join("\n")
}
`;

	if (typeof scheme.selectionBackground !== "undefined") {
		colorSchemeText += `\nselection-background = ${toHex(scheme.selectionBackground)}`;
	}
	if (typeof scheme.selectionForeground !== "undefined") {
		colorSchemeText += `\nselection-foreground = ${toHex(scheme.selectionForeground)}`;
	}
	if (typeof scheme.cursorBackground !== "undefined") {
		colorSchemeText += `\ncursor-color = ${toHex(scheme.cursorBackground)}`;
	}
	if (typeof scheme.cursorForeground !== "undefined") {
		colorSchemeText += `\ncursor-text = ${toHex(scheme.cursorForeground)}`;
	}
	return colorSchemeText;
}
