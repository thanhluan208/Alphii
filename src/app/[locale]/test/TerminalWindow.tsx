"use client"

import React, { useEffect, useRef } from "react"

import { FitAddon } from "@xterm/addon-fit"
import { Terminal, Terminal as XTerm } from "@xterm/xterm"

import "@xterm/xterm/css/xterm.css"

const TerminalWindow = () => {
	const terminalRef = useRef(null)
	const xtermRef = useRef<Terminal | null>(null)
	const fitAddonRef = useRef<FitAddon | null>(null)

	// Sample error message to display in terminal
	const errorMessage = [
		"\x1b[31m\x1b[1mX\x1b[22m\x1b[39m ReferenceError: self is not defined",
		"    at __webpack_require__ (/home/project/.next/server/webpack-runtime.js#cjs:33:42)",
		"    at eval (./components/ui/terminal-window.tsx:9:63)",
		"    at (ssr)/./components/ui/terminal-window.tsx (/home/project/.next/server/app/page.js#cjs:173:1)",
		"    at __webpack_require__ (/home/project/.next/server/webpack-runtime.js#cjs:33:42)",
		"    at eval (./components/terminal-container.tsx:9:88)",
		"    at (ssr)/./components/terminal-container.tsx (/home/project/.next/server/app/page.js#cjs:129:1)",
		"    at __webpack_require__ (/home/project/.next/server/webpack-runtime.js#cjs:33:42)"
	]

	useEffect(() => {
		// Initialize terminal only on client side
		if (!terminalRef.current) return

		// Create terminal instance
		const terminal = new XTerm({
			cursorBlink: true,
			theme: {
				background: "#1E1E1E",
				foreground: "#F8F8F8",
				cursor: "#FFFFFF",
				black: "#000000",
				red: "#E06C75",
				green: "#98C379",
				yellow: "#E5C07B",
				blue: "#61AFEF",
				magenta: "#C678DD",
				cyan: "#56B6C2",
				white: "#DCDFE4"
			},
			fontFamily: 'Menlo, Monaco, "Courier New", monospace',
			fontSize: 14,
			lineHeight: 1.2,
			convertEol: true
		})

		// Create fit addon
		const fitAddon = new FitAddon()
		terminal.loadAddon(fitAddon)

		// Store refs
		xtermRef.current = terminal
		fitAddonRef.current = fitAddon

		// Open terminal
		terminal.open(terminalRef.current)

		// Write error message
		errorMessage.forEach((line) => {
			terminal.writeln(line)
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
	}, [])

	return (
		<div
			className="terminal-container"
			style={{
				width: "100%",
				height: "150px",
				backgroundColor: "#1E1E1E",
				borderRadius: "6px",
				overflow: "hidden",
				border: "1px solid #333"
			}}
		>
			<div
				ref={terminalRef}
				style={{
					height: "calc(100% - 36px)",
					padding: "2px"
				}}
			/>
		</div>
	)
}

export default TerminalWindow
