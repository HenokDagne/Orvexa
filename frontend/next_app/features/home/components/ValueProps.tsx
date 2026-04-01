import { Container } from "../../../components/layout/Container";

const props = [
  {
    title: "Thoughtful curation",
    body: "A tight edit of essentials that pair well together.",
  },
  {
    title: "Fast shipping",
    body: "Simple delivery options and clear tracking.",
  },
  {
    title: "Secure checkout",
    body: "Trusted payments and transparent order updates.",
  },
];

export function ValueProps() {
  return (
    <section className="bg-white">
      <Container className="py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {props.map((p) => (
            <div key={p.title} className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="text-sm font-semibold tracking-tight">{p.title}</div>
              <div className="mt-2 text-sm leading-6 text-black/60">{p.body}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
