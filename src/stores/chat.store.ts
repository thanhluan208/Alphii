import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { ChatboxProps } from "@/components/common/Chat/Chatbox"
import { Deepthink } from "@/components/common/Chat/deepthink/DeepThinking"
import { TreeNode } from "@/components/common/FolderTree/FolderTreeNodes"
import { ChatType } from "@/types"
import { cloneDeep } from "lodash"

interface chatState {
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
		isLoading?: boolean
	}
	setLoading: (value: { name?: string; isLoading: boolean }) => void

	messages: (ChatboxProps | Deepthink)[]
	setMessages: (value: ChatboxProps | Deepthink) => void
	updateDeepthinkContent: (agentName: string, content: string) => void
	updateFinishDeepThink: (agentName: string) => void
	nextCurrentFile: () => boolean

	viewDetail: boolean
	setViewDetail: (value: boolean) => void

	clearStore: () => void
}

const useChatStore = createWithEqualityFn<chatState>()(
	(set, get) => ({
		currentFile: null,
		setCurrentFile: (fullPath: string, shouldCheck = false) => {
			const currentFileExist = get().currentFile
			const newCurrentFile = cloneDeep(get().listFiles[fullPath])

			if (shouldCheck) {
				if (currentFileExist) {
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

		viewDetail: false,
		setViewDetail: (value: boolean) => set({ viewDetail: value }),

		messages: [],
		setMessages: (value: ChatboxProps | Deepthink) => {
			set({
				messages: [...get().messages, value]
			})
		},
		updateDeepthinkContent: (agentName: string, content: string) => {
			const msges = get().messages
			const setMsg = get().setMessages

			const lastDeepthinkIndex = msges?.findLastIndex(
				(msg) => "type" in msg && msg.type === ChatType.DEEPTHINK
			)

			const lastMsg = msges[lastDeepthinkIndex] as Deepthink

			if (lastDeepthinkIndex !== -1 && lastMsg.agentName === agentName) {
				const lastContent = lastMsg?.contents?.[lastMsg?.contents?.length - 1]

				if (lastContent === content) return

				const newMessage = msges.map((elm, index) => {
					if (
						index === lastDeepthinkIndex &&
						"type" in elm &&
						elm.type === ChatType.DEEPTHINK
					) {
						const curretnDeepthink = elm as Deepthink
						const newContent = [...curretnDeepthink.contents, content]

						return {
							...elm,
							contents: newContent
						}
					}
					return elm
				})

				set({
					messages: newMessage
				})

				return
			}

			setMsg({
				type: ChatType.DEEPTHINK,
				id: new Date().valueOf().toString(),
				contents: [content],
				agentName: agentName,
				isPending: true
			})
		},
		updateFinishDeepThink: (agentName: string) => {
			const msges = get().messages
			const lastDeepthinkIndex = msges?.findLastIndex(
				(msg) => "type" in msg && msg.type === ChatType.DEEPTHINK
			)

			const lastDeepthink = msges[lastDeepthinkIndex] as Deepthink

			if (lastDeepthinkIndex === -1 || lastDeepthink.agentName !== agentName)
				return

			const newMessage = msges.map((elm, index) => {
				if (
					index === lastDeepthinkIndex &&
					"type" in elm &&
					elm.type === ChatType.DEEPTHINK
				) {
					return {
						...elm,
						isPending: false
					}
				}
				return elm
			})

			set({
				messages: newMessage
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
		},

		clearStore: () =>
			set({
				currentFile: null,
				messages: [],
				listFiles: {},
				loading: {
					isLoading: false
				},
				viewDetail: false
			})
	}),
	shallow
)

export default useChatStore
