"use client"

import React from "react"
import dynamic from "next/dynamic"

// Import the terminal component with dynamic import to ensure client-side only rendering
const TerminalWindow = dynamic(() => import("./TerminalWindow"), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: "100%",
				height: "300px",
				backgroundColor: "#1E1E1E",
				borderRadius: "6px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				color: "#E5E5E5"
			}}
		>
			Loading terminal...
		</div>
	)
})

const TerminalContainer = () => {
	return (
		<div
			className="terminal-outer-container"
			style={{
				padding: "20px",
				maxWidth: "800px",
				margin: "0 auto"
			}}
		>
			<TerminalWindow />
		</div>
	)
}

export default TerminalContainer
