"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Mail, Briefcase, Calendar, User, Settings, LayoutDashboard, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Apply", href: "/apply", icon: FileText },
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Admin", href: "/admin", icon: Briefcase },
  { name: "Email", href: "/email", icon: Mail },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border px-6">
        <img
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/logo-1759832488043.jpg"
          alt="Veridia.io"
          className="h-10 w-auto"
        />
      </div>
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-sidebar-border p-4 text-center text-xs text-sidebar-foreground/60">
        © 2025 Veridia.io
      </div>
    </div>
  );
}