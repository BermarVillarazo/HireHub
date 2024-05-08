import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            // backgroundImage: {
            //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            //     "gradient-conic":
            //         "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            // },
            animation: {
                "spin-slow": "spin 1s linear infinite",
            },
            colors: {
                "black-primary": "#1B1B1E",
            },
        },
    },
    daisyui: {
        themes: ["light", "dark", "cupcake"],
    },
    plugins: [require("daisyui")],
};
export default config;
