"use client";

import { Building2, LogOut, Menu } from "lucide-react";
import Image from "next/image";

type Props = {
  title: string;
  name: string;
  role: string;
  onMenuClick: () => void;
  onLogout: () => void;
};

export default function DashboardNavbar({
  title,
  name,
  role,
  onMenuClick,
  onLogout,
}: Props) {
  const initial = name?.trim()?.charAt(0)?.toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between border-b border-line bg-white/80 px-4 backdrop-blur-md md:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="rounded-lg p-2 text-brand-dark hover:bg-ivory-deep lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center rounded-xl ">
            <Image
            src="/assets/logo.png"
            alt="Logo"
            width={100}
            height={100}
            />
          </span>
          <span className="hidden h-6 w-px bg-line sm:block" />
          <h1 className="text-lg font-semibold text-brand-dark">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold leading-tight text-brand-dark">
            {name}
          </p>
          <p className="text-xs capitalize text-brand-muted">{role}</p>
        </div>

        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-coral-soft text-sm font-bold text-coral-dark ring-2 ring-white">
          {initial}
        </span>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-sm font-medium text-brand-dark transition hover:border-coral hover:bg-coral-soft hover:text-coral-dark"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
}