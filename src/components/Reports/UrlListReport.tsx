import { validateUrlList } from "@/lib/client/utils";
import { Result } from "lighthouse";
import { FunctionComponent as FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReportList } from "../ui/ReportList";
import { Form } from "../ui/form/Form";
import { SubmitButton } from "../ui/form/SubmitButton";
import { TextArea } from "../ui/form/TextArea";

export const UrlListReport: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();
	const [loading, setLoading] = useState(false);
	const [lighthouseReports, setLighthouseReports] = useState<Result[] | undefined>();

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		const urlList = data.urls.split("\n");
		setLoading(true);
		setLighthouseReports(undefined);

		const res = await fetch("/api/lighthouse-url-list", {
			method: "POST",
			body: JSON.stringify({ urlList }),
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
			<Form onSubmit={handleSubmit(onSubmit)} error={errors.urls}>
				<div>
					<TextArea
						label="URLs List *"
						error={errors.urls}
						{...register("urls", {
							required: "This field is required",
							validate: validateUrlList,
						})}
						autoComplete="off"
						placeholder={`https://example.com/page1/\nhttps://example.com/page2/`}
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
	urls: string;
};
