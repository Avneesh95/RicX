import { Link } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  return (
    <nav className="flex justify-between px-6 py-4 bg-slate-900 text-white">

      <h1 className="font-bold text-xl">RicX Store</h1>

      <div className="flex gap-4 items-center">

        <Link to="/">Home</Link>

        {!token && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* ADMIN BUTTON */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-red-600 px-4 py-2 rounded-lg"
          >
            Admin Dashboard
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;