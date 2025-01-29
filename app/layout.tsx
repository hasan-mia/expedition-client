import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import "@ant-design/v5-patch-for-react-19";
const inter = Inter({ subsets: ["latin"] });
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { TenstackQueryClient } from "@/lib/TranstackProvider/TenstackQuery";

export const metadata: Metadata = {
	title: "Expedition",
	description: "Expedition",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<TenstackQueryClient>
					<AntdRegistry>{children}</AntdRegistry>
				</TenstackQueryClient>
			</body>
		</html>
	);
}
