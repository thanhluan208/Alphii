import { shallow } from "zustand/shallow"
import { createWithEqualityFn } from "zustand/traditional"
import { ChatboxProps } from "@/components/common/Chat/Chatbox"
import { Deepthink } from "@/components/common/Chat/deepthink/DeepThinking"
import { TreeNode } from "@/components/common/FolderTree/FolderTreeNodes"
import { ChatType } from "@/types"
import { cloneDeep } from "lodash"

interface chatState {
	currentFile: TreeNode | null
	setCurrentFile: (file: TreeNode) => void

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

	viewDetail: boolean
	setViewDetail: (value: boolean) => void

	clearStore: () => void
}

const useChatStore = createWithEqualityFn<chatState>()(
	(set, get) => ({
		currentFile: null,
		setCurrentFile: (file: TreeNode) => {
			const currentFileExist = get().currentFile

			if (currentFileExist && currentFileExist.fullPath === file.fullPath) {
				set({
					currentFile: {
						...file,
						typedContent: currentFileExist.content || ""
					}
				})
			} else {
				set({ currentFile: file })
			}
		},
		listFiles: {},
		addFile: (value: TreeNode[]) => {
			const oldFiles = cloneDeep(get().listFiles)
			const oldFilesKey = Object.keys(oldFiles)

			console.log("new files", value)

			value.forEach((newFile) => {
				const currSegmentPath = newFile.fullPath.split("/")

				if (currSegmentPath.length > 1) {
					for (let i = 0; i < currSegmentPath.length - 1; i++) {
						const currPath = currSegmentPath.slice(0, i + 1).join("/")

						if (!oldFiles[currPath]) {
							console.log('new folder !', currPath)
							oldFiles[currPath] = {
								name: currSegmentPath[i],
								type: "folder",
								fullPath: currPath,
								status: "new",
								lastModified: newFile.lastModified,
								typedContent: ""
							}
						}
					}
				}

				if (oldFilesKey.includes(newFile.fullPath)) {
					console.log(
						"Fullpath single exist",
						newFile,
						oldFiles[newFile.fullPath]
					)
					oldFiles[newFile.fullPath] = {
						...oldFiles[newFile.fullPath],
						...newFile,
						typedContent: oldFiles[newFile.fullPath]?.content || ""
					}
				} else {
					console.log("fullpath single not exist", newFile)
					oldFiles[newFile.fullPath] = newFile
				}
			})

			console.log("oldFiles", oldFiles)

			set({
				listFiles: oldFiles
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
