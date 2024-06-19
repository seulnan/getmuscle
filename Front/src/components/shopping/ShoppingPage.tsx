import React, { useState, useEffect } from "react";
import "./ShoppingPage.css";
import { Link } from "react-router-dom";
import OrderListIcon from "../../assets/images/OrderList.png";
import BannerAdImage from "../../assets/images/BannerAd.png";
import ProductList, { Product } from "./ProductList";
import axios from "axios";
import Toolbar from "../Toolbar";

function ShoppingPage() {
  const [orders, setOrders] = useState<Product[]>([]);
  const [points, setPoints] = useState<number>(0);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/points`);
        setPoints(response.data.points);
      } catch (error) {
        console.error("포인트를 가져오는 데 실패했습니다:", error);
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
      <Link to="/shopping/orders" className="orderList">
        <img src={OrderListIcon} alt="orderlist" className="orderListIcon" />
      </Link>
      <img src={BannerAdImage} alt="bannerAd" className="bannerAd" />
      <div className="pointsDisplay">
        <h2 className="nowpoints">보유 포인트: {points}P</h2>
        <Link to="/shopping/charge" className="chargeButton">
          충전하기
        </Link>
      </div>
      <h2 className="productTitle">이주의 상품</h2>
      <div className="productList">
        <ProductList onOrder={handleOrder} onPointsUpdate={setPoints} />
      </div>
      <div className="toolbar">
        <Toolbar />
      </div>
    </div>
  );
}

export default ShoppingPage;
