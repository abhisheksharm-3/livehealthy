import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Link,
} from "@nextui-org/react";
import { RiGithubLine } from "@remixicon/react";

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation(); // Hook to get the current location

  const menuItems = [
    { label: "Analyse", href: "/analyse" },
    { label: "Statistics", href: "/stats" },
    { label: "About Us", href: "/about" }
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/"><img src="/Images/logo.png" className="w-[80%] lg:w-[60%]"/></Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem
            key={index}
            isActive={location.pathname === item.href} // Set active based on the current route
          >
            <Link href={item.href}>
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            as={Link}
            color="primary"
            target="_blank"
            href="https://github.com/abhisheksharm-3/"
            variant="ghost"
            startContent={<RiGithubLine />}
          >
            GitHub
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
            <Link
              color={
                location.pathname === item.href
                  ? "primary"
                  : "foreground"
              }
              href={item.href}
              className="w-full"
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default NavbarComponent;
