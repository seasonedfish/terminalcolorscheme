import { ColorTranslator } from "colortranslator"
import toml from "toml";

interface Ansi {
    black: ColorTranslator;
    red: ColorTranslator;
    green: ColorTranslator;
    yellow: ColorTranslator;
    blue: ColorTranslator;
    magenta: ColorTranslator;
    cyan: ColorTranslator;
    white: ColorTranslator;

    brightBlack: ColorTranslator;
    brightRed: ColorTranslator;
    brightGreen: ColorTranslator;
    brightYellow: ColorTranslator;
    brightBlue: ColorTranslator;
    brightMagenta: ColorTranslator;
    brightCyan: ColorTranslator;
    brightWhite: ColorTranslator;
}

class Ansi implements Ansi {
    constructor(ansi: Ansi) {
        Object.assign(this, ansi);
    }
}

type ColorTranslatorInput = ConstructorParameters<typeof ColorTranslator>;

// Builder pattern
// https://stackoverflow.com/a/53982272/
class AnsiBuilder implements Partial<Ansi> {
    black?: ColorTranslator;
    red?: ColorTranslator;
    green?: ColorTranslator;
    yellow?: ColorTranslator;
    blue?: ColorTranslator;
    magenta?: ColorTranslator;
    cyan?: ColorTranslator;
    white?: ColorTranslator;

    brightBlack?: ColorTranslator;
    brightRed?: ColorTranslator;
    brightGreen?: ColorTranslator;
    brightYellow?: ColorTranslator;
    brightBlue?: ColorTranslator;
    brightMagenta?: ColorTranslator;
    brightCyan?: ColorTranslator;
    brightWhite?: ColorTranslator;

    withBlack(black: ColorTranslatorInput): this & Pick<Ansi, "black"> {
        return Object.assign(this, {black: new ColorTranslator(...black)})
    }

    withRed(red: ColorTranslatorInput): this & Pick<Ansi, "red"> {
        return Object.assign(this, { red: new ColorTranslator(...red) });
    }

    withGreen(green: ColorTranslatorInput): this & Pick<Ansi, "green"> {
        return Object.assign(this, { green: new ColorTranslator(...green) });
    }

    withYellow(yellow: ColorTranslatorInput): this & Pick<Ansi, "yellow"> {
        return Object.assign(this, { yellow: new ColorTranslator(...yellow) });
    }

    withBlue(blue: ColorTranslatorInput): this & Pick<Ansi, "blue"> {
        return Object.assign(this, { blue: new ColorTranslator(...blue) });
    }

    withMagenta(magenta: ColorTranslatorInput): this & Pick<Ansi, "magenta"> {
        return Object.assign(this, { magenta: new ColorTranslator(...magenta) });
    }

    withCyan(cyan: ColorTranslatorInput): this & Pick<Ansi, "cyan"> {
        return Object.assign(this, { cyan: new ColorTranslator(...cyan) });
    }

    withWhite(white: ColorTranslatorInput): this & Pick<Ansi, "white"> {
        return Object.assign(this, { white: new ColorTranslator(...white) });
    }

    withBrightBlack(brightBlack: ColorTranslatorInput): this & Pick<Ansi, "brightBlack"> {
        return Object.assign(this, { brightBlack: new ColorTranslator(...brightBlack) });
    }

    withBrightRed(brightRed: ColorTranslatorInput): this & Pick<Ansi, "brightRed"> {
        return Object.assign(this, { brightRed: new ColorTranslator(...brightRed) });
    }

    withBrightGreen(brightGreen: ColorTranslatorInput): this & Pick<Ansi, "brightGreen"> {
        return Object.assign(this, { brightGreen: new ColorTranslator(...brightGreen) });
    }

    withBrightYellow(brightYellow: ColorTranslatorInput): this & Pick<Ansi, "brightYellow"> {
        return Object.assign(this, { brightYellow: new ColorTranslator(...brightYellow) });
    }

    withBrightBlue(brightBlue: ColorTranslatorInput): this & Pick<Ansi, "brightBlue"> {
        return Object.assign(this, { brightBlue: new ColorTranslator(...brightBlue) });
    }

    withBrightMagenta(brightMagenta: ColorTranslatorInput): this & Pick<Ansi, "brightMagenta"> {
        return Object.assign(this, { brightMagenta: new ColorTranslator(...brightMagenta) });
    }

    withBrightCyan(brightCyan: ColorTranslatorInput): this & Pick<Ansi, "brightCyan"> {
        return Object.assign(this, { brightCyan: new ColorTranslator(...brightCyan) });
    }

