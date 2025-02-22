"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { http } from "@/config/http";

export type User = {
	_id: string;
	email: string;
	role: string;
	__v: number;
};

export type LoginResponse = {
	response?: {
		data: {
			success: boolean;
			message?: string;
		};
	};
	message?: string;
};

export default function useAuth() {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const router = useRouter();

	const fetchUser = async () => {
		try {
			const response = await http.get("me");
			if (response.data?.data) {
				setUser(response.data.data);
			}
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

	const login = async (
		email: string,
		password: string,
	): Promise<LoginResponse> => {
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
			const token = response.data.token;
			if (token) {
				localStorage.setItem("accessToken", token);
				http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
				router.push("/");
				return { response: { data: { success: true } } };
			}
			return { message: "Invalid response from server." };
		} catch (error) {
			console.error("Login failed", error);
			return { message: "Login failed" };
		}
	};

	const register = async (
		email: string,
		password: string,
	): Promise<LoginResponse> => {
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
			return { response: { data: { success: true } } };
		} catch (error) {
			console.error("Registration failed", error);
			return { message: "Registration failed" };
		}
	};

	const verifyToken = async (token: string): Promise<LoginResponse> => {
		try {
			const response = await http.post(
				`${process.env.NEXT_PUBLIC_API_URI}verify`,
				{ token },
				{
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Content-Type": "application/json",
					},
				},
			);
			const restoken = response.data.token;
			if (restoken) {
				localStorage.setItem("accessToken", restoken);
				http.defaults.headers.common["Authorization"] = `Bearer ${restoken}`;
				router.push("/");
				return { response: { data: { success: true } } };
			}
			return { message: "Invalid response from server." };
		} catch (error) {
			console.error("Login failed", error);
			return { message: "Login failed" };
		}
	};

	const logout = () => {
		localStorage.removeItem("accessToken");
		setUser(null);
		delete axios.defaults.headers.common["Authorization"];
		router.push("/login");
	};

	return { user, loading, register, login, logout, verifyToken };
}
