import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { ThemeSwitch } from "../theme-switch";
import { OdascLogo } from "../logo";
import NavLinks from "./navlinks";

export default function App() {
  return (
    <Navbar shouldHideOnScroll>
      <NavbarBrand>
        <Link aria-current="page" href="/" color="foreground">
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
    </Navbar>
  );
}
