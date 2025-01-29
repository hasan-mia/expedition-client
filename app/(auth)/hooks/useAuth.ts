import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { http } from "@/config/http";

export default function useAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const fetchUser = async () => {
		try {
			const response = await http.get("me");
			setUser(response.data.data);
		} catch (error) {
			console.error("Fetch user failed", error);
			logout();
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const accessToken = localStorage.getItem("accessToken");
		if (accessToken) {
			http.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
			fetchUser();
		} else {
			setLoading(false);
		}
	}, []);

	const login = async (email: string, password: string) => {
		try {
			const response = await http.post(
				`${process.env.NEXT_PUBLIC_API_URI}signin`,
				{ email, password },
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
					},
				},
			);
			localStorage.setItem("accessToken", response.data.token);
			http.defaults.headers.common[
				"Authorization"
			] = `Bearer ${response.data.token}`;
			router.push("/");
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	const register = async (email: string, password: string) => {
		try {
			const response = await http.post(
				`${process.env.NEXT_PUBLIC_API_URI}signup`,
				{ email, password },
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
					},
				},
			);
			console.log(response.data);
			router.push("/");
		} catch (error) {
			console.error("Login failed", error);
		}
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		setUser(null);
		delete axios.defaults.headers.common["Authorization"];
		router.push("/login");
	};

	return { user, loading, register, login, logout };
}
