import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";

function Icon({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <span
      aria-label={label}
      role="img"
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/80 hover:bg-black/[0.03]"
    >
      {children}
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-white/80 backdrop-blur">
      <Container className="grid h-16 grid-cols-[auto_1fr_auto] items-center">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Aurora Market
        </Link>

        <nav className="hidden items-center justify-center gap-8 text-sm font-medium text-black/60 md:flex">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <Link href="/search" className="hover:text-black">
            Search
          </Link>
          <Link href="/category/new" className="hover:text-black">
            Categories
          </Link>
          <Link href="/cart" className="hover:text-black">
            Checkout
          </Link>
          <Link href="/account/orders" className="hover:text-black">
            Orders
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" aria-label="Search">
            <Icon label="Search">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M16.2 16.2 21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </Icon>
          </Link>
          <Link href="/account" className="ml-1">
            <Icon label="Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 20a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Icon>
          </Link>
          <Link href="/wishlist" className="ml-1">
            <Icon label="Wishlist">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 21s-7-4.438-9.5-8.5C.78 9.21 2.5 6 6 6c1.8 0 3.2.9 4 2 .8-1.1 2.2-2 4-2 3.5 0 5.22 3.21 3.5 6.5C19 16.562 12 21 12 21Z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </Icon>
          </Link>
          <Link href="/cart">
            <Icon label="Cart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 7h14l-1.5 8h-11L7 7Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 7 6.3 4H3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM18 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill="currentColor" />
              </svg>
            </Icon>
          </Link>
        </div>
      </Container>
    </header>
  );
}
