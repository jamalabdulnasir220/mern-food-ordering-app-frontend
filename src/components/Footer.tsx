import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-brand-border/30 bg-footer px-3 py-8 text-footer-foreground">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row md:px-10">
        <Logo size="md" showText={true} variant="white" />
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-4 text-sm font-semibold sm:gap-6 sm:text-base"
        >
          <Link to="/" className="transition hover:opacity-80">
            Home
          </Link>
          <Link to="/signup" className="transition hover:opacity-80">
            Sign up
          </Link>
          <span className="opacity-70">Privacy</span>
          <span className="opacity-70">Terms</span>
        </nav>
        <p className="text-center text-xs opacity-80 sm:text-sm">
          © {new Date().getFullYear()} GhanaBite. Made for Ghana.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
