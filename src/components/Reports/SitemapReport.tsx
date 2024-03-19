import { validateUrl } from "@/lib/client/utils";
import { Result } from "lighthouse";
import { FunctionComponent as FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReportList } from "../ui/ReportList";
import { Form } from "../ui/form/Form";
import Input from "../ui/form/Input";
import { SubmitButton } from "../ui/form/SubmitButton";

export const SitemapReport: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [loading, setLoading] = useState(false);
	const [lighthouseReports, setLighthouseReports] = useState<Result[] | undefined>();

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

	return (
		<>
			<Form onSubmit={handleSubmit(onSubmit)} error={errors.sitemapUrl}>
				<div>
					<Input
						label="Sitemap Path *"
						error={errors.sitemapUrl}
						{...register("sitemapUrl", {
							required: "This field is required",
							validate: validateUrl,
						})}
						autoComplete="off"
						placeholder="https://example.com/sitemap.xml"
					/>
				</div>
				<SubmitButton />
			</Form>
			{loading && <div className="loader" aria-label="Loading report... Please wait" />}
			<ReportList reports={lighthouseReports} />
		</>
	);
};

type FormData = {
	sitemapUrl: string;
};
