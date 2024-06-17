import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BackIcon from "../images/BackIcon.png";

interface Order {
  _id: string;
  img: string;
  name: string;
  price: number;
  order_date: Date;
  arrive_date: Date;
  arrive_done: boolean;
  count: number;
  userID: string;
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
      <div className="header">
        <h2 className="orderTitle">구매 내역</h2>
        <Link to="/" className="backIcon">
          <BackIcon />
        </Link>{" "}
      </div>
      {orders.map((order) => (
        <div key={order._id}>
          <h2>{order.name}</h2>
          <p>수량: {order.count.toString()}</p>
          <p>
            주문날짜:{" "}
            {order.order_date
              ? new Date(order.order_date).toString()
              : "주문 날짜 없음"}
          </p>
          <p>
            도착날짜:{" "}
            {order.arrive_date
              ? new Date(order.arrive_date).toString()
              : "도착 날짜 없음"}
          </p>
          {/* Render more order details as needed */}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
