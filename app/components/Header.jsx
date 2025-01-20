"use client";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Header() {
  const auth = useAuth();

  const handleLogout = async () => {
    await auth
      .logout()
      .then((response) => {
        if (response.success) {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  return (
    <>
      <div className="hidden h-16 w-full items-center bg-dark-purple ps-4 sm:flex">
        <Image
          onClick={() => {
            redirect("/");
          }}
          className="h-6 w-auto cursor-pointer"
          src="/fanation-full-logo-white.svg"
          alt="Logo da Fanation"
          width={0}
          height={0}
          priority={true}
        />

        {auth.isAuthenticated && (
          <button
            onClick={handleLogout}
            className="group ml-auto mr-4 px-4 py-2 text-white rounded-lg hover:outline hover:outline-1 outline-offset-1"
          >
            <span className="group-hover:hidden">{auth.user.username}</span>
            <span className="hidden group-hover:inline active:stroke-light">Logout</span>
          </button>
        )}
      </div>
    </>
  );
}
