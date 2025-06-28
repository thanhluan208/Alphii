"use client"

import React from "react"
import dynamic from "next/dynamic"
import TerminalWindow from "./TerminalWindow"


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
