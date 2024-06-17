import React, { useEffect, useState } from "react";
import axios from "axios";
import StyledModal from "../StyledModal"; // Import your Modal component
import Order from "../images/Order.png"; // Import your SVGIcon component
import styles from "./ProductList.module.css"; // Update the import statement to use the correct file name

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

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

  const handleIconClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product._id} className={styles.productContainer}>
          <img
            className={styles.productImage}
            src={product.img}
            alt={product.name}
          />
          <div className={styles.productDetails}>
            <span className={styles.productName}>{product.name}</span>
            <span className={styles.productPrice}>{product.price}P</span>
            <img
              className={styles.orderIcon}
              src={Order}
              alt="order"
              onClick={() => handleIconClick(product)}
            />
          </div>
        </div>
      ))}
      {selectedProduct && (
        <StyledModal
          isOpen={true}
          onRequestClose={() => setSelectedProduct(null)}
          contentLabel={`${selectedProduct.name} 상세 정보`}
        >
          <h2>{selectedProduct.name}</h2>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <button onClick={() => handleQuantityChange(1)}>+</button>
          <button onClick={() => setSelectedProduct(null)}>완료</button>
        </StyledModal>
      )}
    </div>
  );
};

export default ProductList;
