export const validateUrlList = (urlList: string) => {
	const urls = urlList.split("\n");
	for (const url of urls) {
		const res = url.match(
			/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
		);
		if (res == null) return "The input must be a valid URL";
	}
	return true;
};

export const validateUrl = (url: string) => {
	const res = url.match(
		/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
	);
	if (res == null) return "The input must be a valid URL";
	else return true;
};
