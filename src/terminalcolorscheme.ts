import toml from "toml";
import { RgbColor } from "./rgbcolor";

export interface IAnsi {
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

export interface ITerminalColorScheme {
	background: RgbColor
	foreground: RgbColor
	ansi: IAnsi

	cursorBackground?: RgbColor
	cursorBorder?: RgbColor
	cursorForeground?: RgbColor

	selectionBackground?: RgbColor
	selectionForeground?: RgbColor
}

export class TerminalColorScheme implements ITerminalColorScheme {
	// Use definite assignment assertion because the only constructor takes in an ITerminalColorScheme
	// and sets the properties using it
	// https://www.ryadel.com/en/ts2564-ts-property-has-no-initializer-typescript-error-fix-visual-studio-2017-vs2017/
	background!: RgbColor
	foreground!: RgbColor
	ansi!: IAnsi

	cursorBackground?: RgbColor
	cursorBorder?: RgbColor
	cursorForeground?: RgbColor

	selectionBackground?: RgbColor
	selectionForeground?: RgbColor

	constructor(object: ITerminalColorScheme) {
        Object.assign(this, object);
    }

	static fromAlacritty(colorSchemeText: string): TerminalColorScheme {
		try {
			var data = toml.parse(colorSchemeText);
		} catch (err) {
			throw new Error(`Parsing TOML failed: ${err}`)
		}
	
		const ansi: IAnsi = {
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
	
		return new TerminalColorScheme({
			background: RgbColor.fromHex(data.colors.primary.background),
			foreground: RgbColor.fromHex(data.colors.primary.foreground),
			ansi: ansi,
			cursorForeground: RgbColor.fromHex(data.colors.cursor.text),
			cursorBackground: RgbColor.fromHex(data.colors.cursor.cursor),
		})
	}

	toWezTerm(): string {
		const colorSchemeText = `[colors]
ansi = [
	${[
		this.ansi.black,
		this.ansi.red,
		this.ansi.green,
		this.ansi.yellow,
		this.ansi.blue,
		this.ansi.magenta,
		this.ansi.cyan,
		this.ansi.white,
	].map((color) => `'${color.toHex}'`).join(",\n\t")}
]
brights = [
	${[
		this.ansi.brightBlack,
		this.ansi.brightRed,
		this.ansi.brightGreen,
		this.ansi.brightYellow,
		this.ansi.brightBlue,
		this.ansi.brightMagenta,
		this.ansi.brightCyan,
		this.ansi.brightWhite,
	].map((color) => `'${color.toHex}'`).join(",\n\t")}
]

background = '${this.background.toHex()}'
foreground = '${this.foreground.toHex()}'`;

		return colorSchemeText;
	}

	toWindowTerminal(): string {
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
			"name": "Untitled",
		
			"background": this.background.toHex(),
			"foreground": this.foreground.toHex(),
		
			"black": this.ansi.black.toHex(),
			"blue": this.ansi.blue.toHex(),
			"cyan": this.ansi.cyan.toHex(),
			"green": this.ansi.green.toHex(),
			"purple": this.ansi.magenta.toHex(),
			"red": this.ansi.red.toHex(),
			"white": this.ansi.white.toHex(),
			"yellow": this.ansi.yellow.toHex(),
		
			"brightBlack": this.ansi.brightBlack.toHex(),
			"brightBlue": this.ansi.brightBlue.toHex(),
			"brightCyan": this.ansi.brightCyan.toHex(),
			"brightGreen": this.ansi.brightGreen.toHex(),
			"brightPurple": this.ansi.brightMagenta.toHex(),
			"brightRed": this.ansi.brightRed.toHex(),
			"brightWhite": this.ansi.brightWhite.toHex(),
			"brightYellow": this.ansi.brightYellow.toHex()
		};

		if (typeof this.cursorBackground !== "undefined") {
			colorSchemeObject.cursorColor = this.cursorBackground.toHex();
		}

		if (typeof this.selectionBackground !== "undefined") {
			colorSchemeObject.selectionBackground = this.selectionBackground.toHex();
		}

		return JSON.stringify(colorSchemeObject);
	}
}
