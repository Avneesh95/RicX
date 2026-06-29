import Sidebar from "./components/Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
};

export default AdminLayout;