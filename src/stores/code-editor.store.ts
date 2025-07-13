import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"

interface codeEditorState {
	openFolderTree: boolean
	setOpenFolderTree: (value: boolean) => void
}

const useCodeEditorStore = createWithEqualityFn<codeEditorState>()(
	(set) => ({
		openFolderTree: false,
		setOpenFolderTree: (value: boolean) => set({ openFolderTree: value })
	}),
	shallow
)

export default useCodeEditorStore
