import { BiBookmark } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { GrDashboard } from "react-icons/gr";

export const menuItems = [
	{
		name: "Home",
		href: "/",
		icon: <FaHome />,
	},
	{
		name: "Booking",
		href: "/booking",
		icon: <BiBookmark />,
	},
	{
		name: "Dashboard",
		href: "/dashboard",
		icon: <GrDashboard />,
	},
];
