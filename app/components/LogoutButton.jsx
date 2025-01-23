import { useAuth } from "../context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export default function LogoutButton() {
	const auth = useAuth();
	const router = useRouter();

	const handleLogout = async () => {
		await auth
			.logout()
			.then((response) => {
				if (response.success) {
					router.push("/");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			{auth.isAuthenticated && (
				<button
					onClick={handleLogout}
					className="group ml-auto mr-4 px-4 py-2 text-white hover:underline active:color-light-purple"
				>
					<span className="group-hover:hidden">
						{auth.user.username}
					</span>
					<span className="hidden group-hover:inline active:stroke-light">
						Logout
					</span>
				</button>
			)}
		</>
	);
}
