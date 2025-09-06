// components/Dashboard/Sidebar.tsx

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-500 text-white h-screen p-6 space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <nav className="space-y-4">
        <Link href="/dashboard" className="block hover:underline">
          Upload Product
        </Link>
        <Link href="/dashboard/products" className="block hover:underline">
          Manage Products
        </Link>
        <Link href="/dashboard/carousels" className="block hover:underline">
          Manage Carousels
        </Link>
        <Link href="#" className="block hover:underline">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
