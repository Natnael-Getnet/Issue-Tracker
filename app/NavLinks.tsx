import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <ul className="flex  space-x-6">
      {links.map((link, index) => (
        <li
          key={index}
          className={`nav-link ${
            link.href === currentPath && "!text-zinc-900"
          }`}
        >
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
