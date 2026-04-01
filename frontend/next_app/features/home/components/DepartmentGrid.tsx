import Link from "next/link";
import { Container } from "../../../components/layout/Container";

const departments = [
  { title: "Apparel", href: "/category/apparel" },
  { title: "Home", href: "/category/home" },
  { title: "Tech", href: "/category/tech" },
  { title: "Wellness", href: "/category/wellness" },
];

export function DepartmentGrid() {
  return (
    <section className="bg-white">
      <Container className="py-10">
        <div className="flex items-end justify-between">
          <h2 className="text-sm font-semibold tracking-tight">Shop by Department</h2>
          <Link
            href="/search"
            className="text-xs font-medium text-black/60 hover:text-black"
          >
            View all
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {departments.map((d) => (
            <Link
              key={d.title}
              href={d.href}
              className="group relative overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03] p-5 hover:bg-black/[0.04]"
            >
              <div className="h-20 w-full rounded-xl bg-white/70" />
              <div className="mt-4 text-sm font-medium tracking-tight">{d.title}</div>
              <div className="mt-1 text-xs text-black/55">Browse collection</div>
              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-white/40 transition-transform group-hover:translate-y-2" />
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
