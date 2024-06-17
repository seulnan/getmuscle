import React, { useState, useEffect } from "react";
import "./ShoppingPage.css";
import { Link } from "react-router-dom";
import OrderListIcon from "../images/OrderListIcon.png";
import BannerAd from "../images/BannerAd.png";
import ProductList, { Product } from "./ProductList";
import axios from "axios";
import Toolbar from "../Toolbar";

const ShoppingPage: React.FC = () => {
  const [orders, setOrders] = useState<Product[]>([]);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/users/{userId}/points`
        ); // Replace {userId} with actual user ID //여기다가 몽고db에서 사용자의 포인트를 가져오는 API가 필요함, 사용자의 ID를 받아 해당사용자의 포인트를 반환해야함
        setPoints(response.data.points);
      } catch (error) {
        console.error("Failed to fetch points:", error);
      }
    };

    fetchPoints();
  }, []);

  const handleOrder = (product: Product): void => {
    setOrders([...orders, product]);
  };

  return (
    <div>
      <div className="header">
        <h1 className="pageTitle">Shopping</h1>
      </div>
      <Link to="/orders" className="orderListIcon">
        <img src={OrderListIcon} alt="orderlisticon" />
      </Link>
      <img src={BannerAd} alt="bannerAd" className="bannerAd" />
      <div className="pointsDisplay">
        <h2>보유 포인트: {points}P</h2>
        <Link to="/charge" className="chargeButton">
          충전하기
        </Link>
      </div>
      <h2 className="productTitle">이주의 상품</h2>
      <div className="productList">
        <ProductList onOrder={handleOrder} />
      </div>
      <div className="toolbar">
        <Toolbar />
      </div>
    </div>
  );
};

export default ShoppingPage;
