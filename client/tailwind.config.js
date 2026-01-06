/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    orange: '#EA580C', // Deep Orange for "Labour"
                    dark: '#0F172A',   // Slate 900 for "Digital"
                    light: '#F8FAFC',  // Slate 50 for background
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // Professional font
            }
        },
    },
    plugins: [],
}
