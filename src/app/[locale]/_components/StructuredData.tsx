import { siteConfig } from "@/config"

export function StructuredData() {
	const organizationSchema = {
		...siteConfig.organization
	}

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteConfig.title,
		url: siteConfig.canonicalUrl,
		description: siteConfig.description,
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteConfig.canonicalUrl}/search?q={search_term_string}`
			},
			"query-input": "required name=search_term_string"
		}
	}

	const softwareSchema = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: siteConfig.title,
		description: siteConfig.description,
		url: siteConfig.canonicalUrl,
		applicationCategory: "BusinessApplication",
		operatingSystem: "Web Browser",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "USD"
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.8",
			ratingCount: "150"
		}
	}

	const faqSchema = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: siteConfig.faq.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer
			}
		}))
	}

	return (
		<>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
			/>
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
			/>
		</>
	)
}
