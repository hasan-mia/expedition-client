"use client";

import { ReactNode } from "react";
import Navbar from "../components/navbar/navbar";
import MainLayout from "@/layouts/layout";
import ProtectedRoute from "@/lib/ProtectedRoute";

export default function CommonLayout({ children }: { children: ReactNode }) {
	return (
		<ProtectedRoute>
			<MainLayout>
				<Navbar />
				{children}
			</MainLayout>
		</ProtectedRoute>
	);
}
