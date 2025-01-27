import axios from "axios";

// Token management class
class TokenManager {
	private static instance: TokenManager;
	private token: string | null = null;

	private constructor() {}

	static getInstance() {
		if (!TokenManager.instance) {
			TokenManager.instance = new TokenManager();
		}
		return TokenManager.instance;
	}

	setToken(token: string) {
		this.token = token;
	}

	getToken() {
		return this.token;
	}

	clearToken() {
		this.token = null;
	}
}

// Create the token manager instance
const tokenManager = TokenManager.getInstance();

// Create base axios instance
const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URI,
});

// Request interceptor
http.interceptors.request.use(
	(config) => {
		config.headers = config.headers || {};

		// Client-side token handling
		if (typeof window !== "undefined") {
			const token = localStorage.getItem("access-token");
			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
		}
		// Server-side token handling
		else {
			const token = tokenManager.getToken();
			if (token) {
				config.headers["Authorization"] = `Bearer ${token}`;
			}
		}

		return config;
	},
	(error) => Promise.reject(error),
);

// Response interceptor
http.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			if (typeof window !== "undefined") {
				localStorage.removeItem("access-token");
			} else {
				tokenManager.clearToken();
			}
		}
		return Promise.reject(error);
	},
);

export const setServerToken = (token: string) => {
	tokenManager.setToken(token);
};

export const clearServerToken = () => {
	tokenManager.clearToken();
};

export { http };
