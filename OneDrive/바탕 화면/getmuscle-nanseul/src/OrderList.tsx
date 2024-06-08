import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  _id: string;
  product: string;
  quantity: number;
  // Add more fields as per your Order schema in MongoDB
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/orders"); // 여기다 url넣어야됨
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          /* Add functionality to show/hide orders */
        }}
      >
        Show Orders
      </button>
      {orders.map((order) => (
        <div key={order._id}>
          <h2>{order.product}</h2>
          <p>Quantity: {order.quantity}</p>
          {/* Render more order details as needed */}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
