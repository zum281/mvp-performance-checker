import { crawlSitemap } from "@/lib/server/crawler";
import * as chromeLauncher from "chrome-launcher";
import type { Flags, Result } from "lighthouse";
import lighthouse from "lighthouse";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	reports?: Result[];
	error?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const siteName: string = String(JSON.parse(req.body).sitename);

	// TODO: why is this not a valid url? https://dietista-flavia-porporino9.webnode.it/sitemap.xml
	// if (!isValidUrl(siteName)) res.status(400);
	// const siteUrl = normalizeUrl(siteName);

	// const pages: string[] = await crawlSitemap(siteUrl);
	const pages: string[] = await crawlSitemap(siteName);
	console.log(pages); //empy for https://dietista-flavia-porporino9.webnode.it/sitemap.xml

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
