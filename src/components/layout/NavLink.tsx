"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * next/link that plays nicely with Lenis:
 *  • same-page hash (/uz#contact while on /uz) → prevent Next's instant jump;
 *    Lenis' `anchors` option performs the smooth glide.
 *  • anything else → normal client-side navigation (RouteScrollManager
 *    handles scroll reset / cross-page hashes).
 */
export function NavLink({
  href,
  children,
  onClick,
  ...props
}: React.ComponentProps<typeof Link> & { href: string }) {
  const pathname = usePathname();
  const [path, hash] = href.split("#");

  return (
    <Link
      href={href}
      scroll={!hash}
      onClick={(e) => {
        onClick?.(e);
        if (hash && (path === pathname || path === "")) e.preventDefault();
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
