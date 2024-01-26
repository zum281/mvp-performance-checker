import { Result } from "lighthouse";
import { FunctionComponent as FC } from "react";
import { Report } from "./Report";

export const ReportList: FC<Props> = ({ reports }) => {
	return (
		<>
			{reports && reports.length > 0 && (
				<section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
					{reports.map((report) => (
						<Report key={report.finalDisplayedUrl} report={report} />
					))}
				</section>
			)}
			{reports && reports.length === 0 && (
				<section>
					<p>No reports to show</p>
				</section>
			)}
		</>
	);
};
type Props = {
	reports?: Result[];
};
