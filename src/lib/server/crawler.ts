import { PlaywrightCrawler, Sitemap } from "crawlee";

export const crawlWebsite = async (url: string) => {
	return new Promise(async (resolve) => {
		const allUrls = new Set(); // Use a Set to ensure uniqueness of URLs

		const crawler = new PlaywrightCrawler({
			async requestHandler({ request, enqueueLinks, log }) {
				const currentUrl = request.url;
				log.info(currentUrl);

				// Add the current URL to the set
				allUrls.add(currentUrl);

				// Add all links from the page to the RequestQueue
				await enqueueLinks();
			},
		});

		// Run the crawler with the initial request
		await crawler.run([url]);

		// Convert the Set to an array if needed
		const allUrlsArray = Array.from(allUrls);

		resolve(allUrlsArray);
	});
};

export const crawlSitemap = async (sitemapUrl: string) => {
	const { urls } = await Sitemap.load(sitemapUrl);
	return urls;
};
