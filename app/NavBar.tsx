import Link from "next/link";
import React from "react";
import { FaBug } from "react-icons/fa6";

const NavBar = () => {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex  space-x-6">
        {links.map((link, index) => (
          <li
            key={index}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
