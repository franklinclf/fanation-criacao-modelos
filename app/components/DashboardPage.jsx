import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function DashboardPage({ children }) {
	return (
		<div className="flex h-screen">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header />
				<div className="flex-1 overflow-y-auto ms-0 sm:ms-64">
					{children}
				</div>
			</div>
		</div>
	);
}
