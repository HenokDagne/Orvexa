import Link from "next/link";
import { Container } from "@/components/layout/Container";

type OrderItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

const items: OrderItem[] = [
  { id: "p-01", name: "Sculpted Wool Coat", qty: 1, price: 451 },
  { id: "p-02", name: "Elixir Silk Scarf", qty: 1, price: 120 },
];

function money(value: number) {
  return value.toLocaleString(undefined, { style: "currency", currency: "USD" });
}

function Step({
  number,
  label,
  active,
}: {
  number: number;
  label: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={
          "grid h-6 w-6 place-items-center rounded-full border text-[10px] font-semibold " +
          (active
            ? "border-black bg-black text-white"
            : "border-black/10 bg-white text-black/50")
        }
        aria-hidden="true"
      >
        {number}
      </span>
      <span
        className={
          "text-[10px] font-medium tracking-widest " +
          (active ? "text-black/70" : "text-black/40")
        }
      >
        {label}
      </span>
    </div>
  );
}

export default function CheckoutPage() {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = 0;
  const estimatedTax = Math.round(subtotal * 0.0825 * 100) / 100;
  const total = subtotal + shipping + estimatedTax;

  return (
    <div className="bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Checkout
            </h1>
            <div className="mt-4 flex items-center gap-6">
              <Step number={1} label="SHIPPING" active />
              <div className="h-px w-10 bg-black/10" aria-hidden="true" />
              <Step number={2} label="PAYMENT" />
              <div className="h-px w-10 bg-black/10" aria-hidden="true" />
              <Step number={3} label="REVIEW" />
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <section>
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold tracking-tight">
                  Returning customer?
                </div>
                <Link
                  href="/auth"
                  className="inline-flex h-8 items-center justify-center rounded-full border border-black/10 bg-white px-3 text-xs font-medium tracking-widest text-black/70 hover:bg-black/[0.03]"
                >
                  SIGN IN
                </Link>
              </div>
              <p className="mt-2 text-sm leading-6 text-black/60">
                Sign in to apply saved addresses and discounts.
              </p>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold tracking-tight">
                  Shipping Address
                </div>
                <button
                  type="button"
                  className="text-xs font-medium text-black/60 hover:text-black"
                >
                  Use my location
                </button>
              </div>

              <div className="mt-5 grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-[10px] font-medium tracking-widest text-black/50">
                      FIRST NAME
                    </label>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium tracking-widest text-black/50">
                      LAST NAME
                    </label>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-medium tracking-widest text-black/50">
                    STREET ADDRESS
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
                    placeholder="123 Aurora Boulevard"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="md:col-span-1">
                    <label className="text-[10px] font-medium tracking-widest text-black/50">
                      CITY
                    </label>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
                      placeholder="New York"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium tracking-widest text-black/50">
                      STATE
                    </label>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
                      placeholder="NY"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-medium tracking-widest text-black/50">
                      ZIP CODE
                    </label>
                    <input
                      className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
                      placeholder="10001"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-medium tracking-widest text-black/50">
                    EMAIL ADDRESS
                  </label>
                  <input
                    className="mt-2 h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70"
                    placeholder="jane@example.com"
                    type="email"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-black/10 bg-white p-6">
              <div className="text-sm font-semibold tracking-tight">
                Delivery Method
              </div>

              <div className="mt-5 grid gap-3 md:grid-cols-2">
                <label className="group relative flex cursor-pointer items-start gap-3 rounded-2xl border border-black/30 bg-black/[0.02] p-4">
                  <input
                    type="radio"
                    name="delivery"
                    defaultChecked
                    className="mt-1 h-4 w-4 accent-black"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium tracking-tight text-black/80">
                        Standard Delivery
                      </div>
                      <div className="text-sm font-medium text-black/70">
                        Free
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-black/60">
                      3–5 business days
                    </div>
                  </div>
                </label>

                <label className="group relative flex cursor-pointer items-start gap-3 rounded-2xl border border-black/10 bg-white p-4 hover:bg-black/[0.02]">
                  <input
                    type="radio"
                    name="delivery"
                    className="mt-1 h-4 w-4 accent-black"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center justify-between gap-3">
                      <div className="text-sm font-medium tracking-tight text-black/80">
                        Express Shipping
                      </div>
                      <div className="text-sm font-medium text-black/70">
                        $35.00
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-black/60">
                      1–2 business days
                    </div>
                  </div>
                </label>
              </div>

              <button
                type="button"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-xl bg-black px-5 text-sm font-medium text-white hover:bg-black/90"
              >
                Next: Payment →
              </button>
            </div>
          </section>

          <aside>
            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <div className="text-sm font-semibold tracking-tight">Order Summary</div>

              <div className="mt-5 grid gap-4">
                {items.map((i) => (
                  <div key={i.id} className="grid grid-cols-[44px_1fr_auto] items-center gap-3">
                    <div className="overflow-hidden rounded-xl border border-black/10 bg-black/[0.03]">
                      <div className="aspect-square w-full bg-gradient-to-br from-white/70 to-black/[0.02]" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium tracking-tight text-black/80">
                        {i.name}
                      </div>
                      <div className="mt-1 text-xs text-black/40">Qty: {i.qty}</div>
                    </div>
                    <div className="text-sm font-medium text-black/70">
                      {money(i.price * i.qty)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 border-t border-black/10 pt-5 text-sm">
                <div className="flex items-center justify-between text-black/60">
                  <span>Subtotal</span>
                  <span className="text-black/70">{money(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-black/60">
                  <span>Shipping</span>
                  <span className="text-black/70">
                    {shipping === 0 ? "Calculated at checkout" : money(shipping)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-black/60">
                  <span>Estimated tax</span>
                  <span className="text-black/70">{money(estimatedTax)}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-black/10 pt-5">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] font-medium tracking-widest text-black/50">
                    TOTAL
                  </div>
                  <div className="text-lg font-semibold tracking-tight">
                    {money(total)}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-[10px] font-medium tracking-widest text-black/50">
                    PROMO CODE
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="h-10 w-full rounded-xl border border-black/10 bg-white px-3 text-sm text-black/70 placeholder:text-black/30"
                    />
                    <button
                      type="button"
                      className="h-10 rounded-xl border border-black/10 bg-white px-4 text-xs font-medium tracking-widest text-black/70 hover:bg-black/[0.03]"
                    >
                      APPLY
                    </button>
                  </div>
                </div>

                <div className="mt-5 text-[10px] font-medium tracking-widest text-black/40">
                  SECURE PAYMENT · FREE RETURNS
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </div>
  );
}
