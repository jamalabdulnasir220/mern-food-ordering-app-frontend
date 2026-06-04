import { Link } from "react-router-dom";
import { SITE, getWhatsAppUrl, hasWhatsApp } from "@/config/site";
import { Button } from "@/components/ui/button";
import {
  Clock,
  HelpCircle,
  Mail,
  MessageCircle,
  Store,
  UtensilsCrossed,
} from "lucide-react";

const ContactPage = () => {
  const customerWhatsApp = getWhatsAppUrl(
    "Hi GhanaBite, I need help with an order.",
  );
  const restaurantWhatsApp = getWhatsAppUrl(
    "Hi GhanaBite, I want to list my restaurant on the platform.",
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <header className="text-center sm:text-left">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          Support
        </p>
        <h1 className="mt-1 text-2xl font-bold text-foreground sm:text-3xl">
          Contact {SITE.name}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Questions about an order, your account, or listing a restaurant? Reach
          out — we&apos;re happy to help.
        </p>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground sm:justify-start">
          <Clock className="h-4 w-4 shrink-0 text-brand" aria-hidden />
          {SITE.supportHours}
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        <a
          href={`mailto:${SITE.supportEmail}?subject=${encodeURIComponent("GhanaBite support")}`}
          className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-brand-border hover:shadow-md sm:p-6"
        >
          <div className="mb-4 inline-flex w-fit rounded-xl bg-brand-muted p-3 text-brand">
            <Mail className="h-6 w-6" aria-hidden />
          </div>
          <h2 className="text-lg font-bold text-foreground">Email us</h2>
          <p className="mt-1 flex-1 text-sm text-muted-foreground">
            Best for order issues, account problems, or detailed questions.
          </p>
          <p className="mt-3 break-all text-sm font-semibold text-brand group-hover:underline">
            {SITE.supportEmail}
          </p>
        </a>

        {hasWhatsApp() && (
          <a
            href={customerWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-green-300 hover:shadow-md dark:hover:border-green-800 sm:p-6"
          >
            <div className="mb-4 inline-flex w-fit rounded-xl bg-green-100 p-3 text-green-700 dark:bg-green-950 dark:text-green-400">
              <MessageCircle className="h-6 w-6" aria-hidden />
            </div>
            <h2 className="text-lg font-bold text-foreground">WhatsApp</h2>
            <p className="mt-1 flex-1 text-sm text-muted-foreground">
              Fast replies for quick questions — tap to open a chat.
            </p>
            <p className="mt-3 text-sm font-semibold text-green-700 group-hover:underline dark:text-green-400">
              {SITE.whatsappDisplay}
            </p>
          </a>
        )}
      </div>

      <section className="rounded-2xl border border-brand-border bg-brand-muted/40 p-5 sm:p-6">
        <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
          <HelpCircle className="h-5 w-5 text-brand" aria-hidden />
          How can we help?
        </h2>
        <ul className="mt-4 space-y-3 text-sm text-foreground/90 sm:text-base">
          <li className="flex gap-3">
            <UtensilsCrossed
              className="mt-0.5 h-4 w-4 shrink-0 text-brand"
              aria-hidden
            />
            <span>
              <strong>Order help</strong> — missing items, late delivery, or
              payment questions. Include your restaurant name and order time if
              possible.
            </span>
          </li>
          <li className="flex gap-3">
            <Store className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
            <span>
              <strong>Restaurant partners</strong> — sign up, menu updates, or
              manager dashboard access.
            </span>
          </li>
          <li className="flex gap-3">
            <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden />
            <span>
              <strong>Account & privacy</strong> — profile, data requests, or
              security concerns.
            </span>
          </li>
        </ul>
      </section>

      {hasWhatsApp() && (
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild className="flex-1 font-bold">
            <a href={customerWhatsApp} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-4 w-4" aria-hidden />
              WhatsApp — order help
            </a>
          </Button>
          <Button asChild variant="outline" className="flex-1 border-green-600 font-bold text-green-700 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950">
            <a
              href={restaurantWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp — list restaurant
            </a>
          </Button>
        </div>
      )}

      <p className="text-center text-xs text-muted-foreground sm:text-sm">
        See also{" "}
        <Link to="/privacy" className="font-semibold text-brand hover:underline">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link to="/terms" className="font-semibold text-brand hover:underline">
          Terms of Service
        </Link>
        .
      </p>
    </div>
  );
};

export default ContactPage;
