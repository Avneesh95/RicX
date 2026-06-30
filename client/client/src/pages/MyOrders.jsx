import { useEffect, useState } from "react";
import api from "../api/axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await api.get("/order/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data.orders);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <h1 className="text-center mt-10 text-2xl">
        Loading Orders...
      </h1>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">

      <h1 className="text-3xl font-bold mb-8">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">

          <h2 className="text-2xl font-bold">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mt-3">
            Start shopping today!
          </p>

        </div>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-xl shadow p-6"
            >
              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-lg">
                    Order #{order._id.slice(-6)}
                  </h2>

                  <p className="text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>

                </div>

                <div className="text-right">

                  <h2 className="text-xl font-bold text-indigo-600">
                    ₹{order.totalAmount}
                  </h2>

                  <span
                    className={`font-semibold ${
                      order.status === "pending"
                        ? "text-orange-500"
                        : order.status === "shipped"
                        ? "text-blue-500"
                        : order.status === "delivered"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>

                </div>

              </div>

              <div className="mt-5">

                {order.orderItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 py-2"
                  >
                    <img
                      src={item.product.image.url}
                      className="w-16 h-16 rounded-lg object-cover"
                      alt=""
                    />

                    <div className="flex-1">

                      <h3 className="font-semibold">
                        {item.product.name}
                      </h3>

                      <p className="text-gray-500">
                        Qty : {item.quantity}
                      </p>

                    </div>

                    <span>
                      ₹{item.price}
                    </span>

                  </div>
                ))}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}