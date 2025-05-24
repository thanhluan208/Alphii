"use client"

import React, { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

import { FitAddon } from "@xterm/addon-fit"
import { Terminal, Terminal as XTerm } from "@xterm/xterm"
import { X } from "lucide-react"

import "@xterm/xterm/css/xterm.css"

// ANSI escape codes for colors
const colors = {
	reset: "\x1b[0m",
	bold: "\x1b[1m",
	dim: "\x1b[2m",
	// Foreground colors
	green: "\x1b[32m",
	cyan: "\x1b[36m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	gray: "\x1b[90m",
	white: "\x1b[37m",
}

const TerminalWindow = () => {
	const terminalRef = useRef(null)
	const xtermRef = useRef<Terminal | null>(null)
	const fitAddonRef = useRef<FitAddon | null>(null)
	const { theme } = useTheme()
	const [isMinimized, setIsMinimized] = useState(false)

	// Simulated Next.js startup commands and output with colors
	const startupSequence = [
		// Command prompt with cyan color
		{ text: `${colors.cyan}$${colors.reset} ${colors.white}npx create-next-app@latest my-app${colors.reset}\n`, delay: 500 },
		
		// Interactive prompts in yellow with green checkmarks
		{ text: `${colors.green}✔${colors.reset} ${colors.yellow}Would you like to use TypeScript?${colors.reset} ${colors.cyan}Yes${colors.reset}\n`, delay: 1000 },
		{ text: `${colors.green}✔${colors.reset} ${colors.yellow}Would you like to use ESLint?${colors.reset} ${colors.cyan}Yes${colors.reset}\n`, delay: 500 },
		{ text: `${colors.green}✔${colors.reset} ${colors.yellow}Would you like to use Tailwind CSS?${colors.reset} ${colors.cyan}Yes${colors.reset}\n`, delay: 500 },
		{ text: `${colors.green}✔${colors.reset} ${colors.yellow}Would you like to use \`src/\` directory?${colors.reset} ${colors.cyan}Yes${colors.reset}\n`, delay: 500 },
		{ text: `${colors.green}✔${colors.reset} ${colors.yellow}Would you like to use App Router?${colors.reset} ${colors.cyan}Yes${colors.reset}\n`, delay: 500 },
		{ text: `${colors.green}✔${colors.reset} ${colors.yellow}Would you like to customize the default import alias?${colors.reset} ${colors.cyan}No${colors.reset}\n`, delay: 500 },
		
		// Status messages in different colors
		{ text: `\n${colors.blue}Initializing project with template...${colors.reset}\n`, delay: 1000 },
		{ text: `${colors.blue}Installing dependencies:${colors.reset}\n`, delay: 500 },
		
		// Dependencies list in dim white
		{ text: `${colors.dim}${colors.white}- react\n- react-dom\n- next\n- typescript\n- @types/react\n- @types/node\n- tailwindcss\n- postcss\n- autoprefixer\n- eslint\n- eslint-config-next${colors.reset}\n`, delay: 2000 },
		
		// Success message in green
		{ text: `\n${colors.green}${colors.bold}Success!${colors.reset} Created ${colors.white}my-app${colors.reset} at ${colors.dim}~/my-app${colors.reset}\n`, delay: 500 },
		
		// Command prompts in cyan
		{ text: `\n${colors.cyan}$${colors.reset} ${colors.white}cd my-app${colors.reset}\n`, delay: 500 },
		{ text: `${colors.cyan}$${colors.reset} ${colors.white}npm run dev${colors.reset}\n\n`, delay: 500 },
		
		// Next.js server messages in different colors
		{ text: `${colors.green}- ready${colors.reset} started server on ${colors.cyan}0.0.0.0:3000${colors.reset}\n`, delay: 500 },
		{ text: `${colors.green}- event${colors.reset} compiled client and server ${colors.green}successfully${colors.reset} in ${colors.yellow}382 ms${colors.reset} ${colors.gray}(17 modules)${colors.reset}\n`, delay: 300 },
		{ text: `${colors.yellow}- wait${colors.reset}  compiling...\n`, delay: 200 },
		{ text: `${colors.green}- event${colors.reset} compiled ${colors.green}successfully${colors.reset} in ${colors.yellow}245 ms${colors.reset} ${colors.gray}(17 modules)${colors.reset}\n`, delay: 300 }
	]

	useEffect(() => {
		// Initialize terminal only on client side
		if (!terminalRef.current) return

		// Create terminal instance with VSCode-like theme
		const terminal = new XTerm({
			cursorBlink: true,
			theme: {
				background: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
				foreground: theme === "dark" ? "#D4D4D4" : "#333333",
				cursor: theme === "dark" ? "#FFFFFF" : "#333333",
				black: "#000000",
				red: "#E06C75",
				green: "#98C379",
				yellow: "#E5C07B",
				blue: "#61AFEF",
				magenta: "#C678DD",
				cyan: "#56B6C2",
				white: "#DCDFE4",
				brightBlack: "#808080",
				brightRed: "#E06C75",
				brightGreen: "#98C379",
				brightYellow: "#E5C07B",
				brightBlue: "#61AFEF",
				brightMagenta: "#C678DD",
				brightCyan: "#56B6C2",
				brightWhite: "#DCDFE4"
			},
			fontFamily: 'Menlo, Monaco, "Courier New", monospace',
			fontSize: 14,
			lineHeight: 1.2,
			convertEol: true,
			scrollback: 1000,
			allowTransparency: true
		})

		// Create fit addon
		const fitAddon = new FitAddon()
		terminal.loadAddon(fitAddon)

		// Store refs
		xtermRef.current = terminal
		fitAddonRef.current = fitAddon

		// Open terminal
		terminal.open(terminalRef.current)

		// Simulate Next.js project startup
		let currentDelay = 0
		startupSequence.forEach(({ text, delay }) => {
			currentDelay += delay
			setTimeout(() => {
				terminal.write(text)
			}, currentDelay)
		})

		// Fit terminal to container
		setTimeout(() => {
			if (fitAddonRef.current) {
				fitAddonRef.current.fit()
			}
		}, 100)

		// Handle resize
		const handleResize = () => {
			if (fitAddonRef.current) {
				fitAddonRef.current.fit()
			}
		}

		window.addEventListener("resize", handleResize)

		// Cleanup
		return () => {
			window.removeEventListener("resize", handleResize)
			if (xtermRef.current) {
				xtermRef.current.dispose()
			}
		}
	}, [theme])

	return (
		<div
			className="terminal-container rounded-none border-t border-[#333333] dark:border-[#404040] overflow-hidden h-full"
			style={{
				width: "100%",
				backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
			}}
		>
			{/* Terminal Header */}
			<div 
				className="terminal-header flex items-center justify-between px-4 h-9 bg-[#f3f3f3] dark:bg-[#252526] border-b border-[#dddddd] dark:border-[#404040]"
			>
				<div className="flex items-center gap-2">
					<span className="text-xs text-[#616161] dark:text-[#CCCCCC]">
						Terminal - npx create-next-app
					</span>
				</div>
				<div className="flex items-center gap-2">
					<button
						onClick={() => xtermRef.current?.clear()}
						className="hover:bg-[#e5e5e5] dark:hover:bg-[#404040] p-1 rounded"
					>
						<X className="w-4 h-4 text-[#616161] dark:text-[#CCCCCC]" />
					</button>
				</div>
			</div>

			{/* Terminal Content */}
			<div
				ref={terminalRef}
				style={{
					height: "calc(100% - 36px)",
					padding: "8px"
				}}
			/>
		</div>
	)
}

export default TerminalWindow
