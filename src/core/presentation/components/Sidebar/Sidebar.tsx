"use client";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { NavigationConfig } from "./NavigationList";
import Logo from "../../assets/icons/Logo";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { role, logout } = useAuth();
  const path = usePathname();
  console.log(path);

  return (
    <aside className=" flex flex-col gap-18 p-5 max-h-screen min-w-72">
      <div className="mx-auto mt-10">
        <Logo />
      </div>
      <div className="flex-1 flex flex-col gap-10 ">
        {NavigationConfig[role].map((item) => (
          <a
            href={item.href}
            key={item.name}
            className={`flex flex-row font-medium text-lg gap-5 p-3 px-4 rounded-md items-center ${path === item.href ? "bg-primary text-white" : ""}`}
          >
            <item.icon className="w-5 h-5"></item.icon>
            {item.name}
          </a>
        ))}
      </div>
      <div className={`cursor-pointer`} onClick={() => logout()}>
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;
