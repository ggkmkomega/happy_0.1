"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import { type MainNavItem } from "types";
import { Icons } from "~/_components/icons";
import { cn } from "~/lib/utils";

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
  admin?: boolean;
}

export function MainNav({ items, admin }: MainNavProps) {
  const segment = useSelectedLayoutSegment();

  return (
    <div className="flex gap-6 md:gap-10">
      <Link
        href={admin ? "/admin" : "/dashboard"}
        className={cn("hidden items-center space-x-2 md:flex", {
          "bg-rose-400 p-4 text-white": admin,
        })}
      >
        {admin ? <Icons.settings /> : <Icons.dashboard />}
        <span className="hidden font-bold sm:inline-block">
          {admin ? "Admin" : "Dashboard"}
        </span>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-6 md:flex">
          {items?.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                item.href.startsWith(`/${segment}`)
                  ? "text-foreground"
                  : "text-foreground/60",
                item.disabled && "cursor-not-allowed opacity-80",
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
