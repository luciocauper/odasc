export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "ODASC - Observatório dos Sertões dos Crateús",
  description:
    "Painel de monitoramento da situação de risco dos municípios dos Sertões dos Crateús.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
  ],
  navMenuItems: [
    {
      label: "Profile",
      href: "/profile",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Team",
      href: "/team",
    },
    {
      label: "Calendar",
      href: "/calendar",
    },
    {
      label: "Settings",
      href: "/settings",
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    instagram: "https://www.instagram.com/odasc_observatorio/",
    github: "",
    ufc: "https://www.ufc.br/",
  },
};
