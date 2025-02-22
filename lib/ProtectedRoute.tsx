"use client";

import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";
import { Spin } from "antd";
import useAuth from "@/app/(auth)/hooks/useAuth";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!loading && !user?.email) {
			router.replace("/login");
		}
	}, [loading, user, router]);

	useEffect(() => {
		if (user && user?.role !== "user") {
			router.replace("/");
		}
	}, [user, router]);

	if (loading || user?.role !== "user") {
		return (
			<div className="h-screen flex justify-center items-center">
				<Spin size="large" />
			</div>
		);
	}

	if (!user?.email || user?.role !== "user") {
		return null;
	}

	return children;
}
