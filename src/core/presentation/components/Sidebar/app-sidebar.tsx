"use client"

import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/core/presentation/components/ui/sidebar";
import {
  BookOpenText,
  House,
  LibraryBig,
  LogOut,
  MessageSquareMore,
  User,
} from "lucide-react";
import { SifalLogo } from "../../../../../public/SifalLogo";

const mainItems = [
  {
    title: "Home",
    url: "/",
    icon: House,
  },
  {
    title: "AllBooks",
    url: "/allbooks",
    icon: BookOpenText,
  },
  {
    title: "Profile",
    url: "/profile",
    icon: User,
  },
  {
    title: "Feedback",
    url: "/feedbacl",
    icon: MessageSquareMore,
  },
  {
    title: "About",
    url: "/about",
    icon: LibraryBig,
  },
];

const footerItems = [
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
];

export function AppSidebar() {
  const pathname = usePathname()
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <SifalLogo className="h-48px w-158.17px"/>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className={
                      pathname === item.url 
                        ? "bg-orange-500 text-white hover:bg-orange-600 data-[active=true]:bg-orange-500 data-[active=true]:text-white"
                        : ""
                    }
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild >
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

