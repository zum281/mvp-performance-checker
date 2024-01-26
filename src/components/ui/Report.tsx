import { Result } from "lighthouse";
import { FunctionComponent as FC } from "react";
export const Report: FC<Props> = ({ report }) => {
	return (
		<article className="flex flex-col items-center max-w-sm text-center mx-auto mt-5 shadow-md rounded-xl p-2">
			<h3 className="mb-3 text-base line-clamp-2">Report for {report.finalDisplayedUrl}</h3>
			<div className="flex flex-col border p-3 gap-1 items-center text-center mx-auto w-fit rounded-xl">
				<h2>Performance Score</h2>
				<p className="text-6xl font-bold">{Number(report.categories.performance.score) * 100}</p>
			</div>
		</article>
	);
};
type Props = {
	report: Result;
};
