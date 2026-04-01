import { Container } from "../../../components/layout/Container";

export function SustainabilityBanner() {
  return (
    <section className="bg-white">
      <Container className="py-10">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/[0.03]">
          <div className="absolute inset-0 bg-gradient-to-b from-black/[0.02] to-black/[0.05]" />
          <div className="relative grid min-h-[320px] place-items-center px-8 py-14 text-center md:min-h-[380px]">
            <div>
              <p className="text-[10px] font-medium tracking-widest text-black/50">
                JOURNAL
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight md:text-3xl">
                Sustainability as a
                <br />
                New Standard of Luxury
              </h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/60">
                Materials, manufacturing, and mindful design—what we look for in
                every curated drop.
              </p>
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-white/35" />
        </div>
      </Container>
    </section>
  );
}
