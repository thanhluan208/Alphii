export const siteConfig = {
	title: "AlphiiAI",
	description:
		"Build wonders with your customizable A2A team. Create intelligent agents that think and act independently, plan, communicate, and accomplish tasks seamlessly.",
	keywords: [
		"A2A",
		"AI Agents",
		"Team Automation",
		"Customizable AI",
		"Agent Collaboration",
		"AI Team Building",
		"Autonomous Agents",
		"AI Planning",
		"Team Templates",
		"Agent Communication",
		"AI Development",
		"Alphii AI"
	],
	author: {
		name: "AlphiiAI",
		url: "https://alphii-ai-fe.vercel.app"
	},
	// Add canonical URL
	canonicalUrl: "https://alphii-ai-fe.vercel.app",

	// Add structured data
	organization: {
		"@context": "https://schema.org",
		"@type": "Organization",
		name: "AlphiiAI",
		url: "https://alphii-ai-fe.vercel.app",
		logo: "https://alphii-ai-fe.vercel.app/images/logo.png",
		description:
			"Build intelligent AI agent teams that collaborate autonomously",
		foundingDate: "2024",
		sameAs: [
			"https://twitter.com/alphii"
			// Add other social media URLs
		]
	},

	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://alphii-ai-fe.vercel.app",
		title: "AlphiiAI - Build Your Customizable A2A Team",
		description:
			"Create intelligent agents that think and act independently. Start fast with templates or build from scratch. Your agents sync, share context, and collaborate seamlessly like a real team.",
		siteName: "AlphiiAI",
		images: [
			{
				url: "https://alphii-ai-fe.vercel.app/images/social.jpeg", // Use absolute URL
				width: 1200,
				height: 630,
				alt: "AlphiiAI - Build Your Customizable A2A Team"
			}
		]
	},
	twitter: {
		card: "summary_large_image",
		title: "AlphiiAI - Intelligent A2A Team Building",
		description:
			"Build agents that think and act—on their own, or with your team. They plan, talk, and get things done. No hand-holding. No downtime.",
		creator: "@alphii",
		site: "@alphii", // Add site handle
		images: ["https://alphii-ai-fe.vercel.app/images/social.jpeg"] // Use absolute URL
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large" as const,
			"max-snippet": -1
		}
	},
	features: {
		main: "Build wonders with your customizable A2A team",
		highlights: [
			"Start fast or make it yours. Pick a team template to get started or make one from scratch, fully customizable.",
			"Agents that talk to agents. Your agents sync, share context, and collaborate seamlessly just like a real team.",
			"You're part of the loop. With everything visible you can join in, guide, or simply observe because it's your team too."
		]
	},

	// Add FAQ structured data
	faq: [
		{
			question: "What is A2A (Agent-to-Agent) technology?",
			answer:
				"A2A enables AI agents to communicate and collaborate with each other autonomously, creating intelligent teams that can plan, execute, and adapt to complete complex tasks."
		},
		{
			question: "How do AlphiiAI agents collaborate?",
			answer:
				"Our agents sync contexts, share information, and coordinate actions seamlessly, working together like a real team to accomplish your goals."
		}
		// Add more relevant FAQs
	]
}
