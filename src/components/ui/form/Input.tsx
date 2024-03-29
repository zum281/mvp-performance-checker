import objStr from "obj-str";
import { InputHTMLAttributes, forwardRef, useMemo } from "react";
import { FieldError } from "react-hook-form";

const Input = forwardRef<HTMLInputElement, Props>(({ label, error, ...rest }, ref) => {
	const labelClasses = useMemo(
		() =>
			objStr({
				flex: true,
				"flex-col": true,
				"text-red-700": !!error,
			}),
		[error]
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
				"border-slate-950": !error,
				"border-red-700": !!error,
			}),
		[error]
	);

	return (
		<>
			<label className={labelClasses}>
				<span>{label}</span>
				<input type="text" ref={ref} className={inputClasses} {...rest} />
			</label>
			{error && <span className="text-red-700 text-xs">{error.message}</span>}
		</>
	);
});

Input.displayName = "Input";

export default Input;

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error: FieldError | undefined };
