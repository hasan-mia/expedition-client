"use client";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="flex min-h-screen flex-grow">{children}</main>;
}
