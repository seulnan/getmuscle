import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ReactComponent as BackIcon } from "./images/BackIcon.svg"; // SVG 파일 임포트

interface Order {
  _id: string;
  order_date: Date;
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
      <div className="header">
        <h2 className="orderTitle">구매 내역</h2>
        <Link to="/" className="backIcon">
          <BackIcon />
        </Link>{" "}
        {/* SVG 아이콘을 Link로 감싸서 클릭하면 상품 목록 페이지로 이동 */}
      </div>
      {orders.map((order) => (
        <div key={order._id}>
          <h2>{order.product}</h2>
          <p>Order_date: {order.order_date.toString()}</p>
          <p>Quantity: {order.quantity}</p>
          {/* Render more order details as needed */}
        </div>
      ))}
    </div>
  );
};

export default OrderList;
