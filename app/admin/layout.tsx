import { NavLinks, Navbar } from "@/components/Navbar";


export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="dark bg-background min-h-screen">
      <Navbar>
        <NavLinks href="/admin">Dashboard</NavLinks>
        <NavLinks href="/admin/products">Products</NavLinks>
        <NavLinks href="/admin/users">Customers</NavLinks>
        <NavLinks href="/admin/orders">Sales</NavLinks>
      </Navbar>
      <main className="max-w-5xl mx-auto">{children}</main>
    </div>
  );
}
