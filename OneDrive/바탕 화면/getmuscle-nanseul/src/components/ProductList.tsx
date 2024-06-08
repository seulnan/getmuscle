import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductList.css"; // CSS 파일 임포트

interface Product {
  _id: string;
  img: string;
  name: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null); // 오류 상태 추가

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products"); //여기다 url추가하면됨
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("상품을 불러오는 데 실패했습니다."); //오류 발생시 상태 업데이트
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="productTitle">이주의 상품</h2>
      {error && <p>{error}</p>} {/* 오류 메시지 표시 */}
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p className="productImg">{product.img}</p>
          <p className="price">{product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
