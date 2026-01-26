/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#4338ca", // Indigo 700 - Deep Brand Indigo
                "primary-light": "#6366f1", // Indigo 500
                "secondary": "#16a34a", // Green 600 - Sustainable Green
                "secondary-bright": "#22c55e", // Green 500
                "background-light": "#eef2ff", // Very light indigo tint
                "background-dark": "#1e1b4b", // Indigo 950 - Deepest Indigo
                "card-bg-light": "#ffffff",
                "card-bg-dark": "#312e81", // Indigo 900
                "text-main": "#1e1b4b", // Indigo 950
                "text-sub": "#4f46e5", // Indigo 600
                "text-muted": "#64748b", // Slate 500

                // Aliases for compatibility with existing components
                "deep-indigo": "#1e1b4b",
                "text-dark": "#312e81",
                "accent": "#16a34a", // Mapping accent to secondary
            },
            fontFamily: {
                display: "Manrope",
                body: ["Noto Sans", "sans-serif"]
            },
            borderRadius: {
                DEFAULT: "0.25rem",
                lg: "0.5rem",
                xl: "0.75rem",
                "2xl": "1rem",
                full: "9999px"
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'glass-gradient': 'linear-gradient(145deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.2) 100%)',
                'glass-gradient-dark': 'linear-gradient(145deg, rgba(49, 46, 129, 0.7) 0%, rgba(49, 46, 129, 0.3) 100%)',
                'ev-glow': 'radial-gradient(circle at center, rgba(22, 163, 74, 0.15) 0%, transparent 70%)',
            },
            boxShadow: {
                'neon': '0 0 15px rgba(67, 56, 202, 0.3), 0 0 30px rgba(22, 163, 74, 0.1)',
                'neon-hover': '0 0 25px rgba(67, 56, 202, 0.5), 0 0 50px rgba(22, 163, 74, 0.3)',
                'green-glow': '0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2)',
                'soft': '0 10px 40px -10px rgba(67, 56, 202, 0.15)',
                'glow': '0 0 20px rgba(16, 185, 129, 0.4)',
                'card': '0 4px 6px -1px rgba(67, 56, 202, 0.1), 0 2px 4px -1px rgba(67, 56, 202, 0.06)'
            },
            backdropBlur: {
                xs: "2px"
            },
            animation: {
                marquee: "marquee 30s linear infinite",
                "float-slow": "float 8s ease-in-out infinite",
                "pulse-glow": "pulse-glow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
            },
            keyframes: {
                marquee: {
                    "0%": { transform: "translateX(0%)" },
                    "100%": { transform: "translateX(-50%)" }
                },
                float: {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-15px)" },
                    "100%": { transform: "translateY(0px)" }
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: 1, boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" },
                    "50%": { opacity: 0.8, boxShadow: "0 0 10px rgba(16, 185, 129, 0.1)" }
                }
            }
        }
    },
    plugins: [],
}
