"use client";
import { FaFileInvoice, FaHome, FaShoppingCart } from "react-icons/fa";
import { GrUnorderedList } from "react-icons/gr";
import { BsShop } from "react-icons/bs";

export const menuItems = [
	{
		name: "Dashboard",
		href: "/",
		icon: <FaHome />,
	},
	{
		name: "Shops",
		href: "/shops",
		icon: <BsShop />,
	},
	{
		name: "Products",
		href: "/products",
		icon: <FaShoppingCart />,
	},
	{
		name: "Orders",
		href: "/orders",
		icon: <GrUnorderedList />,
	},
	{
		name: "Invoices",
		href: "/invoices",
		icon: <FaFileInvoice />,
	},
];
