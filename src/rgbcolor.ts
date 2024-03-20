/**
 * Represents a color in RGB.
 */
export class RgbColor {
    r: number; // 0 to 255
    g: number;
    b: number;

    constructor(r: number, g: number, b: number) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    /**
     * Creates a new RgbColor from a 6 digit hex string, e.g. "#3e3e3e".
     */
    static fromHex(hex: string): RgbColor {
        if (hex[0] === "#") {
            hex = hex.substring(1);
        }
    
        if (hex.length !== 6) {
            throw new Error(`could not create RgbColor: expected 6 digit RGB string, got "${hex}"`)
        }
    
        const red = parseInt(hex.substring(0, 2), 16);
        const green = parseInt(hex.substring(2, 4), 16);
        const blue = parseInt(hex.substring(4, 6), 16);
    
        return new RgbColor(
            red,
            green,
            blue
        );
    }

    /**
     * Converts this RgbColor to its representation as a 6 digit hex string.
     */
    toHex(): string {
        return `#${componentToHex(this.r)}${componentToHex(this.g)}${componentToHex(this.b)}`
    }
}

function componentToHex(component: number): string {
    var converted = component.toString(16);

    // Pad with zero if it's one digit
    if (converted.length == 1) {
        converted = `0${converted}`;
    }
    return converted;
}
