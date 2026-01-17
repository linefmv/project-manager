export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    purple: '#695CCD',
                    dark: '#1F1283',
                    darker: '#1C1930',
                },
                accent: {
                    orange: '#FFB23D',
                },
                background: {
                    light: '#F4F2FF',
                    card: '#FFFFFF',
                },
                text: {
                    primary: '#1E1E1E',
                    secondary: '#717171',
                    title: '#1F1283',
                },
                border: {
                    default: '#DCDCDC',
                    light: '#ECECEC',
                    input: '#717171',
                },
                toggle: {
                    background: '#53525D',
                },
            },
            fontFamily: {
                sans: ['Encode Sans Semi Expanded', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                'card': '16px',
                'button': '26px',
            },
        },
    },
    plugins: [],
}
