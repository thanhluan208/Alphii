"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import CodeEditor from "./CodeEditor"
import FolderTree from "./FolderTree"
import TerminalWindow from "@/app/[locale]/test/TerminalWindow"

const Code = () => {
	return (
		<ResizablePanelGroup
			direction="vertical"
			className="w-full !h-[calc(100%-57px)]"
		>
			<ResizablePanel defaultSize={75}>
				<ResizablePanelGroup direction="horizontal" className="w-full">
					<FolderTree />
					<CodeEditor />
				</ResizablePanelGroup>
			</ResizablePanel>
			<ResizableHandle />
			<ResizablePanel defaultSize={25}>
				<div className="h-full">
					<TerminalWindow />
				</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}

export default Code
