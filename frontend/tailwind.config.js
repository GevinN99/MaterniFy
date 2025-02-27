/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
		"./tabs/**/*.{js,jsx,ts,tsx}",
	],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			fontFamily: {
				sans: ["Regular", "sans-serif"], // Default font (Poppins Regular)
				thin: ["Thin", "sans-serif"],
				extralight: ["ExtraLight", "sans-serif"],
				light: ["Light", "sans-serif"],
				regular: ["Regular", "sans-serif"],
				medium: ["Medium", "sans-serif"],
				semibold: ["SemiBold", "sans-serif"],
				bold: ["Bold", "sans-serif"],
				extrabold: ["ExtraBold", "sans-serif"],
				black: ["Black", "sans-serif"],
			},
		},
	},
	plugins: [],
}
