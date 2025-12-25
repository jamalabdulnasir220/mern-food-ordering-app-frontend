import Footer from "@/components/Footer";
import ManagerHeader from "@/components/ManagerHeader";

type Props = {
  children: React.ReactNode;
};

const ManagerLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <ManagerHeader />
      <div className="container mx-auto flex-1 py-10 md:px-10">{children}</div>
      <Footer />
    </div>
  );
};

export default ManagerLayout;
