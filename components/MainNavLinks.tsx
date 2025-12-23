"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function MainNavLinks({ role }: { role?: string }) {
  const links = [
    {
      label: "Dashboard",
      href: "/",
      adminOnly: false,
      techOnly: false,
      userOnly: false,
    },
    {
      label: "Tickets",
      href: "/tickets",
      adminOnly: false,
      techOnly: false,
      userOnly: false,
    },
    {
      label: "My Tickets",
      href: "/my-tickets",
      adminOnly: false,
      techOnly: false,
      userOnly: true,
    },
    {
      label: "My Tickets",
      href: "/tech-tickets",
      adminOnly: false,
      techOnly: true,
      userOnly: false,
    },
    {
      label: "Users",
      href: "/users",
      adminOnly: true,
      techOnly: false,
      userOnly: false,
    },
  ];
  const currentPath = usePathname();
  console.log(currentPath);

  return (
    <div className="flex items-center gap-6">
      {links
        .filter(
          (link) =>
            (!link.adminOnly || role === "ADMIN") &&
            (!link.techOnly || role === "TECH") &&
            (!link.userOnly || role === "USER")
        )
        .map((link) => (
          <Link
            href={link.href}
            className={`navbar-link ${
              currentPath == link.href &&
              "cursor-default text-primary/70 hover:text-primary/60"
            }`}
            key={link.label + link.href}
          >
            {link.label}
          </Link>
        ))}
    </div>
  );
}

export default MainNavLinks;
