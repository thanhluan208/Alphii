import React from "react"

import TerminalContainer from "./TerminalContainer"

const Test = () => {
	return (
		<div className="h-screen w-screen bg-white">
			<div className="page-container" style={{ padding: "2rem" }}>
				<h1>Terminal Demo</h1>
				<TerminalContainer />
			</div>
		</div>
	)
}

export default Test
