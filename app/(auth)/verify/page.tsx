/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Alert, Button } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import useAuth, { LoginResponse } from "../hooks/useAuth";
import { AxiosError } from "axios";

const VerifyPage = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");

	const router = useRouter();
	const { verifyToken } = useAuth();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const res: LoginResponse = await verifyToken(token || "");

			if (res?.response?.data?.success) {
				router.push("/");
			} else {
				setError(
					res?.response?.data?.message || res?.message || "Unknown error",
				);
				router.push("/register");
			}
		} catch (err: any) {
			setError("An error occurred during login");
			console.log(err);
		}

		setIsLoading(false);
	};

	return (
		<div className="min-h-screen min-w-[100vw] flex justify-center items-center">
			<Button type="primary" size="large" onClick={(e) => handleSubmit(e)}>
				{isLoading ? "Please wait" : "varify"}
			</Button>
			{error && (
				<Alert message={error} type="error" showIcon className="mt-4" />
			)}
		</div>
	);
};

export default VerifyPage;
