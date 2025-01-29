"use client";

import { ReactNode } from "react";
import Navbar from "../components/navbar/navbar";
import MainLayout from "@/layouts/layout";

export default function CommonLayout({ children }: { children: ReactNode }) {
	return (
		<MainLayout>
			<Navbar />
			{children}
		</MainLayout>
	);
}
