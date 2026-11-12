import Sidebar from "@/components/dashboard/sidebar";

export default function PainelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <aside className="w-full flex-none md:w-64 p-2">
        <Sidebar />
      </aside>
      <div className="grow md:overflow-y-auto">{children}</div>
    </div>
  );
}
