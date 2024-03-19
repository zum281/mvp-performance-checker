import { crawlSitemap } from "@/lib/server/crawler";
import { isValidUrl, normalizeUrl } from "@/lib/server/utils";
import * as chromeLauncher from "chrome-launcher";
import type { Flags, Result } from "lighthouse";
import lighthouse from "lighthouse";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	reports?: Result[];
	error?: any;
};

export async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const sitemapUrl: string = String(JSON.parse(req.body).sitemapUrl);

	if (!isValidUrl(sitemapUrl)) res.status(400);
	const siteUrl = normalizeUrl(sitemapUrl);

	const pages: string[] = await crawlSitemap(siteUrl);
	console.log(pages);

	const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
	const options: Flags = { logLevel: "info", output: "json", onlyCategories: ["performance"], port: chrome.port };

	try {
		const reports = [];
		for (const page of pages) {
			const runnerResult = await lighthouse(page, options);
			reports.push(runnerResult!.lhr);
		}

		chrome.kill();

		res.status(200).json({ reports });
	} catch (error) {
		console.error("Error in handler:", error);
		res.status(500).json({ error: error });
	}
}
