import Sidebar from "../components/Sidebar/Sidebar";

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
      {children}
    </div>
  );
}
