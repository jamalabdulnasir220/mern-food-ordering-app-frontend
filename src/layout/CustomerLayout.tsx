import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
  children: React.ReactNode;
  showHero?: boolean;
};

const CustomerLayout = ({ children, showHero = false }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-muted/80 via-background to-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-foreground"
      >
        Skip to main content
      </a>
      <Header />
      {showHero && (
        <div className="container mx-auto px-2 sm:px-4 md:px-10">
          <Hero />
        </div>
      )}
      <main
        id="main-content"
        className="container mx-auto flex-1 px-2 py-6 sm:px-4 md:px-10 md:py-10"
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
