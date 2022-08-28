/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: [
        './pages/**/*.{ts,js,tsx,jsx}',
        './components/**/*.{ts,js,tsx,jsx}',
    ],
    theme: {
        fontFamily: {
            sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            serif: [...defaultTheme.fontFamily.serif],
            mono: [...defaultTheme.fontFamily.mono],
            poppins: 'Poppins',
        },
    },
    daisyui: {
        themes: [
            {
                mytheme: {
                    primary: '#A6242C',
                    secondary: '#DF851B',
                    accent: '#890A4F',
                    neutral: '#36312B',
                    'base-100': '#ffffff',
                    info: '#3ABFF8',
                    success: '#36D399',
                    warning: '#FBBD23',
                    error: '#F87272',
                },
            },
        ],
    },
    plugins: [require('daisyui')],
};
