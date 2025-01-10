/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx}'],
    mode: 'jit',
    theme: {
        extend: {
            colors: {
                primary: '#FE0000',
                secondary: '',
                tertiary: '',
                'black-100': '#000000',
                light: '#ebecf0',
                'white-100': '#f3f3f3',
                orange: '#fb923c',
                'green-700': '#16a34a',
                other: '#c026d3',
                'blue-500': '#3b82f6',
            },
            boxShadow: {
                card: '0px 35px 120px -15px #211e35',
            },
            screens: {
                xs: '450px',
            },
            backgroundImage: {
                'hero-pattern': "url('/')",
            },
        },
    },
    plugins: [],
};
