import { Container } from "../../../components/layout/Container";

const testimonials = [
  {
    name: "Olivia",
    role: "Verified customer",
    quote:
      "The best of the essentials I actually use. Everything feels considered and looks great together.",
  },
  {
    name: "Samuel",
    role: "Verified customer",
    quote:
      "Shipping was fast and the packaging was minimal but premium. Exactly the vibe I wanted.",
  },
  {
    name: "Mina",
    role: "Verified customer",
    quote:
      "Clean experience from browsing to checkout. The curated selection makes it easy to decide.",
  },
];

export function ValueProps() {
  return (
    <section className="bg-white">
      <Container className="py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="flex items-center gap-1 text-black/25" aria-hidden="true">
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
              </div>
              <p className="mt-4 text-sm leading-6 text-black/60">“{t.quote}”</p>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full border border-black/10 bg-black/[0.03]" aria-hidden="true" />
                <div>
                  <div className="text-sm font-medium tracking-tight text-black/80">
                    {t.name}
                  </div>
                  <div className="text-xs text-black/50">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
