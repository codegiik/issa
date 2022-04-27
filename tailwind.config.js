const colors = require('tailwindcss/colors');

const defaultFontFamily = {
    sans: [
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
    ],
    serif: [
        'ui-serif',
        'Georgia',
        'Cambria',
        'Times New Roman',
        'Times',
        'serif',
    ],
    mono: [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        'Liberation Mono',
        'Courier New',
        'monospace',
    ],
};

module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {},
        colors: {
            'stark-white': {
                DEFAULT: '#E8D8C3',
                50: '#FFFFFF',
                100: '#FCFAF8',
                200: '#F9F5F0',
                300: '#F4ECE2',
                400: '#EADDCC',
                500: '#E8D8C3',
                600: '#D8BE9A',
                700: '#C9A372',
                800: '#B98949',
                900: '#926B38',
            },
            cedar: {
                DEFAULT: '#3C1217',
                50: '#C64050',
                100: '#BA3847',
                200: '#9A2E3B',
                300: '#7B252F',
                400: '#5B1B23',
                500: '#3C1217',
                600: '#2B0D11',
                700: '#1F090C',
                800: '#180709',
                900: '#000000',
            },
            ...colors,
        },
        fontFamily: {
            sans: [...defaultFontFamily['sans']],
            serif: ['Libre Baskerville', ...defaultFontFamily['serif']],
            body: ['EB Garamond', ...defaultFontFamily['sans']],
            mono: [...defaultFontFamily['mono']],
        },
    },
    plugins: [],
};
