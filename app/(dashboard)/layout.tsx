"use client";

import { ReactNode } from "react";
import Navbar from "../components/navbar/navbar";
import MainLayout from "@/layouts/layout";
import ProtectedAdminRoute from "@/lib/ProtectedAdminRoute";

export default function CommonLayout({ children }: { children: ReactNode }) {
	return (
		<ProtectedAdminRoute>
			<MainLayout>
				<Navbar />
				{children}
			</MainLayout>
		</ProtectedAdminRoute>
	);
}
