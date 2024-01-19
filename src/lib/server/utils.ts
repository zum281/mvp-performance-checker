export const normalizeUrl = (url: string) => {
	if (!isValidUrl(url)) throw new Error("URL not valid");

	const hasProtocol = url.startsWith("http");
	const hasTrailingSlash = url.endsWith("/");

	return `${hasProtocol ? "" : "https://"}${url}${hasTrailingSlash ? "" : "/"}`;
};

export const isValidUrl = (url: string) => {
	try {
		const newUrl = new URL(url);
		return newUrl.protocol === "http:" || newUrl.protocol === "https:";
	} catch (err) {
		return false;
	}
};
