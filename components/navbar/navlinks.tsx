"use client";

import {
  HomeIcon,
  ChartPieIcon,
  NewspaperIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { name: "home", href: "/", icon: HomeIcon },
  { name: "painel", href: "/painel", icon: ChartPieIcon },
  { name: "boletins", href: "/boletins", icon: NewspaperIcon },
  { name: "sobre", href: "/sobre", icon: InformationCircleIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    // Container horizontal e centralizado
    <div className="flex flex-row items-center justify-center gap-2">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex items-center px-3 h-[48px] rounded-full hover:font-medium hover:text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-950",
              {
                "bg-sky-100 dark:bg-blue-800 text-blue-500 dark:text-sky-50 font-medium":
                  pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-5 h-5" />
            <p className="capitalize ml-2">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
