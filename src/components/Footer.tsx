import { Link } from "react-router-dom";
import Logo from "./Logo";
import { SITE, getWhatsAppUrl, hasWhatsApp } from "@/config/site";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetMyUser } from "@/api/authRouter";
import { Mail, MapPin, MessageCircle, UtensilsCrossed } from "lucide-react";

const footerLinkClass =
  "text-sm text-footer-foreground/90 transition hover:text-white hover:underline";

const Footer = () => {
  const whatsappUrl = getWhatsAppUrl("Hi GhanaBite, I need help.");
  const { isAuthenticated } = useAuth0();
  const { currentUser } = useGetMyUser();

  const role = currentUser?.role;
  const isCustomer = !isAuthenticated || role === "customer";
  const isManager = isAuthenticated && role === "restaurant_manager";
  const isAdmin = isAuthenticated && role === "admin";

  return (
    <footer className="mt-auto border-t border-brand-border/30 bg-footer text-footer-foreground">
      <div className="container mx-auto px-4 py-10 md:px-10 md:py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <Logo size="md" showText={true} variant="white" />
            <p className="max-w-xs text-sm leading-relaxed text-footer-foreground/85">
              {SITE.tagline} Browse local restaurants, order online, and track
              your meal from kitchen to door.
            </p>
            {hasWhatsApp() && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-green-700"
              >
                <MessageCircle className="h-4 w-4" aria-hidden />
                Chat on WhatsApp
              </a>
            )}
          </div>

          {isCustomer && (
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
                For customers
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className={footerLinkClass}>
                    Find food
                  </Link>
                </li>
                {!isAuthenticated && (
                  <li>
                    <Link to="/signup" className={footerLinkClass}>
                      Sign up
                    </Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li>
                    <Link to="/order-status" className={footerLinkClass}>
                      Track orders
                    </Link>
                  </li>
                )}
                {isAuthenticated && (
                  <li>
                    <Link to="/favorites" className={footerLinkClass}>
                      My favorites
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          )}

          {(isManager || !isAuthenticated) && !isAdmin && (
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
                For restaurants
              </h3>
              <ul className="space-y-2">
                {!isAuthenticated && (
                  <li>
                    <Link to="/signup" className={footerLinkClass}>
                      List your restaurant
                    </Link>
                  </li>
                )}
                {isManager && (
                  <>
                    <li>
                      <Link to="/manager-dashboard" className={footerLinkClass}>
                        Manager dashboard
                      </Link>
                    </li>
                    <li>
                      <Link to="/manage-restaurant" className={footerLinkClass}>
                        Manage menu & orders
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}

          {isAdmin && (
            <div>
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
                Admin
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/admin" className={footerLinkClass}>
                    Admin dashboard
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-white">
              Legal & support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className={footerLinkClass}>
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className={footerLinkClass}>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className={footerLinkClass}>
                  Terms of Service
                </Link>
              </li>
              {isAuthenticated && (
                <li>
                  <Link to="/user-profile" className={footerLinkClass}>
                    User profile
                  </Link>
                </li>
              )}
              <li>
                <a
                  href={`mailto:${SITE.supportEmail}`}
                  className={`inline-flex items-center gap-1.5 ${footerLinkClass}`}
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  Email support
                </a>
              </li>
              {hasWhatsApp() && (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 ${footerLinkClass}`}
                  >
                    <MessageCircle className="h-3.5 w-3.5 shrink-0" aria-hidden />
                    {SITE.whatsappDisplay}
                  </a>
                </li>
              )}
              <li>
                <a
                  href={SITE.url}
                  className={`inline-flex items-center gap-1.5 ${footerLinkClass}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {SITE.domain}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/15 pt-6 sm:flex-row">
          <p className="flex items-center gap-1.5 text-center text-xs text-footer-foreground/75 sm:text-left sm:text-sm">
            <UtensilsCrossed className="h-3.5 w-3.5 shrink-0" aria-hidden />
            © {new Date().getFullYear()} {SITE.name}. Made for Ghana.
          </p>
          <p className="text-center text-xs text-footer-foreground/60 sm:text-right">
            Payments secured by Stripe · Sign-in powered by Auth0
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
