"use client";

import Sidebar from "../components/Sidebar/Sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/core/presentation/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/core/presentation/components/ui/sheet";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:hidden p-2 fixed top-2 left-2 z-50">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side="left" className=" min-w-72">
            <SheetTitle className="hidden">Sidebar Navigation</SheetTitle>

            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <main className="flex-1">{children}</main>
    </div>
  );
}
