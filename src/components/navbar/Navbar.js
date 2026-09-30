"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./navbar.module.css";
import DarkModeToggle from "../DarkModeToggle/DarkModeToggle";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const links = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Portfolio", url: "/portfolio" },
  { id: 3, title: "Blog", url: "/blog" },
  { id: 4, title: "About", url: "/about" },
  { id: 5, title: "Contact", url: "/contact" },
  { id: 6, title: "Dashboard", url: "/dashboard" },
];

const Navbar = () => {
  const session = useSession();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.logo} onClick={closeMenu}>
        Blog<span className={styles.span}>Mania</span>
      </Link>

      {/* Hamburger — only visible on mobile */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ""}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ""}`} />
        <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ""}`} />
      </button>

      <div className={`${styles.links} ${menuOpen ? styles.linksOpen : ""}`}>
        <DarkModeToggle />

        {links.map((link) => {
          const isActive =
            link.url === "/" ? pathname === "/" : pathname.startsWith(link.url);

          return (
            <Link
              key={link.id}
              href={link.url}
              onClick={closeMenu}
              className={`${styles.link} ${isActive ? styles.active : ""}`}
            >
              {link.title}
            </Link>
          );
        })}

        {session.status === "authenticated" && session.data?.user?.name && (
          <span className={styles.username}>
            ({session.data.user.name.toLowerCase()})
          </span>
        )}

        {session.status === "authenticated" && (
          <button
            className={styles.logout}
            onClick={() => {
              closeMenu();
              signOut();
            }}
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
