"use client";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { GiBilledCap } from "react-icons/gi";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaBars } from "react-icons/fa";

export default function Sidebar() {
	const menuItems = [
		{
			name: "Peças",
			icon: <GiBilledCap fontSize={20} />,
			path: "/dashboard/pecas/1",
		},
		{
			name: "Visualização",
			icon: <HiOutlineSquare2Stack fontSize={20} />,
			path: "/dashboard/visualizacao",
		},
		{
			name: "Clientes",
			icon: <MdOutlinePersonSearch fontSize={20} />,
			path: "/dashboard/clientes",
		},
	];

	const [isOpen, setIsOpen] = useState(false);
	const router = useRouter();
	const pathname = usePathname();

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div
				className={`fixed shadow-[0px_2px_6px_2px_rgba(0,0,0,0.15),0px_1px_4px_0px_rgba(0,0,0,0.15)] inset-y-0 left-0 z-40 flex w-64 transform flex-col-reverse sm:flex-col items-center justify-start gap-2 bg-light-grey px-[18] pb-3 pt-4 transition-transform sm:h-[calc(100vh-4rem)] ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
				style={{ top: "4rem" }}
			>
				{menuItems.map((item, index) => {
					const isActive = pathname.includes(item.path);

					return (
						<div
							key={index}
							onClick={() => {
								router.push(item.path);
								setIsOpen(false);
							}}
							className={`flex w-full cursor-pointer items-center gap-3 rounded-[20] px-5 py-3 text-base font-medium text-dark hover:bg-dark-purple hover:font-normal hover:text-white ${isActive ? "bg-dark-purple font-normal text-white" : ""}`}
						>
							{item.icon}
							{item.name}
						</div>
					);
				})}
			</div>
			<button
				onClick={toggleSidebar}
				className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-dark-purple text-white shadow-lg sm:hidden"
			>
				<FaBars />
			</button>
		</>
	);
}
