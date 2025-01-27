export async function fetchWithAuthorization(
	url: string,
	options: RequestInit = {},
): Promise<Response> {
	const token = localStorage.getItem("access-token");
	const headers: HeadersInit = {
		...options.headers,
		Authorization: `Bearer ${token}`,
	};

	const baseUrl = process.env.NEXT_PUBLIC_API_URI;
	const apiUrl = baseUrl + url;

	return fetch(apiUrl, { ...options, headers });
}
