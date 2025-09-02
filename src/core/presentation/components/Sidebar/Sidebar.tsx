"use client";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { NavigationConfig } from "./NavigationList";
import Logo from "../../assets/icons/Logo";
import { usePathname } from "next/navigation";
import LoginHero from "../../assets/images/LoginHero";

const Sidebar = () => {
  const { role, logout } = useAuth();
  const path = usePathname();

  return (
    <aside className="flex flex-col p-5 h-screen min-w-72 border-r">
      <div className="lg:mx-auto mt-10">
        <Logo className="w-32 h-auto" />
      </div>

      <div className="flex-1 flex flex-col gap-6 mt-10">
        {NavigationConfig[role].map((item) => (
          <a
            href={item.href}
            key={item.name}
            className={`flex flex-row items-center gap-5 p-3 px-4 rounded-md font-medium text-lg transition-colors ${
              path === item.href
                ? "bg-primary text-white"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.name}
          </a>
        ))}
      </div>

      {/* Logout */}
      <div
        className="cursor-pointer mt-auto p-3 px-4 rounded-md hover:bg-red-100 dark:hover:bg-red-900"
        onClick={() => logout()}
      >
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;
