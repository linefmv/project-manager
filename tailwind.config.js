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
                error: {
                    border: '#C40000',
                    text: '#C40000',
                    label: '#9F0000',
                },
                button: {
                    submitDisabled: '#B2A8FF',
                    submit: '#695CCD',
                    submitHover: '#5348B2',
                },
            },
            fontFamily: {
                sans: ['Encode Sans Semi Expanded', 'system-ui', 'sans-serif'],
                brand: ['Encode Sans Expanded', 'sans-serif'],
            },
            borderRadius: {
                'card': '16px',
                'button': '26px',
            },
            keyframes: {
                'fade-in': {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'bounce-slow': {
                    '0%, 100%': { transform: 'translateY(-5%)' },
                    '50%': { transform: 'translateY(0)' },
                }
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out forwards',
                'bounce-slow': 'bounce-slow 3s infinite ease-in-out',
            },
        },
    },
    plugins: [],
}
