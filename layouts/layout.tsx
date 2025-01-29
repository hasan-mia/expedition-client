"use client";
const MainLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className={`transition-all duration-300 bg-gray-100 min-h-screen`}>
			{children}
		</main>
	);
};

export default MainLayout;
