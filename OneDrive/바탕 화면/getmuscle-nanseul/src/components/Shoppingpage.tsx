import React, { useState } from "react";
import "./Shoppingpage.css";
import { Link } from "react-router-dom";
import { ReactComponent as OrderListIcon } from "./images/OrderListIcon.svg";
import { ReactComponent as BannerAd } from "./images/BannerAd.svg";
import ProductList, { Product } from "./ProductList"; // `Product` 타입을 정확하게 import 함

const ShoppingPage: React.FC = () => {
  const [orders, setOrders] = useState<Product[]>([]); // `ProductType`을 `Product`로 변경

  const handleOrder = (product: Product): void => {
    // `ProductType`을 `Product`로 변경
    setOrders([...orders, product]);
  };

  return (
    <div>
      <div className="header">
        <h1 className="pageTitle">Shopping</h1>
      </div>
      <Link to="/orders" className="orderListIcon">
        <OrderListIcon />
      </Link>
      <BannerAd className="bannerAd" />
      <h2 className="productTitle">이주의 상품</h2>
      <ProductList onOrder={handleOrder} />
    </div>
  );
};

export default ShoppingPage;
