import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTheme } from "next-themes"

import { ResizablePanel } from "@/components/ui/resizable"
import { Editor, OnMount } from "@monaco-editor/react"
import * as monaco from "monaco-editor"

import useChatStore from "@/stores/fileStore"

const mockData = `
# 2048 Game PRD

## 1. Language & Project Info
- **Language**: English
- **Programming Language**: JavaScript, HTML, CSS
- **Project Name**: 2048_game

## 2. Product Definition
### Product Goals
1. Create a simple and engaging 2048 game that is easy to understand and play.
2. Implement responsive design to ensure compatibility across devices.
3. Provide a scoring system to track player progress and encourage replayability.

### User Stories
1. As a player, I want to swipe tiles to combine them so that I can reach the 2048 tile.
2. As a player, I want to see my current score so that I can track my progress.
3. As a player, I want to restart the game easily so that I can play again without refreshing the page.

### Competitive Analysis
- **Game A**: Pros: Engaging graphics; Cons: Complex rules.
- **Game B**: Pros: Simple interface; Cons: Limited features.
- **Game C**: Pros: Good performance; Cons: Ads interrupt gameplay.
- **Game D**: Pros: Multi-platform support; Cons: Requires internet connection.
- **Game E**: Pros: Customizable themes; Cons: In-app purchases.

### Competitive Quadrant Chart
quadrantChart
    title "Competitive Analysis of 2048 Games"
    x-axis "Low Engagement" --> "High Engagement"
    y-axis "Low Complexity" --> "High Complexity"
    quadrant-1 "Ideal Game"
    quadrant-2 "Needs Improvement"
    quadrant-3 "Too Complex"
    quadrant-4 "Not Engaging"
    "Game A": [0.7, 0.8]
    "Game B": [0.4, 0.3]
    "Game C": [0.6, 0.5]
    "Game D": [0.5, 0.6]
    "Game E": [0.3, 0.4]
    "Our Target Game": [0.8, 0.7]

## 3. Technical Specifications
### Requirements Analysis
- The game should be built using HTML, CSS, and JavaScript.
- It should support touch and keyboard inputs for gameplay.
- The game should save the high score in local storage.

### Requirements Pool
- **P0**: Must have a functional game board.
- **P1**: Should have a scoring system.
- **P2**: Nice to have customizable themes.

### UI Design Draft
- Basic layout with a grid for the game board.
- Score display at the top.
- Restart button.

### Open Questions
- What additional features should be included in future updates?
- How should the game handle high scores across different devices?

`

interface LanguageConfig {
	language: string
	compilerOptions?: monaco.languages.typescript.CompilerOptions
}

const TYPING_SPEED = 25 // ms
const MIN_CHARS = 2
const MAX_CHARS = 5

// Helper function to get random number of characters
const getRandomCharCount = () =>
	Math.floor(Math.random() * (MAX_CHARS - MIN_CHARS + 1)) + MIN_CHARS

const getLanguageConfig = (filePath: string): LanguageConfig => {
	const extension = filePath?.split(".").pop()?.toLowerCase()

	switch (extension) {
		case "jsx":
			return {
				language: "javascript",
				compilerOptions: {
					jsx: monaco.languages.typescript.JsxEmit.React,
					allowJs: true,
					target: monaco.languages.typescript.ScriptTarget.ESNext,
					moduleResolution:
						monaco.languages.typescript.ModuleResolutionKind.NodeJs,
					module: monaco.languages.typescript.ModuleKind.ESNext
				}
			}
		case "tsx":
			return {
				language: "typescript",
				compilerOptions: {
					target: monaco.languages.typescript.ScriptTarget.ESNext,
					allowNonTsExtensions: true,
					moduleResolution:
						monaco.languages.typescript.ModuleResolutionKind.NodeJs,
					module: monaco.languages.typescript.ModuleKind.ESNext,
					noEmit: true,
					jsx: monaco.languages.typescript.JsxEmit.React,
					reactNamespace: "React",
					allowJs: true
				}
			}
		case "md":
			return { language: "markdown" }
		case "html":
			return { language: "html" }
		case "css":
			return { language: "css" }
		case "mermaid":
			return { language: "mermaid" }
		default:
			return {
				language: "typescript",
				compilerOptions: {
					target: monaco.languages.typescript.ScriptTarget.ESNext,
					allowNonTsExtensions: true,
					moduleResolution:
						monaco.languages.typescript.ModuleResolutionKind.NodeJs,
					module: monaco.languages.typescript.ModuleKind.ESNext,
					noEmit: true,
					jsx: monaco.languages.typescript.JsxEmit.React,
					reactNamespace: "React",
					allowJs: true
				}
			}
	}
}

