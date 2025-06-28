import LexicalEditor from "@/components/common/LexicalEditor"

export default function Home() {
	return (
		<main className="min-h-screen bg-background py-8">
			<div className="container mx-auto">
				<div className="text-center mb-8">
					<h1 className="text-3xl font-bold mb-2">
						Lexical Editor with Mentions & Commands
					</h1>
					<p className="text-muted-foreground">
						A rich text editor with @ mentions and / commands
					</p>
				</div>
				<LexicalEditor />
			</div>
		</main>
	)
}
