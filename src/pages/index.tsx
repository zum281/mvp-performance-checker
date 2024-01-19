import { useState } from "react";
import type { Result } from "lighthouse";

export default function Home() {
	const [loading, setLoading] = useState(false);
	const [lighthouseReports, setLighthouseReports] = useState<Result[] | undefined>();

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		const { sitename } = e.target.elements;
		setLoading(true);
		setLighthouseReports(undefined);
		const res = await fetch("/api/lighthouse", {
			method: "POST",
			body: JSON.stringify({ sitename: sitename.value }),
		});

		if (res) {
			const { reports } = await res.json();

			if (reports) {
				setLighthouseReports(reports);
				setLoading(false);
			}
		}
	};

	return (
		<main className={`flex min-h-screen flex-col items-center p-24 gap-20`}>
			<form onSubmit={handleSubmit} className="flex items-end gap-3">
				<label className="flex flex-col">
					<span>Site URL</span>
					<input type="text" name="sitename" className="rounded-md border border-black p-2" />
				</label>
				<button
					type="submit"
					className="rounded-md border border-blue-500 bg-blue-500 text-white p-2 uppercase hover:text-blue-500 hover:bg-white transition-all duration-300 ease-in-out">
					Submit
				</button>
			</form>
			{loading && <div className="loader" aria-label="Loading report... Please wait" />}
			{lighthouseReports && lighthouseReports.length > 0 && (
				<section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{lighthouseReports.map((report) => (
						<article
							id="report"
							key={report.finalDisplayedUrl}
							className="flex flex-col items-center max-w-sm text-center mx-auto mt-5 shadow-md rounded-xl p-2">
							<h3 className="mb-3 text-base line-clamp-2">Report for {report.finalDisplayedUrl}</h3>
							<div className="flex flex-col border p-3 gap-1 items-center text-center mx-auto w-fit rounded-xl">
								<h2>Performance Score</h2>
								<p className="text-6xl font-bold">
									{Number(report.categories.performance.score) * 100}
								</p>
							</div>
						</article>
					))}
					{lighthouseReports && lighthouseReports.length === 0 && (
						<section>
							<p>No reports to show</p>
						</section>
					)}
				</section>
			)}
		</main>
	);
}
