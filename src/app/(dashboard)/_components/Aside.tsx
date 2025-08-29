"use client";
import { LayoutDashboard, Package, ShoppingBasket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../_lib/utils";

const Aside = () => {
  const pathname = usePathname();
  return (
    <aside className="h-screen w-full max-w-[272px] flex-1 bg-white py-6">
      <h1 className="px-8 text-2xl font-black text-green-100 uppercase">
        Stockly
      </h1>
      <nav className="mt-8 px-2.5">
        <ul className="space-y-2">
          <li>
            <Link
              className={cn(
                "flex items-center gap-2 rounded-[8px] px-6 py-3 text-sm text-slate-500 transition-all hover:bg-green-50 hover:text-green-100",
                {
                  "bg-green-50 font-semibold text-green-100": pathname === "/",
                },
              )}
              href="/"
            >
              <LayoutDashboard size={20} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "flex items-center gap-2 rounded-[8px] px-6 py-3 text-sm text-slate-500 transition-all hover:bg-green-50 hover:text-green-100",
                {
                  "bg-green-50 font-semibold text-green-100":
                    pathname === "/products",
                },
              )}
              href="/products"
            >
              <Package size={20} />
              Produtos
            </Link>
          </li>
          <li>
            <Link
              className={cn(
                "flex items-center gap-2 rounded-[8px] px-6 py-3 text-sm text-slate-500 transition-all hover:bg-green-50 hover:text-green-100",
                {
                  "bg-green-50 font-semibold text-green-100":
                    pathname === "/sales",
                },
              )}
              href="/sales"
            >
              <ShoppingBasket size={20} />
              Vendas
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
