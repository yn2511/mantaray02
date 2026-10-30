"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import styles from "./SiteChrome.module.css";

const MENU_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/portraits", label: "Portraits" },
  { href: "/commissions", label: "Commissions" },
  { href: "/about", label: "Artist CV" },
  { href: "/upload-guide", label: "Upload Guide" },
] as const;

export function SiteChrome() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useBodyScrollLock(isMenuOpen);
  useEscapeKey(isMenuOpen, closeMenu);

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoMark}>Manta Ray</span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="global-menu"
          onClick={() => setIsMenuOpen((value) => !value)}
        >
          <span
            className={`${styles.dots} ${isMenuOpen ? styles.dotsOpen : ""}`}
          >
            <i />
            <i />
            <i />
            <i />
          </span>
        </button>
      </header>

      <div
        id="global-menu"
        className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <nav className={styles.menuNav} aria-label="Primary">
          {MENU_LINKS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname === item.href ||
                  pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.menuLink} ${isActive ? styles.menuActive : ""}`}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.menuMeta}>
          <a href="mailto:hello@mantaray02.com" tabIndex={isMenuOpen ? 0 : -1}>
            hello@mantaray02.com
          </a>
          <p>
            For commissions, art projects, or just to say hi, please contact{" "}
            <a
              href="mailto:hello@mantaray02.com"
              tabIndex={isMenuOpen ? 0 : -1}
            >
              hello@mantaray02.com
            </a>
            .
          </p>
          <p className={styles.copy}>© {new Date().getFullYear()} Manta Ray</p>
        </div>
      </div>
    </>
  );
}
