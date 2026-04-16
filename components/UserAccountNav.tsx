"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  Package, 
  ChevronDown 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface UserAccountNavProps {
  user: {
    name?: string | null;
    email?: string | null;
    role?: string | null;
  };
}

export default function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 outline-none group">
        <div className="w-8 h-8 rounded-full bg-lumiere-dark flex items-center justify-center text-[#F4EFEA] text-xs font-serif uppercase">
          {user.name ? user.name.charAt(0) : "U"}
        </div>
        <div className="hidden md:flex flex-col items-start text-left">
          <span className="text-xs font-medium text-lumiere-dark group-hover:text-lumiere-accent transition-colors">
            {user.name}
          </span>
          <span className="text-[10px] text-lumiere-gray uppercase tracking-tighter">
            {user.role === "ADMIN" ? "Administrator" : "Member"}
          </span>
        </div>
        <ChevronDown className="w-3 h-3 text-lumiere-gray group-hover:rotate-180 transition-transform" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 bg-white p-2 rounded-sm border-lumiere-dark/5 shadow-xl mt-2">
        <div className="px-2 py-1.5 text-xs text-lumiere-gray border-b border-zinc-50 mb-1">
          {user.email}
        </div>

        {user.role === "ADMIN" && (
          <DropdownMenuItem asChild>
            <Link href="/admin" className="flex items-center gap-2 px-2 py-2 text-sm text-lumiere-dark hover:bg-zinc-50 cursor-pointer">
              <LayoutDashboard className="w-4 h-4" />
              Admin Panel
            </Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuItem asChild>
          <Link href="/profile" className="flex items-center gap-2 px-2 py-2 text-sm text-lumiere-dark hover:bg-zinc-50 cursor-pointer">
            <User className="w-4 h-4" />
            My Profile
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/profile/orders" className="flex items-center gap-2 px-2 py-2 text-sm text-lumiere-dark hover:bg-zinc-50 cursor-pointer">
            <Package className="w-4 h-4" />
            Orders History
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-zinc-50" />

        <DropdownMenuItem 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-2 px-2 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer focus:bg-red-50 focus:text-red-600"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}