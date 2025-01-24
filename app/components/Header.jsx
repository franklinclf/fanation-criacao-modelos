"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default function Header({}) {
	return (
		<div className="h-16 w-full flex items-center bg-dark-purple ps-4">
			<img
				onClick={() => {
					redirect("/");
				}}
				className="h-6 w-auto cursor-pointer"
				src="/fanation-full-logo-white.svg"
				alt="Logo da Fanation"
				
				
				
			/>
			<LogoutButton />
		</div>
	);
}
