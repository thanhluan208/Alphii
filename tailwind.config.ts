import type { Config } from "tailwindcss"

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}"
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1500px"
			}
		},
		extend: {
			fontFamily: {
				sans: ["var(--font-josefin)", "sans-serif"],
				nico: ["var(--font-nico)", "sans-serif"],
				intrument: ["var(--font-intrument)", "sans-serif"]
			},
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				description: "#333639",
				primary: {
					DEFAULT: "#247252",
					foreground: "hsl(var(--primary-foreground))"
				},
				secondary: {
					DEFAULT: "#D4D4D4",
					foreground: "hsl(var(--secondary-foreground))"
				},
				destructive: {
					DEFAULT: "#B80704",
					foreground: "hsl(var(--destructive-foreground))"
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))"
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))"
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))"
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))"
				},
				chart: {
					"1": "hsl(var(--chart-1))",
					"2": "hsl(var(--chart-2))",
					"3": "hsl(var(--chart-3))",
					"4": "hsl(var(--chart-4))",
					"5": "hsl(var(--chart-5))"
				},
				darkTealGreen: "#091D13",
				["grey-1"]: "#9A9D9F",
				["grey-2"]: "#ACACAC",
				["grey-3"]: "#DADADA",
				["grey-4"]: "#F9FAFC",
				["black-1"]: "#3B3B3B",
				["white-1"]: "#EFEFF1"
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			keyframes: {
				"caret-blink": {
					"0%,70%,100%": {
						opacity: "1"
					},
					"20%,50%": {
						opacity: "0"
					}
				},
				"accordion-down": {
					from: {
						height: "0"
					},
					to: {
						height: "var(--radix-accordion-content-height)"
					}
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)"
					},
					to: {
						height: "0"
					}
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"caret-blink": "caret-blink 1.25s ease-out infinite"
			}
		}
	},
	plugins: [require("tailwindcss-animate")]
} satisfies Config

export default config
