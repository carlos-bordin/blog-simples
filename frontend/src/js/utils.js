function clamp(v) {
    return Math.max(0, Math.min(255, v));
}

// Convert hex to RGB
function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) hex = hex.split('').map(x => x + x).join('');
    const num = parseInt(hex, 16);
    return [
        (num >> 16) & 255,
        (num >> 8) & 255,
        num & 255
    ];
}

// Convert HSL to RGB
function hslToRgb(h, s, l) {
    s /= 100; l /= 100;
    const k = n => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = n =>
        l - a * Math.max(-1, Math.min(Math.min(k(n) - 3, 9 - k(n)), 1));
    return [Math.round(255 * f(0)), Math.round(255 * f(8)), Math.round(255 * f(4))];
}

export function darkenColor(color, percent) {
    // Parse color string to RGB array
    let rgb;
    color = color.trim();
    if (color.startsWith('#')) {
        rgb = hexToRgb(color);
    } else if (color.startsWith('rgb')) {
        rgb = color.match(/\d+/g).map(Number);
    } else if (color.startsWith('hsl')) {
        const [h, s, l] = color.match(/[\d.]+/g).map(Number);
        rgb = hslToRgb(h, s, l);
    } else {
        throw new Error('Unsupported color format');
    }

    // Darken each channel
    const factor = 1 - percent / 100;
    const darkened = rgb.map(v => clamp(Math.round(v * factor)));

    return `rgb(${darkened[0]}, ${darkened[1]}, ${darkened[2]})`;
}