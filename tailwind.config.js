/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './pages/**/*.{ts,js,tsx,jsx}',
        './components/**/*.{ts,js,tsx,jsx}',
    ],
    theme: {
        fontFamily: {
            sans: [...defaultTheme.fontFamily.sans],
            serif: ['Libre Baskerville', ...defaultTheme.fontFamily.serif],
            body: ['EB Garamond', ...defaultTheme.fontFamily.serif],
            mono: [...defaultTheme.fontFamily.mono],
            'libre-baskerville': 'Libre Baskerville',
            'eb-garmond': 'EB Garamond',
        },
    },
    daisyui: {
        themes: [
            {
                issa: {
                    primary: '#3A1419',
                    'primary-focus': '#2b0d10',
                    'primary-content': '#E5E1DD',
                    secondary: '#571C24',
                    'secondary-focus': '#561a21',
                    'secondary-content': '#E5E1DD',
                    accent: '#971717',
                    neutral: '#333',
                    'neutral-focus': '#222',
                    'base-100': '#F4ECE2',
                    'base-200': '#E7D6C2',
                    'base-300': '#D8BE9A',
                    info: '#3ABFF8',
                    success: '#36D399',
                    warning: '#FBBD23',
                    error: '#F87272',
                },
            },
        ],
    },
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
