import { Clock, ShieldCheck, UtensilsCrossed } from "lucide-react";

const features = [
  {
    icon: UtensilsCrossed,
    title: "Local favorites",
    description:
      "Browse trusted Ghanaian restaurants and authentic dishes near you.",
  },
  {
    icon: Clock,
    title: "Fast delivery",
    description:
      "See estimated delivery times upfront so you know when food arrives.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    description:
      "Pay safely with Stripe and track your order from kitchen to door.",
  },
] as const;

const FeatureHighlights = () => {
  return (
    <section
      aria-labelledby="features-heading"
      className="grid gap-4 sm:grid-cols-3 sm:gap-6"
    >
      <h2 id="features-heading" className="sr-only">
        Why GhanaBite
      </h2>
      {features.map(({ icon: Icon, title, description }) => (
        <div
          key={title}
          className="rounded-xl border border-brand-border bg-card p-5 shadow-sm transition hover:shadow-md"
        >
          <div className="mb-3 inline-flex rounded-lg bg-brand-muted p-2.5 text-brand">
            <Icon className="h-5 w-5" aria-hidden />
          </div>
          <h3 className="font-bold text-foreground">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      ))}
    </section>
  );
};

export default FeatureHighlights;
