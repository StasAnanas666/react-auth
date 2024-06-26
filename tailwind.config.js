/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            backgroundImage: {
                registerBackground: "url('/src/images/background.jpg')",
                loginBackground: "url('/src/images/login.jpg')",
            },
            maxHeight: {
                55: "55vh",
                33: "33vh",
            },
            gridTemplateRows: {
                "[auto,auto,1fr]": "auto auto 1fr",
            },
        },
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/forms"),
    ],
};
