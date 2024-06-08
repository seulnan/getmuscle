import React, { useEffect, useState } from "react";
import axios from "axios";

export interface Product {
  _id: string;
  name: string;
  img: string;
  price: number;
}

interface ProductListProps {
  onOrder: (product: Product) => void;
}

const ProductList: React.FC<ProductListProps> = ({ onOrder }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products");
        setProducts(response.data);
      } catch (error) {
        setError("상품을 불러오는데 실패했습니다.");
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p className="productImg">{product.img}</p>
          <p className="price">{product.price}원</p>
          <button onClick={() => onOrder(product)}>주문하기</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
