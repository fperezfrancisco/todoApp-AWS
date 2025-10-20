import SidebarNavigation from "@/components/navigation/SidebarNavigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-full min-h-screen">
      <SidebarNavigation />
      {children}
    </div>
  );
}
