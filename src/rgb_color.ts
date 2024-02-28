export interface RgbColor {
    r: number; // 0 to 255
    g: number;
    b: number;
}

export function fromHex(hex: string): RgbColor {
    if (hex[0] === "#") {
        hex = hex.substring(1);
    }

    if (hex.length !== 6) {
        throw new Error(`could not create RgbColor: expected 6 digit RGB string, got "${hex}"`)
    }

    const red = parseInt(hex.substring(0, 2), 16);
    const green = parseInt(hex.substring(2, 4), 16);
    const blue = parseInt(hex.substring(4, 6), 16);

    return {
        r: red,
        g: green,
        b: blue
    };
}

function componentToHex(component: number): string {
    var converted = component.toString(16);

    // Pad with zero if it's one digit
    if (converted.length == 1) {
        converted = `0${converted}`;
    }
    return converted;
}

export function toHex(rgbColor: RgbColor): string {
    return `#${componentToHex(rgbColor.r)}${componentToHex(rgbColor.g)}${componentToHex(rgbColor.b)}`
}
