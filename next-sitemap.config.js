const nextSitemapConfig = {
	siteUrl: "https://alphii-ai-fe.vercel.app",
	generateRobotsTxt: true,
	generateIndexSitemap: false,
	exclude: ["/admin/*", "/api/*", "/private/*"],
	robotsTxtOptions: {
		policies: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/admin", "/api", "/private"]
			}
		],
		additionalSitemaps: ["https://alphii-ai-fe.vercel.app/sitemap.xml"]
	},
	transform: async (config, path) => {
		// Custom priority and changefreq based on page type
		const customConfig = {
			loc: path,
			changefreq: "weekly",
			priority: 0.7,
			lastmod: new Date().toISOString()
		}

		// Higher priority for important pages
		if (path === "/") {
			customConfig.priority = 1.0
			customConfig.changefreq = "daily"
		} else if (path.includes("/features") || path.includes("/pricing")) {
			customConfig.priority = 0.9
			customConfig.changefreq = "weekly"
		}

		return customConfig
	}
}
