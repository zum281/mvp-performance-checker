import { isValidUrl } from "@/lib/server/utils";
import * as chromeLauncher from "chrome-launcher";
import type { Flags, Result } from "lighthouse";
import lighthouse from "lighthouse";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
	reports?: Result[];
	error?: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
	const urlList: string[] = JSON.parse(req.body).urlList;

	console.log(urlList)

	for (const url of urlList) {
		if (!isValidUrl(url)) res.status(400);
	}

	const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
	const options: Flags = { logLevel: "info", output: "json", onlyCategories: ["performance"], port: chrome.port };

	console.log("here 1");

	try {
		const reports = [];
		for (const page of urlList) {
			const runnerResult = await lighthouse(page, options);

			console.log("here 2");

			reports.push(runnerResult!.lhr);
		}

		console.log(reports);

		chrome.kill();

		res.status(200).json({ reports });
	} catch (error) {
		console.error("Error in handler:", error);
		res.status(500).json({ error: error });
	}
}
