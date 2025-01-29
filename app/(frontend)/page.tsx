"use client";
import React from "react";
import useAuth from "../(auth)/hooks/useAuth";

export default function Home() {
	const { user } = useAuth();
	console.log(user);
	return <div>page</div>;
}
