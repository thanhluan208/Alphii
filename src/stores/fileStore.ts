import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { TreeNode } from "@/components/common/FolderTree/FolderTreeNodes"

interface fileState {
	currentFile: TreeNode | null
	setCurrentFile: (value: TreeNode | null) => void
}

const useFileStore = createWithEqualityFn<fileState>()(
	(set) => ({
		currentFile: null,
		setCurrentFile: (value: TreeNode | null) => {
			if (!value) return

			set({
				currentFile: value
			})
		}
	}),
	shallow
)

export default useFileStore