// Custom theme configurations
const darkTheme: monaco.editor.IStandaloneThemeData = {
	base: "vs-dark" as const,
	inherit: true,
	rules: [
		{ token: "comment", foreground: "6A9955", fontStyle: "italic" },
		{ token: "keyword", foreground: "C678DD" },
		{ token: "string", foreground: "CE9178" },
		{ token: "identifier", foreground: "9CDCFE" },
		{ token: "type", foreground: "4EC9B0" },
		{ token: "number", foreground: "B5CEA8" },
		{ token: "delimiter", foreground: "D4D4D4" },
		{ token: "tag", foreground: "569CD6" },
		{ token: "attribute.name", foreground: "9CDCFE" },
		{ token: "attribute.value", foreground: "CE9178" }
	],
	colors: {
		"editor.background": "#1E1E1E",
		"editor.foreground": "#D4D4D4",
		"editor.lineHighlightBackground": "#2F3139",
		"editor.selectionBackground": "#264F78",
		"editor.inactiveSelectionBackground": "#3A3D41"
	}
}

const lightTheme: monaco.editor.IStandaloneThemeData = {
	base: "vs" as const,
	inherit: true,
	rules: [
		{ token: "comment", foreground: "008000", fontStyle: "italic" },
		{ token: "keyword", foreground: "0000FF" },
		{ token: "string", foreground: "A31515" },
		{ token: "identifier", foreground: "001080" },
		{ token: "type", foreground: "267f99" },
		{ token: "number", foreground: "098658" },
		{ token: "delimiter", foreground: "000000" },
		{ token: "tag", foreground: "0000FF" },
		{ token: "attribute.name", foreground: "001080" },
		{ token: "attribute.value", foreground: "A31515" }
	],
	colors: {
		"editor.background": "#FFFFFF",
		"editor.foreground": "#000000",
		"editor.lineHighlightBackground": "#F7F7F7",
		"editor.selectionBackground": "#ADD6FF",
		"editor.inactiveSelectionBackground": "#E5EBF1"
	}
}

