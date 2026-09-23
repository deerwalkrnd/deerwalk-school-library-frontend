"use client";
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { NavigationConfig } from "./NavigationList";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";

interface SidebarProps {
  onNavigate?: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  onNavigate,
  collapsed = false,
  onToggleCollapse,
}) => {
  const { role, logout } = useAuth();
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    router.prefetch("/login");
  }, [router]);

  const handleNavigation = () => {
    onNavigate?.();
  };

  const handleLogout = () => {
    router.prefetch("/login");
    logout();
    onNavigate?.();
  };

  return (
    <aside
      onDoubleClick={(e) => {
        // Links and buttons keep their own behaviour; only empty space toggles.
        if ((e.target as HTMLElement).closest("a, button")) return;
        onToggleCollapse?.();
      }}
      title={
        onToggleCollapse
          ? `Double-click to ${collapsed ? "expand" : "collapse"}`
          : undefined
      }
      className={`flex flex-col h-full border-r bg-white py-5 select-none transition-[width,padding] duration-300 ease-in-out ${
        collapsed ? "w-20 px-3" : "w-72 px-5"
      }`}
    >
      <div className="shrink-0 mx-auto mt-10 flex h-12 items-center">
        {collapsed ? (
          <Image
            alt="School logo"
            src="/logo-mark.webp"
            width={580}
            height={580}
            priority
            className="w-10 h-10"
          />
        ) : (
          <Image
            alt="School logo"
            src="/logo.webp"
            width={1764}
            height={580}
            priority
            className="w-32 sm:w-36 md:w-40 h-auto"
          />
        )}
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col gap-6 mt-10">
        {NavigationConfig[role].map((item) => (
          <Link
            href={item.href}
            key={item.name}
            onClick={handleNavigation}
            title={collapsed ? item.name : undefined}
            aria-label={collapsed ? item.name : undefined}
            aria-current={path === item.href ? "page" : undefined}
            className={`flex flex-row items-center gap-5 p-3 rounded-md font-medium text-lg transition-colors ${
              collapsed ? "justify-center" : "px-4"
            } ${
              path === item.href ? "bg-primary text-white" : "hover:bg-gray-100"
            }`}
          >
            <item.icon className="w-5 h-5 shrink-0" />
            {!collapsed && (
              <span className="whitespace-nowrap">{item.name}</span>
            )}
          </Link>
        ))}
      </div>

      <button
        type="button"
        title={collapsed ? "Logout" : undefined}
        aria-label={collapsed ? "Logout" : undefined}
        className={`shrink-0 cursor-pointer mt-auto p-3 rounded-md hover:bg-red-100 flex gap-2 w-full text-left ${
          collapsed ? "justify-center" : "px-4"
        }`}
        onClick={handleLogout}
      >
        <LogOutIcon className="shrink-0" />
        {!collapsed && "Logout"}
      </button>
    </aside>
  );
};

export default Sidebar;
