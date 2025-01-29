"use client";
import { createContext, ReactNode, useState } from "react";

interface SidebarContextType {
	open: boolean;
	toggle: () => void;
}

export const SidebarContext = createContext<SidebarContextType | undefined>(
	undefined,
);

const MenuContextProvider = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen((prev) => !prev);
	};

	return (
		<SidebarContext.Provider value={{ open, toggle }}>
			{children}
		</SidebarContext.Provider>
	);
};

export default MenuContextProvider;
