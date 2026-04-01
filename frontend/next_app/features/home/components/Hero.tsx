import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function Hero() {
  return (
    <section className="bg-white">
      <Container className="py-10 md:py-14">
        <div className="grid items-stretch gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="text-xs font-medium tracking-widest text-black/50">
              THE CURATED EDIT
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Curated for the
              <br />
              Modern Minimalist
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-black/60">
              Thoughtful essentials across home, tech, and wellness—designed to
              look good and last.
            </p>
            <div className="mt-7 flex items-center gap-3">
              <Link
                href="/search"
                className="inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
              >
                Shop now
              </Link>
              <Link
                href="/category/new"
                className="inline-flex h-10 items-center justify-center rounded-full border border-black/15 bg-white px-5 text-sm font-medium text-black/80 hover:bg-black/[0.03]"
              >
                Explore new
              </Link>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="relative h-[320px] overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] md:h-[420px]">
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <div className="text-xs font-medium tracking-widest text-black/50">
                    EDITORIAL FEATURE
                  </div>
                  <div className="mt-3 text-3xl font-semibold tracking-tight">
                    EDDORISIA
                  </div>
                  <div className="mt-2 text-xs text-black/50">
                    Essentials that elevate everyday living
                  </div>
                </div>
              </div>
              <div className="absolute left-6 top-6 h-10 w-10 rounded-full bg-white/70" />
              <div className="absolute bottom-10 right-10 h-16 w-16 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
