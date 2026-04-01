import { Container } from "../../../components/layout/Container";

export function SustainabilityBanner() {
  return (
    <section className="bg-white">
      <Container className="py-10">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]">
          <div className="grid gap-6 p-8 md:grid-cols-12 md:p-12">
            <div className="md:col-span-7">
              <p className="text-[10px] font-medium tracking-widest text-black/50">
                JOURNAL
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Sustainability as a
                <br />
                New Standard of Luxury
              </h3>
              <p className="mt-3 max-w-md text-sm leading-6 text-black/60">
                Materials, manufacturing, and mindful design—what we look for in
                every curated drop.
              </p>
            </div>
            <div className="md:col-span-5">
              <div className="h-48 w-full rounded-xl bg-white/70 md:h-full" />
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-white/35" />
        </div>
      </Container>
    </section>
  );
}
