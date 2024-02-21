import { ColorTranslator } from "../node_modules/colortranslator/index"

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

class TermTheme {
    background: ColorTranslator
    foreground: ColorTranslator
    ansi: Ansi

    cursorBackground?: ColorTranslator
    cursorBorder?: ColorTranslator
    cursorForeground?: ColorTranslator

    selectionBackground?:ColorTranslator
    selectionForeground?:ColorTranslator
    
    constructor(foreground: ColorTranslator, background: ColorTranslator, ansi: Ansi) {
        this.foreground = foreground;
        this.background = background;
        this.ansi = ansi;
    }
}