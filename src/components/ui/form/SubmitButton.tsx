import { FunctionComponent as FC } from "react";
export const SubmitButton: FC = () => {
	return (
		<button
			type="submit"
			className="rounded border border-blue-500 bg-blue-500 text-white p-2 uppercase hover:text-blue-500 hover:bg-white transition-all duration-300 ease-in-out">
			Submit
		</button>
	);
};
