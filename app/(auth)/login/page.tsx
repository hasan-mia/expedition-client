/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Alert, Spin } from "antd";
import useAuth, { LoginResponse } from "../hooks/useAuth";

const LoginPage = () => {
	const router = useRouter();
	const { login, user, loading } = useAuth();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		if (!loading && user) {
			router.push("/");
		}
	}, [loading, user, router]);

	if (loading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<Spin size="large" />
			</div>
		);
	}

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const res: LoginResponse = await login(email, password);

			if (res?.response?.data?.success) {
				router.push("/");
			} else {
				setError(
					res?.response?.data?.message || res?.message || "Unknown error",
				);
			}
		} catch (err) {
			setError("An error occurred during login");
		}

		setIsLoading(false);
	};

	return (
		<div className="grid md:grid-cols-1 min-h-screen h-full bg-[#e7efef]">
			<div className="mx-auto w-full h-full flex justify-center items-center">
				<div className="shadow-xl w-full lg:3/6 xl:w-2/6 rounded-lg m-10 p-10 md:ml-2 bg-[#ffffff] bg-opacity-70">
					<h1 className="font-semibold text-3xl text-[#505050] mb-3">Login</h1>
					<form onSubmit={handleSubmit}>
						<div>
							<label className="block mb-1" htmlFor="email">
								Email
							</label>
							<div className="relative w-full mb-5">
								<input
									type="email"
									className="w-full px-3 py-3 bg-[#e8f0fe] rounded-md focus:outline-none focus:ring-0"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#02839f] transition-all duration-500 ease-out input-progress"></span>
							</div>
						</div>
						<div>
							<label className="block mb-1" htmlFor="password">
								Password
							</label>
							<div className="relative w-full">
								<input
									id="password"
									type="password"
									className="w-full px-3 py-3 bg-[#e8f0fe] rounded-md focus:outline-none focus:ring-0"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<span className="absolute bottom-0 left-0 h-[3px] w-full bg-[#02839f] transition-all duration-500 ease-out input-progress"></span>
							</div>
						</div>

						{error && (
							<Alert message={error} type="error" showIcon className="mt-4" />
						)}

						<div className="mt-5">
							<button
								className={`bg-[#02839f] rounded-md py-2 w-full font-bold text-white ${
									isLoading ? "cursor-default" : "cursor-pointer"
								}`}
								disabled={isLoading}
							>
								{isLoading ? (
									<div className="flex justify-center items-center gap-2">
										<Spin size="default" />
										<span>Processing...</span>
									</div>
								) : (
									"Log In"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
