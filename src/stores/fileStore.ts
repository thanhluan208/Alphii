import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { ChatboxProps } from "@/app/[locale]/_showcases/components/Chatbox"
import { TreeNode } from "@/components/common/FolderTree/FolderTreeNodes"
import { cloneDeep } from "lodash"

interface fileState {
	currentFile: TreeNode | null
	setCurrentFile: (fullPath: string, shouldCheck?: boolean) => void
	listFiles: {
		[key: string]: TreeNode
	}
	addFile: (value: TreeNode[], fileIndex?: number) => void
	removeFile: (value: TreeNode) => void
	updateFile: (value: TreeNode) => void
	loading: {
		name?: string
		isLoading: boolean
	}
	setLoading: (value: { name?: string; isLoading: boolean }) => void

	messages: ChatboxProps[]
	setMessages: (value: ChatboxProps) => void
	nextCurrentFile: () => boolean
}

const useFileStore = createWithEqualityFn<fileState>()(
	(set, get) => ({
		currentFile: null,
		setCurrentFile: (fullPath: string, shouldCheck = false) => {
			const currentFileExist = get().currentFile
			const newCurrentFile = cloneDeep(get().listFiles[fullPath])

			if (shouldCheck) {
				if (currentFileExist) {
					console.log(`[LOG - setCurrentFile]: currentFileExist`, {
						currentFileExist
					})
					if (currentFileExist.fullPath !== fullPath) {
						get().nextCurrentFile()
						return
					}

					if (
						currentFileExist.lastStop &&
						newCurrentFile?.content?.length &&
						currentFileExist.lastStop === newCurrentFile?.content?.length
					) {
						return
					}
				}
			}

			newCurrentFile.animationState = shouldCheck ? "new" : "select"

			if (
				currentFileExist &&
				currentFileExist.fullPath === newCurrentFile.fullPath
			) {
				newCurrentFile.lastStop = currentFileExist.content?.length || 0
			}

			if (newCurrentFile) {
				set({ currentFile: newCurrentFile })
			}
		},
		listFiles: {},
		addFile: (value: TreeNode[], fileIndex?: number) => {
			set({
				listFiles: {
					...get().listFiles,
					...value.reduce(
						(acc: Record<string, TreeNode>, curr) => {
							const currSegmentPath = curr.fullPath.split("/")

							if (currSegmentPath.length === 1) {
								acc[curr.fullPath] = {
									...curr,
									index: fileIndex,
									animationState: "new"
								}
								return acc
							}

							for (let i = 0; i < currSegmentPath.length - 1; i++) {
								const currPath = currSegmentPath.slice(0, i + 1).join("/")

								if (!acc[currPath]) {
									acc[currPath] = {
										name: currSegmentPath[i],
										type: "folder",
										fullPath: currPath,
										status: "new",
										lastModified: curr.lastModified
									}
								}
							}

							acc[curr.fullPath] = {
								...curr,
								index: fileIndex,
								animationState: "new"
							}
							return acc
						},
						{} as Record<string, TreeNode>
					)
				}
			})
		},
		removeFile: (value: TreeNode) => {
			set({
				listFiles: {
					...get().listFiles,
					[value.fullPath]: value
				}
			})
		},
		updateFile: (value: TreeNode) => {
			set({
				listFiles: {
					...get().listFiles,
					[value.fullPath]: value
				}
			})
		},
		loading: {
			isLoading: false
		},
		setLoading: (value: { name?: string; isLoading: boolean }) => {
			set({
				loading: value
			})
		},
		messages: [],
		setMessages: (value: ChatboxProps) => {
			set({
				messages: [...get().messages, value]
			})
		},
		nextCurrentFile: () => {
			const currentFile = cloneDeep(get().currentFile)

			if (currentFile) {
				currentFile.animationState = "select"
				currentFile.lastStop = currentFile.content?.length || 0
			}

			if (currentFile?.index) {
				const listFiles = get().listFiles
				const nextCurrentFile = Object.values(listFiles).find(
					(file) =>
						currentFile.index !== undefined &&
						file.index === currentFile.index + 1
				)

				if (nextCurrentFile) {
					set({
						currentFile: nextCurrentFile,
						listFiles: {
							...listFiles,
							[currentFile.fullPath]: currentFile
						}
					})
					return true
				}

				set({
					listFiles: {
						...listFiles,
						[currentFile.fullPath]: currentFile
					}
				})
			}

			return false
		}
	}),
	shallow
)

export default useFileStore
