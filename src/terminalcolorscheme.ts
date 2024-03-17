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

export class Ansi implements IAnsi {
	black!: RgbColor;
	red!: RgbColor;
	green!: RgbColor;
	yellow!: RgbColor;
	blue!: RgbColor;
	magenta!: RgbColor;
	cyan!: RgbColor;
	white!: RgbColor;

	brightBlack!: RgbColor;
	brightRed!: RgbColor;
	brightGreen!: RgbColor;
	brightYellow!: RgbColor;
	brightBlue!: RgbColor;
	brightMagenta!: RgbColor;
	brightCyan!: RgbColor;
	brightWhite!: RgbColor;

	constructor(object: IAnsi) {
        Object.assign(this, object);
    }

	normalColors(): Array<RgbColor> {
		return [
			this.black,
			this.red,
			this.green,
			this.yellow,
			this.blue,
			this.magenta,
			this.cyan,
			this.white,
		]
	}

	brightColors(): Array<RgbColor> {
		return [
			this.brightBlack,
			this.brightRed,
			this.brightGreen,
			this.brightYellow,
			this.brightBlue,
			this.brightMagenta,
			this.brightCyan,
			this.brightWhite,
		]
	}

	colors(): Array<RgbColor> {
		return [...this.normalColors(), ...this.brightColors()]
	}
}

export interface ITerminalColorScheme {
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

export class TerminalColorScheme implements ITerminalColorScheme {
	// Use definite assignment assertion because the only constructor takes in an ITerminalColorScheme
	// and sets the properties using it
	// https://www.ryadel.com/en/ts2564-ts-property-has-no-initializer-typescript-error-fix-visual-studio-2017-vs2017/
	background!: RgbColor
	foreground!: RgbColor
	ansi!: Ansi

	cursorBackground?: RgbColor
	cursorBorder?: RgbColor
	cursorForeground?: RgbColor

	selectionBackground?: RgbColor
	selectionForeground?: RgbColor

	name?: string

	constructor(object: ITerminalColorScheme) {
        Object.assign(this, object);
    }

	static fromAlacritty(colorSchemeText: string): TerminalColorScheme {
		try {
			var data = toml.parse(colorSchemeText);
		} catch (err) {
			throw new Error(`Parsing TOML failed: ${err}`)
		}
	
		const ansi = new Ansi({
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
		});
	
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
	${this.ansi.normalColors()
		.map((color) => `'${color.toHex()}'`)
		.join(",\n\t")
	}
]
brights = [
	${this.ansi.brightColors()
		.map((color) => `'${color.toHex()}'`)
		.join(",\n\t")
	}
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
			"name": this.name ?? "Unnamed",
		
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

	toGhostty(): string {
		var colorSchemeText = `background = ${this.background.toHex()}
foreground = ${this.foreground.toHex()}

${this.ansi.colors()
	.map((color, index) => `palette = ${index}=${color.toHex()}`)
	.join("\n")
}
`;

		if (typeof this.selectionBackground !== "undefined") {
			colorSchemeText += `\nselection-background = ${this.selectionBackground.toHex()}`;
		}
		if (typeof this.selectionForeground !== "undefined") {
			colorSchemeText += `\nselection-foreground = ${this.selectionForeground.toHex()}`;
		}
		if (typeof this.cursorBackground !== "undefined") {
			colorSchemeText += `\ncursor-color = ${this.cursorBackground.toHex()}`;
		}
		if (typeof this.cursorForeground !== "undefined") {
			colorSchemeText += `\ncursor-text = ${this.cursorForeground.toHex()}`;
		}
		return colorSchemeText;
	}
}
