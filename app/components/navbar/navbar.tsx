"use client";
import useAuth from "@/app/(auth)/hooks/useAuth";
import { menuItems } from "@/layouts/menu-items";
import { Menu, Button } from "antd";
import { UserOutlined, LogoutOutlined, LoginOutlined } from "@ant-design/icons";
import Link from "next/link";

export default function Navbar() {
	const { user, logout } = useAuth();

	const handleAuthAction = () => {
		if (user) {
			logout();
		}
	};

	return (
		<header className="bg-white shadow-md py-3 px-6 sticky top-0 z-50 flex items-center justify-between">
			{/* Logo / Branding */}
			<div className="text-xl font-semibold text-blue-600">Expedition</div>

			{/* Navigation Menu */}
			<Menu
				className="flex-1 hidden md:flex justify-center gap-2"
				mode="horizontal"
				items={menuItems.map((item) => ({
					key: item.href,
					label: <a href={item.href}>{item.name}</a>,
					icon: item.icon,
				}))}
			/>

			{/* Authentication Button */}
			<Button
				type="primary"
				className="flex items-center gap-2"
				onClick={handleAuthAction}
			>
				{user ? (
					<div className="flex gap-2">
						<UserOutlined />
						<span>{user?.email || "Profile"}</span>
						<LogoutOutlined />
					</div>
				) : (
					<div className="flex gap-2">
						<LoginOutlined />
						<Link href="/login" className="text-white">
							Login
						</Link>
					</div>
				)}
			</Button>
		</header>
	);
}
