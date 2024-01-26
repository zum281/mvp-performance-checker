import objStr from "obj-str";
import { FunctionComponent as FC, FormHTMLAttributes, useMemo } from "react";
import { FieldError } from "react-hook-form";
export const Form: FC<Props> = ({ error, ...rest }) => {
	const formClasses = useMemo(
		() => objStr({ flex: true, "gap-3": true, "items-center": !!error, "items-end": !error }),
		[error]
	);

	return <form className={formClasses} {...rest} />;
};
type Props = FormHTMLAttributes<HTMLFormElement> & { error: FieldError | undefined };
