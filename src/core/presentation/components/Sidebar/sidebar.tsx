import {
  SidebarProvider,
  SidebarTrigger,
} from "@/core/presentation/components/ui/sidebar";
import { AppSidebar } from "@/core/presentation/components/Sidebar/app-sidebar";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100">
        <AppSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}
