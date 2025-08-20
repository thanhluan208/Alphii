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

			<div className="w-full h-screen bg-gray-100 p-4">
				<div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden">
					<div className="bg-gray-800 text-white px-4 py-2 text-sm font-medium">
						Interactive Website
					</div>
					<iframe
						src="http://a2990499b0674d69b43e8081a76220ff.alphiiai.com/"
						className="w-full h-full border-0"
						title="Interactive Website"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</div>
			</div>
		</main>
	)
}
