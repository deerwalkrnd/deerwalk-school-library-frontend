"use client";

import Sidebar from "../components/Sidebar/Sidebar";
import { Menu, X } from "lucide-react";
import { Button } from "@/core/presentation/components/ui/button";
import { useState, useEffect } from "react";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleMobileMenu = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      if (!isMobileMenuOpen) {
        setShowSidebar(true);
        setTimeout(() => setIsMobileMenuOpen(true), 10);
      } else {
        setIsMobileMenuOpen(false);
      }
    }
  };

  const closeMobileMenu = () => {
    if (!isAnimating && isMobileMenuOpen) {
      setIsAnimating(true);
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        if (!isMobileMenuOpen) {
          setShowSidebar(false);
        }
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isAnimating, isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen || showSidebar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, showSidebar]);

  return (
    <div className="flex flex-row">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:hidden p-2 fixed top-2 left-2 z-50">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
          onClick={toggleMobileMenu}
          disabled={isAnimating}
        >
          <Menu
            className={`h-6 w-6 transition-transform duration-200 ${
              isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
            }`}
          />
        </Button>
      </div>
      {showSidebar && (
        <>
          <div
            className={`lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out ${
              isMobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeMobileMenu}
          />
          <div
            className={`lg:hidden fixed left-0 top-0 h-full w-72 bg-white dark:bg-gray-900 z-50 shadow-2xl transform transition-all duration-300 ease-out ${
              isMobileMenuOpen
                ? "translate-x-0 opacity-100"
                : "-translate-x-full opacity-95"
            }`}
          >
            {/* Close button */}
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                onClick={closeMobileMenu}
                disabled={isAnimating}
              >
                <X
                  className={`h-6 w-6 transition-all duration-200 ${
                    isMobileMenuOpen
                      ? "rotate-0 opacity-100 scale-100"
                      : "rotate-90 opacity-50 scale-90"
                  }`}
                />
              </Button>
            </div>

            <div
              className={`transition-all duration-300 ease-out delay-100 ${
                isMobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-4 opacity-0"
              }`}
            >
              <Sidebar onNavigate={closeMobileMenu} />
            </div>
          </div>
        </>
      )}

      <main className="flex-1">{children}</main>
    </div>
  );
}