    withBrightWhite(brightWhite: ColorTranslatorInput): this & Pick<Ansi, "brightWhite"> {
        return Object.assign(this, { brightWhite: new ColorTranslator(...brightWhite) });
    }

    build(this: Ansi) {
        return new Ansi(this);
    }
}

interface TerminalTheme {
    background: ColorTranslator
    foreground: ColorTranslator
    ansi: Ansi

    cursorBackground?: ColorTranslator
    cursorBorder?: ColorTranslator
    cursorForeground?: ColorTranslator

    selectionBackground?:ColorTranslator
    selectionForeground?:ColorTranslator
}

class TerminalTheme implements TerminalTheme {
    constructor(terminalTheme: TerminalTheme) {
        Object.assign(this, terminalTheme);
    }

    static fromAlacritty(themeText: string): TerminalTheme {
        var data = toml.parse(themeText);

        const ansiBuilder = new AnsiBuilder()
        const ansi = ansiBuilder
            .withBlack(data.colors.normal.black)
            .withRed(data.colors.normal.red)
            .withGreen(data.colors.normal.green)
            .withYellow(data.colors.normal.yellow)
            .withBlue(data.colors.normal.blue)
            .withMagenta(data.colors.normal.magenta)
            .withCyan(data.colors.normal.cyan)
            .withWhite(data.colors.normal.white)
            .withBrightBlack(data.colors.bright.black)
            .withBrightRed(data.colors.bright.red)
            .withBrightGreen(data.colors.bright.green)
            .withBrightYellow(data.colors.bright.yellow)
            .withBrightBlue(data.colors.bright.blue)
            .withBrightMagenta(data.colors.bright.magenta)
            .withBrightCyan(data.colors.bright.cyan)
            .withBrightWhite(data.colors.bright.white)
            .build();
        
        const terminalThemeBuilder = new TerminalThemeBuilder()
        return terminalThemeBuilder
            .withBackground(data.colors.primary.background)
            .withForeground(data.colors.primary.foreground)
            .withCursorForeground(data.colors.cursor.text)
            .withCursorBackground(data.colors.cursor.cursor)
            .withAnsi(ansi)
            .build()
    }
}

export default TerminalTheme;

class TerminalThemeBuilder implements Partial<TerminalTheme> {
    background?: ColorTranslator;
    foreground?: ColorTranslator;
    ansi?: Ansi;

    cursorBackground?: ColorTranslator;
    cursorBorder?: ColorTranslator;
    cursorForeground?: ColorTranslator;

    selectionBackground?: ColorTranslator;
    selectionForeground?: ColorTranslator;

    withBackground(background: ColorTranslatorInput): this & Pick<TerminalTheme, "background"> {
        return Object.assign(this, { background: new ColorTranslator(...background) });
    }

    withForeground(foreground: ColorTranslatorInput): this & Pick<TerminalTheme, "foreground"> {
        return Object.assign(this, { foreground: new ColorTranslator(...foreground) });
    }

    withAnsi(ansi: Ansi): this & Pick<TerminalTheme, "ansi"> {
        return Object.assign(this, { ansi });
    }

    withCursorBackground(cursorBackground: ColorTranslatorInput): this & Required<Pick<TerminalTheme, "cursorBackground">> {
        return Object.assign(this, { cursorBackground: new ColorTranslator(...cursorBackground) });
    }

    withCursorBorder(cursorBorder: ColorTranslatorInput): this & Required<Pick<TerminalTheme, "cursorBorder">> {
        return Object.assign(this, { cursorBorder: new ColorTranslator(...cursorBorder) });
    }

    withCursorForeground(cursorForeground: ColorTranslatorInput): this & Required<Pick<TerminalTheme, "cursorForeground">> {
        return Object.assign(this, { cursorForeground: new ColorTranslator(...cursorForeground) });
    }

    withSelectionBackground(selectionBackground: ColorTranslatorInput): this & Required<Pick<TerminalTheme, "selectionBackground">> {
        return Object.assign(this, { selectionBackground: new ColorTranslator(...selectionBackground) });
    }

    withSelectionForeground(selectionForeground: ColorTranslatorInput): this & Required<Pick<TerminalTheme, "selectionForeground">> {
        return Object.assign(this, { selectionForeground: new ColorTranslator(...selectionForeground) });
    }

    build(this: TerminalTheme) {
        return new TerminalTheme(this);
    }
}
