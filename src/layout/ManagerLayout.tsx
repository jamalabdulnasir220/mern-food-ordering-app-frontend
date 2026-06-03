import Footer from "@/components/Footer";
import ManagerHeader from "@/components/ManagerHeader";

type Props = {
  children: React.ReactNode;
};

const ManagerLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-brand-muted/60 via-background to-background">
      <ManagerHeader />
      <div className="container mx-auto flex-1 px-2 py-6 sm:px-4 md:px-10 md:py-10">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default ManagerLayout;
