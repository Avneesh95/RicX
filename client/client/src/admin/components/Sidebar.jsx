import { Link } from "react-router-dom";
import { FaBox, FaUsers, FaChartBar } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 bg-slate-900 p-6">
      <h1 className="text-2xl font-bold text-cyan-400 mb-10">
        Admin Panel
      </h1>

      <div className="flex flex-col gap-4">
        <Link to="/admin" className="flex items-center gap-3 hover:text-cyan-400">
          <FaChartBar /> Dashboard
        </Link>

        <Link to="/admin/products" className="flex items-center gap-3 hover:text-cyan-400">
          <FaBox /> Products
        </Link>

        <Link to="/admin/users" className="flex items-center gap-3 hover:text-cyan-400">
          <FaUsers /> Users
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;