"use client"

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"

import CodeEditor from "./CodeEditor"
import FolderTree from "./FolderTree"

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
				<div className="border-t border-alphii_border_2 h-full px-3 py-2.5">TWO</div>
			</ResizablePanel>
		</ResizablePanelGroup>
	)
}

export default Code
