"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { sidebarGroups, type Role } from "@/config/sidebar.config";

type Props = {
  role: Role;
  isOpen: boolean;
  onClose: () => void;
};

export default function DashboardSidebar({ role, isOpen, onClose }: Props) {
  const pathname = usePathname();

  const groups = sidebarGroups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => item.roles.includes(role)),
    }))
    .filter((group) => group.items.length > 0);

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(href);

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-brand-dark/30 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-white transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Mobile header */}
        <div className="flex h-16 items-center justify-between border-b border-line px-5 lg:hidden">
          <span className="text-lg font-bold text-brand-dark">Menu</span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="rounded-lg p-2 text-brand-muted hover:bg-ivory-deep"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
          {groups.map((group, i) => (
            <div key={group.title ?? i}>
              {group.title && (
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-brand-muted/80">
                  {group.title}
                </p>
              )}

              <ul className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon = item.icon;

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                          active
                            ? "bg-coral-soft text-coral-dark"
                            : "text-brand-muted hover:bg-ivory hover:text-brand-dark"
                        }`}
                      >
                        <span
                          className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                            active
                              ? "bg-coral text-white shadow-md shadow-coral/30"
                              : "bg-ivory-deep text-brand-muted group-hover:bg-white"
                          }`}
                        >
                          <Icon size={17} />
                        </span>
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        <div className="border-t border-line px-6 py-4 text-xs text-brand-muted">
          © {new Date().getFullYear()} Real Estate MS
        </div>
      </aside>
    </>
  );
}