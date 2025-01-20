"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useState } from "react";
import { GiBilledCap } from "react-icons/gi";
import { HiOutlineSquare2Stack } from "react-icons/hi2";
import { MdOutlinePersonSearch } from "react-icons/md";
import { FaBarsStaggered } from "react-icons/fa6";


export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    {
      name: "Peças",
      icon: <GiBilledCap fontSize={20} />,
      path: "/dashboard/pecas",
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

  return (
    <>
    <div className={`fixed sm:static inset-y-0 sm:inset-y-[4rem] left-0 z-50 flex w-64 flex-col-reverse sm:flex-col items-center justify-start pb-3 sm:justify-end gap-2 bg-light-grey px-4 pt-3 shadow-inner outline-foreground drop-shadow-md sm:h-[calc(100vh-4rem)] transition-transform duration-500 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}>
      {menuItems.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <div
            key={index}
            onClick={() => { toggleSidebar(); router.push(item.path)}}
            className={`flex w-full cursor-pointer items-center gap-3 rounded-[20] px-5 py-3 text-base text-dark hover:bg-dark-purple hover:text-white ${isActive ? "bg-dark-purple text-white" : ""}`}
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
    <FaBarsStaggered />
  </button>
  </>
  );
}
