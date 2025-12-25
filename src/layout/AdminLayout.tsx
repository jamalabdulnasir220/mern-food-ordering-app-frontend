import Footer from "@/components/Footer";
import AdminHeader from "@/components/AdminHeader";

type Props = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <AdminHeader />
      <div className="container mx-auto flex-1 py-10 md:px-10">{children}</div>
      <Footer />
    </div>
  );
};

export default AdminLayout;
