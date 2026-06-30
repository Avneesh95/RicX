import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-xl rounded-xl p-10 text-center max-w-md">

        <div className="text-6xl mb-4">
          ✅
        </div>

        <h1 className="text-3xl font-bold text-green-600">
          Payment Successful
        </h1>

        <p className="mt-4 text-gray-600">
          Your order has been placed successfully.
        </p>

        <Link
          to="/orders"
          className="mt-6 inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          View My Orders
        </Link>

      </div>
    </div>
  );
}