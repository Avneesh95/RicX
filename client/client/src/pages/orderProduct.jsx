import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-xl p-10 text-center">

        <h1 className="text-4xl font-bold text-green-600">
          🎉 Payment Successful
        </h1>

        <p className="mt-4 text-gray-600">
          Thank you for shopping with RicX Store.
        </p>

        <Link
          to="/orders"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg"
        >
          View Orders
        </Link>

      </div>
    </div>
  );
}