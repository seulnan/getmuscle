import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import BackIcon from "../images/BackIcon.png";
const BackIcon = () => {
  return (
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGkSURBVHgB7ZjBTcNAEEX/2FaAWzogVICogHQSd4BREiJOmAMihCCFCjAVICogdEAHmA5yywEnw65J4rW4ecYX5HewPHNYjd6uZ3cNNDT8AziO2lDAgzJ8G3WwH7zwXb8HIerFwQt6IOqal4THw08IUC0utwaKndQcAnTNkX9VioNWDAFqxeXWyAuLBBIa3HxBQAAtXGuEBXyZNYuKub/WeCa1ZtGZ1vJaS+HvJVCAIIQfRsfI1h/OkCGNJs9QQG5utZo5UapVmEVUXL4LsG24W0o9TozMHHuxE6las1RuJZu9s1NkdK1Zqpur2ZqlUnE8GZ6a77xTZPStWSoVRxf377D9bAuvQ9RA9Wn1ONq9myNSblOZysXRcPoK4vkusUYCZYRN2FlrZg1qnH5Lo0MITwZvRSPmBZbZEcWzBRRQ2PjdL5XaOAjOoITYnKUue0on4XrsqZizmJvWkxkt3EQq9vQuOOxfF4GOPbXi6HKc2ru+k4p42j+EAN2rYSt7NM/NVBp7GWIIUC2Ozu0a4+JkTF4XAvR/R/zaS/MpXn6foKGhQYcf1zmE1lscmNIAAAAASUVORK5CYII="
      alt="example"
    />
  );
};

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
