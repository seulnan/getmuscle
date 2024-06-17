import React, { useEffect, useState } from "react";
import axios from "axios";
import StyledModal from "../StyledModal"; // Import your Modal component
import OrderIcon from "../images/Order.png"; // Import your SVGIcon component
import styles from "./ProductList.module.css"; // Update the import statement to use the correct file name
import { Link } from "react-router-dom";

// const OrderIcon: string = "data:image/png;base64. */base64,";
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
  const [confirmPurchaseModal, setConfirmPurchaseModal] = useState(false);
  const [userPoints, setUserPoints] = useState(1000); // 예시로 1000으로 설정
  const [insufficientPointsModal, setInsufficientPointsModal] = useState(false);

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

  const handleConfirmClick = () => {
    setConfirmPurchaseModal(true);
  };

  const handleCloseConfirmModal = () => {
    setConfirmPurchaseModal(false);
    setSelectedProduct(null);
  };

  const handleConfirmPurchase = () => {
    if (!selectedProduct) {
      // selectedProduct가 없는 경우 처리
      console.error("선택된 상품이 없습니다.");
      return;
    }

    const totalCost = selectedProduct.price * quantity;

    if (totalCost > userPoints) {
      setInsufficientPointsModal(true);
    } else {
      setUserPoints(userPoints - totalCost);
      handleCloseConfirmModal();
    }
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
              src={OrderIcon}
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
          contentLabel={`${selectedProduct?.name} 상세 정보`}
        >
          <h2>{selectedProduct?.name}</h2>
          <input type="number" value={quantity} readOnly />
          <button onClick={() => handleQuantityChange(-1)}>-</button>
          <button onClick={() => handleQuantityChange(1)}>+</button>
          <button onClick={handleConfirmClick}>완료</button>
        </StyledModal>
      )}
      {confirmPurchaseModal && (
        <StyledModal
          isOpen={true}
          onRequestClose={handleCloseConfirmModal}
          contentLabel="구매 확인"
        >
          <h2>구매하시겠습니까?</h2>
          <p>
            사용 포인트:{" "}
            {selectedProduct &&
              selectedProduct.price &&
              selectedProduct.price * quantity}
            P
          </p>
          <button onClick={handleConfirmPurchase}>예</button>
          <button onClick={handleCloseConfirmModal}>아니오</button>
        </StyledModal>
      )}
      {insufficientPointsModal && (
        <StyledModal
          isOpen={true}
          onRequestClose={() => setInsufficientPointsModal(false)}
          contentLabel="포인트 부족"
        >
          <h2>보유 포인트 부족합니다.</h2>
          <button onClick={() => setInsufficientPointsModal(false)}>
            돌아가기
          </button>
          <Link to="/charge">
            <button>충전하기</button>
          </Link>
        </StyledModal>
      )}
    </div>
  );
};

export default ProductList;
