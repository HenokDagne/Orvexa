import Link from "next/link";
import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <Container className="py-10">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold tracking-tight">Aurora Market</div>
            <p className="mt-3 text-sm text-black/60">
              Curated essentials for a modern minimalist home.
            </p>
          </div>
          <div className="text-sm">
            <div className="text-[10px] font-medium tracking-widest text-black/50">
              SHOP
            </div>
            <div className="mt-3 grid gap-2 text-black/60">
              <Link href="/category/apparel" className="hover:text-black">
                Apparel
              </Link>
              <Link href="/category/home" className="hover:text-black">
                Home
              </Link>
              <Link href="/category/tech" className="hover:text-black">
                Tech
              </Link>
              <Link href="/category/wellness" className="hover:text-black">
                Wellness
              </Link>
            </div>
          </div>
          <div className="text-sm">
            <div className="text-[10px] font-medium tracking-widest text-black/50">
              ACCOUNT
            </div>
            <div className="mt-3 grid gap-2 text-black/60">
              <Link href="/account" className="hover:text-black">
                My account
              </Link>
              <Link href="/account/orders" className="hover:text-black">
                Orders
              </Link>
              <Link href="/account/profile" className="hover:text-black">
                Profile
              </Link>
              <Link href="/auth" className="hover:text-black">
                Sign in
              </Link>
            </div>
          </div>
          <div className="text-sm">
            <div className="text-[10px] font-medium tracking-widest text-black/50">
              PAGES
            </div>
            <div className="mt-3 grid gap-2 text-black/60">
              <Link href="/search" className="hover:text-black">
                Search
              </Link>
              <Link href="/cart" className="hover:text-black">
                Cart
              </Link>
              <Link href="/wishlist" className="hover:text-black">
                Wishlist
              </Link>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-black/10 pt-6 text-xs text-black/50 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Aurora Market</div>
          <div>Built with Next.js</div>
        </div>
      </Container>
    </footer>
  );
}
