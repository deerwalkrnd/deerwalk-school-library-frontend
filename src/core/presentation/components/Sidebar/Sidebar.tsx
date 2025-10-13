"use client";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { NavigationConfig } from "./NavigationList";
import Logo from "../../assets/icons/Logo";
import { usePathname } from "next/navigation";
import LoginHero from "../../assets/images/LoginHero";
import Image from "next/image";

interface SidebarProps {
  onNavigate?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  const { role, logout } = useAuth();
  const path = usePathname();

  const handleNavigation = () => {
    onNavigate?.();
  };

  const handleLogout = () => {
    logout();
    onNavigate?.();
  };

  return (
    <aside className="flex flex-col p-5 h-screen min-w-72 border-r">
      <div className="block lg:hidden mx-auto mt-10">
        <Image
          alt="School logo"
          src="/logo.svg"
          width={128}
          height={128}
          className="w-20 sm:w-24 md:w-32 mx-auto"
        />
      </div>

      <div className="hidden lg:block mx-auto mt-10">
        <Logo className="w-20 sm:w-24 md:w-32 mx-auto" />
      </div>

      <div className="flex-1 flex flex-col gap-6 mt-10">
        {NavigationConfig[role].map((item) => (
          <a
            href={item.href}
            key={item.name}
            onClick={handleNavigation}
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

      <div
        className="cursor-pointer mt-auto p-3 px-4 rounded-md hover:bg-red-100 dark:hover:bg-red-900"
        onClick={handleLogout}
      >
        Logout
      </div>
    </aside>
  );
};

export default Sidebar;