const CodeEditor = () => {
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
	const theme = useTheme()
	const { currentFile, nextCurrentFile, loading } = useChatStore()
	const [displayedContent, setDisplayedContent] = useState("")
	const [themesRegistered, setThemesRegistered] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout>()

	console.log(`[LOG - CodeEditor]: currentFile`, currentFile)

	const { lastStop, animationState } = currentFile || {}

	const currentFileContent = useMemo(() => {
		if (!currentFile) return mockData
		return currentFile.content
	}, [currentFile])

	// Compute current theme for Monaco Editor
	const currentMonacoTheme = useMemo(() => {
		if (!themesRegistered) return "vs-dark" // fallback until themes are registered
		const currentTheme = theme.resolvedTheme || theme.theme || "dark"
		return currentTheme === "dark" ? "customDarkTheme" : "customLightTheme"
	}, [theme.resolvedTheme, theme.theme, themesRegistered])

	console.log("Current Monaco Theme:", currentMonacoTheme)
	console.log("Resolved Theme:", theme.resolvedTheme)
	console.log("Theme:", theme.theme)

	// Handle typewriter effect
	useEffect(() => {
		if (!currentFileContent) return

		if (animationState === "select") {
			setDisplayedContent(currentFileContent)
			return
		}

		setDisplayedContent(lastStop ? currentFileContent.slice(0, lastStop) : "")
		let currentPosition = lastStop || 0

		const typeNextChunk = () => {
			if (!currentFileContent) return

			const charsToType = getRandomCharCount()
			const nextChunk = currentFileContent.slice(
				currentPosition,
				currentPosition + charsToType
			)
			currentPosition += charsToType

			setDisplayedContent((prev) => prev + nextChunk)

			if (currentPosition < currentFileContent.length) {
				timeoutRef.current = setTimeout(typeNextChunk, TYPING_SPEED)
			} else {
				// When typing is complete, call nextCurrentFile
				const hasNext = nextCurrentFile()
				if (!hasNext) {
					// Animation sequence is complete
					console.log("Animation sequence complete")
				}
			}
		}

		timeoutRef.current = setTimeout(typeNextChunk, TYPING_SPEED)

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current)
			}
		}
	}, [currentFileContent, nextCurrentFile, animationState, lastStop])

	const handleEditorDidMount: OnMount = useCallback(
		(editor, monacoInstance) => {
			editorRef.current = editor

			// Register custom themes after Monaco is ready
			try {
				monacoInstance.editor.defineTheme("customDarkTheme", darkTheme)
				monacoInstance.editor.defineTheme("customLightTheme", lightTheme)
				setThemesRegistered(true)
				console.log("Custom themes registered successfully")
			} catch (error) {
				console.error("Failed to register themes:", error)
			}

			editor.updateOptions({
				minimap: {
					enabled: false
				},
				readOnly: loading?.isLoading,
				fontSize: 14,
				lineHeight: 21,
				fontFamily: "'JetBrains Mono', Menlo, Monaco, 'Courier New', monospace",
				fontLigatures: true,
				renderWhitespace: "none",
				scrollBeyondLastLine: false,
				smoothScrolling: true,
				cursorBlinking: "smooth",
				cursorSmoothCaretAnimation: "on"
			})

			if (!currentFile?.fullPath) return

			const config = getLanguageConfig(currentFile.fullPath)

			// Configure language specific options if needed
			if (
				(config.language === "typescript" ||
					config.language === "javascript") &&
				config.compilerOptions
			) {
				monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions(
					config.compilerOptions
				)

				// Configure JSX/TSX specific token providers
				monacoInstance.languages.typescript.typescriptDefaults.setDiagnosticsOptions(
					{
						noSemanticValidation: false,
						noSyntaxValidation: false
					}
				)
			}

			// Get the current model
			const model = editor.getModel()
			if (model) {
				const newModel = monacoInstance.editor.createModel(
					model.getValue(),
					config.language,
					monacoInstance.Uri.file(`inmemory://model.${config.language}`)
				)

				editor.setModel(newModel)
				model.dispose()
			}
		},
		[currentFile, loading?.isLoading]
	)

	// Update editor content and readonly state
	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.updateOptions({
				readOnly: loading?.isLoading
			})
		}
	}, [loading?.isLoading])

	// Update editor content when displayedContent changes
	useEffect(() => {
		if (editorRef.current && displayedContent !== undefined) {
			editorRef.current.setValue(displayedContent)
		}
	}, [displayedContent])

	// Handle theme changes after themes are registered
	useEffect(() => {
		if (!editorRef.current || !themesRegistered) return

		const targetTheme = currentMonacoTheme
		console.log("Applying theme:", targetTheme)

		try {
			monaco.editor.setTheme(targetTheme)
		} catch (error) {
			console.error("Failed to set theme:", error)
		}
	}, [currentMonacoTheme, themesRegistered])

	return (
		<Editor
			height="calc(100%)"
			defaultLanguage="typescript"
			defaultValue=""
			onMount={handleEditorDidMount}
			theme={currentMonacoTheme}
			options={{
				readOnly: loading?.isLoading
			}}
		/>
	)
}

export default CodeEditor
