import Footer from "@/components/Footer";
import AdminHeader from "@/components/AdminHeader";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminHeader />
      <div className="container mx-auto flex-1 px-2 py-6 sm:px-4 md:px-10 md:py-10">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
