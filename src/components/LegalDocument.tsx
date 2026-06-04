import { Link } from "react-router-dom";
import { SITE, getWhatsAppUrl, hasWhatsApp } from "@/config/site";

type Props = {
  title: string;
  children: React.ReactNode;
};

const LegalDocument = ({ title, children }: Props) => {
  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-8 border-b border-border pb-6">
        <p className="text-sm font-medium text-brand">{SITE.name}</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Last updated: {SITE.lastUpdated}
        </p>
      </header>
      <div className="prose-legal space-y-6 text-sm leading-relaxed text-foreground/90 sm:text-base">
        {children}
      </div>
      <footer className="mt-10 rounded-xl border border-border bg-muted/50 p-4 text-sm text-muted-foreground">
        Questions?{" "}
        <Link to="/contact" className="font-semibold text-brand hover:underline">
          Contact us
        </Link>
        , email{" "}
        <a
          href={`mailto:${SITE.supportEmail}`}
          className="font-semibold text-brand hover:underline"
        >
          {SITE.supportEmail}
        </a>
        {hasWhatsApp() && (
          <>
            , or{" "}
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand hover:underline"
            >
              WhatsApp
            </a>
          </>
        )}
        .{" "}
        <Link to="/" className="font-semibold text-brand hover:underline">
          Back to home
        </Link>
      </footer>
    </article>
  );
};

export default LegalDocument;
