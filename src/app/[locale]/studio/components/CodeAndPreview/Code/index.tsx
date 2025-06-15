"use client"

import TerminalWindow from "@/app/[locale]/test/TerminalWindow"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup
} from "@/components/ui/resizable"

import CodeEditor from "./CodeEditor"
import FolderTree from "./FolderTree"

const Code = () => {
	return (
		<ResizablePanelGroup
			direction="horizontal"
			className="w-full "
		>
			<FolderTree />
			<CodeEditor />
		</ResizablePanelGroup>
	)

	// return (
	// 	<ResizablePanelGroup
	// 		direction="vertical"
	// 		className="w-full !h-[calc(100%-57px)]"
	// 	>
	// 		<ResizablePanel defaultSize={100}>
	// 			<ResizablePanelGroup
	// 				direction="horizontal"
	// 				className="w-full  !h-[calc(100%-57px)]"
	// 			>
	// 				<FolderTree />
	// 				<CodeEditor />
	// 			</ResizablePanelGroup>
	// 		</ResizablePanel>
	// 		<ResizableHandle />
	// 		<ResizablePanel defaultSize={25}>
	// 			<div className="h-full">
	// 				<TerminalWindow />
	// 			</div>
	// 		</ResizablePanel>
	// 	</ResizablePanelGroup>
	// )
}

export default Code
