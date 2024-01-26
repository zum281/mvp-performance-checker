import { Result } from "lighthouse";
import objStr from "obj-str";
import { FunctionComponent as FC, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
export const SitemapReport: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [loading, setLoading] = useState(false);
	const [lighthouseReports, setLighthouseReports] = useState<Result[] | undefined>();

	const validateUrl = (url: string) => {
		const res = url.match(
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
		);
		if (res == null) return "The input must be a valid URL";
		else return true;
	};

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		setLoading(true);
		setLighthouseReports(undefined);

		const res = await fetch("/api/lighthouse-sitemap", {
			method: "POST",
			body: JSON.stringify({ sitemapUrl: data.sitemapUrl }),
		});

		if (res) {
			const { reports } = await res.json();

			if (reports) {
				setLighthouseReports(reports);
				setLoading(false);
			}
		}
	};

	const formClasses = useMemo(
		() =>
			objStr({ flex: true, "gap-3": true, "items-center": !!errors.sitemapUrl, "items-end": !errors.sitemapUrl }),
		[errors.sitemapUrl]
	);

	const labelClasses = useMemo(
		() =>
			objStr({
				flex: true,
				"flex-col": true,
				"text-red-700": !!errors.sitemapUrl,
			}),
		[errors.sitemapUrl]
	);

	const inputClasses = useMemo(
		() =>
			objStr({
				rounded: true,
				border: true,
				"p-2": true,
				"text-slate-950": true,
				"focus:outline-blue-500": true,
				"min-w-[300px]": true,
				"border-slate-950": !errors.sitemapUrl,
				"border-red-700": !!errors.sitemapUrl,
			}),
		[errors.sitemapUrl]
	);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={formClasses}>
				<div>
					<label className={labelClasses}>
						<span>Sitemap Path *</span>
						<input
							type="text"
							className={inputClasses}
							{...register("sitemapUrl", {
								required: "This field is required",
								validate: validateUrl,
							})}
							autoComplete="off"
							placeholder="https://example.com/sitemap.xml"
						/>
					</label>
					{errors.sitemapUrl && <span className="text-red-700 text-xs">{errors.sitemapUrl.message}</span>}
				</div>
				<button
					type="submit"
					className="rounded border border-blue-500 bg-blue-500 text-white p-2 uppercase hover:text-blue-500 hover:bg-white transition-all duration-300 ease-in-out">
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
		</>
	);
};

type FormData = {
	sitemapUrl: string;
};
