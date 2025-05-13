"use client"

import React, { useRef } from "react"

import Editor, { OnMount } from "@monaco-editor/react"
import * as monaco from "monaco-editor"

const DevTeam = () => {
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

	const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
		// Set the editor reference
		editorRef.current = editor

		// Configure TypeScript compiler options
		monacoInstance.languages.typescript.typescriptDefaults.setCompilerOptions({
			target: monacoInstance.languages.typescript.ScriptTarget.ESNext,
			allowNonTsExtensions: true,
			moduleResolution:
				monacoInstance.languages.typescript.ModuleResolutionKind.NodeJs,
			module: monacoInstance.languages.typescript.ModuleKind.ESNext,
			noEmit: true,
			jsx: monacoInstance.languages.typescript.JsxEmit.React,
			reactNamespace: "React",
			allowJs: true
		})

		// Get the current model
		const model = editor.getModel()
		if (model) {
			// Dispose of the current model (optional, ensures a clean slate)
			// model.dispose();

			// Create a new model with a .tsx extension
			const newModel = monacoInstance.editor.createModel(
				model.getValue(), // Keep the current content
				"typescript", // Language
				monacoInstance.Uri.file("inmemory://model.tsx") // Explicit .tsx extension
			)

			// Attach the new model to the editor
			editor.setModel(newModel)

			// Clean up the old model if needed
			model.dispose()
		}
	}

	function showValue() {
		if (!editorRef.current) return
		alert(editorRef.current.getValue())
	}

	function addValue() {
		const code = `
"use client"

import React, { useRef } from "react"

import Editor, { OnMount } from "@monaco-editor/react"
import * as monaco from "monaco-editor"

const DevTeam = () => {
    const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

    const handleEditorDidMount: OnMount = (editor, monaco) => {
        editorRef.current = editor
    }

    function showValue() {
        if (!editorRef.current) return
        alert(editorRef.current.getValue())
    }

    function addValue() {
        
    }

    return (
        <div className="w-full h-screen bg-white">
            <button onClick={showValue}>show value</button>
            <button onClick={addValue}>Add value</button>
            <Editor
                height="90vh"
                defaultLanguage="typescript"
                defaultValue="// some comment"
                onMount={handleEditorDidMount}
            />
        </div>
    )
}

export default DevTeam
        `.trim()

		let fullContent = ""
		let position = 0

		function addChunk() {
			if (position >= code.length) {
				return
			}
			const remaining = code.length - position
			const toAdd = Math.min(remaining, Math.floor(Math.random() * 5) + 1)
			const chunk = code.substring(position, position + toAdd)
			fullContent += chunk
			position += toAdd
			if (editorRef.current) {
				editorRef.current.setValue(fullContent)
			}
			setTimeout(addChunk, 10)
		}

		addChunk()
	}
	return (
		<div className="w-full h-screen bg-white">
			<button onClick={showValue}>show value</button>
			<button onClick={addValue}>Add value</button>
			<Editor
				height="90vh"
				defaultLanguage="typescript"
				defaultValue="// some comment"
				onMount={handleEditorDidMount}
			/>
		</div>
	)
}

export default DevTeam
