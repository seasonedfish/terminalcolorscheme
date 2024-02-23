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

    withBlack(black: ColorTranslator): this & Pick<Ansi, "black"> {
        return Object.assign(this, {black: black})
    }

    withRed(red: ColorTranslator): this & Pick<Ansi, "red"> {
        return Object.assign(this, { red });
    }

    withGreen(green: ColorTranslator): this & Pick<Ansi, "green"> {
        return Object.assign(this, { green });
    }

    withYellow(yellow: ColorTranslator): this & Pick<Ansi, "yellow"> {
        return Object.assign(this, { yellow });
    }

    withBlue(blue: ColorTranslator): this & Pick<Ansi, "blue"> {
        return Object.assign(this, { blue });
    }

    withMagenta(magenta: ColorTranslator): this & Pick<Ansi, "magenta"> {
        return Object.assign(this, { magenta });
    }

    withCyan(cyan: ColorTranslator): this & Pick<Ansi, "cyan"> {
        return Object.assign(this, { cyan });
    }

    withWhite(white: ColorTranslator): this & Pick<Ansi, "white"> {
        return Object.assign(this, { white });
    }

    withBrightBlack(brightBlack: ColorTranslator): this & Pick<Ansi, "brightBlack"> {
        return Object.assign(this, { brightBlack });
    }

    withBrightRed(brightRed: ColorTranslator): this & Pick<Ansi, "brightRed"> {
        return Object.assign(this, { brightRed });
    }

    withBrightGreen(brightGreen: ColorTranslator): this & Pick<Ansi, "brightGreen"> {
        return Object.assign(this, { brightGreen });
    }

    withBrightYellow(brightYellow: ColorTranslator): this & Pick<Ansi, "brightYellow"> {
        return Object.assign(this, { brightYellow });
    }

    withBrightBlue(brightBlue: ColorTranslator): this & Pick<Ansi, "brightBlue"> {
        return Object.assign(this, { brightBlue });
    }

    withBrightMagenta(brightMagenta: ColorTranslator): this & Pick<Ansi, "brightMagenta"> {
        return Object.assign(this, { brightMagenta });
    }

    withBrightCyan(brightCyan: ColorTranslator): this & Pick<Ansi, "brightCyan"> {
        return Object.assign(this, { brightCyan });
    }

    withBrightWhite(brightWhite: ColorTranslator): this & Pick<Ansi, "brightWhite"> {
        return Object.assign(this, { brightWhite });
    }

    build(this: Ansi) {
        return new Ansi(this);
    }
}

class TermTheme {
    background: ColorTranslator
    foreground: ColorTranslator
    ansi: Ansi

    cursorBackground?: ColorTranslator
    cursorBorder?: ColorTranslator
    cursorForeground?: ColorTranslator

    selectionBackground?:ColorTranslator
    selectionForeground?:ColorTranslator
    
    constructor(
        background: ColorTranslator,
        foreground: ColorTranslator,
        ansi: Ansi,
        cursorBackground?: ColorTranslator,
        cursorBorder?: ColorTranslator,
        cursorForeground?: ColorTranslator,
        selectionBackground?:ColorTranslator,
        selectionForeground?:ColorTranslator,
    ) {
        this.background = background;
        this.foreground = foreground;
        this.ansi = ansi;
        this.cursorBackground = cursorBackground;
        this.cursorBorder = cursorBorder;
        this.cursorForeground = cursorForeground;
        this.selectionBackground = selectionBackground;
        this.selectionForeground = selectionForeground;
    }

    static fromAlacritty(themeText: string): TermTheme {
        var data = toml.parse(themeText);
        
        return new TermTheme(
            new ColorTranslator(data.colors.primary.background),
            new ColorTranslator(data.colors.primary.foreground),
            {
                black: new ColorTranslator(data.colors.normal.black),
                red: new ColorTranslator(data.colors.normal.red),
                green: new ColorTranslator(data.colors.normal.green),
                yellow: new ColorTranslator(data.colors.normal.yellow),
                blue: new ColorTranslator(data.colors.normal.blue),
                magenta: new ColorTranslator(data.colors.normal.magenta),
                cyan: new ColorTranslator(data.colors.normal.cyan),
                white: new ColorTranslator(data.colors.normal.white),
                brightBlack: new ColorTranslator(data.colors.bright.black),
                brightRed: new ColorTranslator(data.colors.bright.red),
                brightGreen: new ColorTranslator(data.colors.bright.green),
                brightYellow: new ColorTranslator(data.colors.bright.yellow),
                brightBlue: new ColorTranslator(data.colors.bright.blue),
                brightMagenta: new ColorTranslator(data.colors.bright.magenta),
                brightCyan: new ColorTranslator(data.colors.bright.cyan),
                brightWhite: new ColorTranslator(data.colors.bright.white),
            }
        )
    }
}

