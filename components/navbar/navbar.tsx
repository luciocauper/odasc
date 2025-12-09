"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button, ButtonGroup } from "@heroui/button";
import { Link } from "@heroui/link";
import { ThemeSwitch } from "../theme-switch";
import { OdascLogo } from "../logo";
import NavLinks, { links } from "@/components/navbar/navlinks";
import { Divider } from "@heroui/divider";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar
      shouldHideOnScroll
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
    >
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="sm:hidden"
      />
      <NavbarBrand>
        <Link
          aria-current="page"
          href="/"
          color="foreground"
          onPress={() => setIsMenuOpen(false)}
        >
          <OdascLogo />
        </Link>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLinks />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {links.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Button
              className="text-white flex items-center justify-baseline mt-2 w-full"
              color="primary"
              as={Link}
              href={item.href}
              size="lg"
              onPress={() => setIsMenuOpen(false)}
            >
              <item.icon className="w-5 h-5 mr-2" />
              <span>{item.name}</span>
            </Button>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
