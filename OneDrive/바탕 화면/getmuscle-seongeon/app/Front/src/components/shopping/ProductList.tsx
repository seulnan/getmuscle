import React, { useEffect, useState } from "react";
import axios from "axios";
import StyledModal from "../StyledModal"; // Import your Modal component
import OrderIcon from "../../assets/images/Order.png"; // Import your SVGIcon component
import styles from "./ProductList.module.css"; // Update the import statement to use the correct file name
import { Link } from "react-router-dom";

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
  const [modalType, setModalType] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0); // 예시로 1000으로 설정

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

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/users/points");
        if (response.status === 200) {
          setUserPoints(response.data.points);
        } else {
          console.error(response.data.error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserPoints();
  }, []);

  const handleIconClick = (product: Product) => {
    setSelectedProduct(product);
    setModalType("detail");
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + delta));
  };

  const handleConfirmClick = () => {
    if (!selectedProduct) {
      console.error("선택된 상품이 없습니다.");
      return;
    }

    const totalCost = selectedProduct.price * quantity;

    if (totalCost > userPoints) {
      setModalType("insufficient");
    } else {
      setModalType("confirm");
    }
  };

  const handleConfirmPurchase = async () => {
    if (!selectedProduct) {
      console.error("선택된 상품이 없습니다.");
      return;
    }

    const totalCost = selectedProduct.price * quantity;

    if (totalCost <= userPoints) {
      try {
        const response = await axios.post(
          "http://localhost:5000/users/use-points",
          //여기다 포인트 차감api넣을것
          {
            points: totalCost,
          }
        );

        if (response.status === 200) {
          setUserPoints((prevPoints) => prevPoints - totalCost);
          setModalType("purchaseComplete");
        } else {
          console.error("포인트 차감에 실패했습니다.");
        }
      } catch (error) {
        console.error("포인트 차감 요청 중 오류가 발생했습니다.", error);
      }
    } else {
      setModalType("insufficient");
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedProduct(null);
    setQuantity(1); // 모달이 닫힐 때 수량을 초기화합니다.
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
      <StyledModal
        isOpen={modalType !== null}
        onRequestClose={closeModal}
        contentLabel={
          modalType === "detail"
            ? `${selectedProduct?.name} 상세 정보`
            : modalType === "confirm"
            ? "구매 확인"
            : modalType === "insufficient"
            ? "포인트 부족"
            : "구매 완료"
        }
      >
        {modalType === "detail" && selectedProduct && (
          <>
            <h2>{selectedProduct.name}</h2>
            <input type="number" value={quantity} readOnly />
            <button onClick={() => handleQuantityChange(-1)}>-</button>
            <button onClick={() => handleQuantityChange(1)}>+</button>
            <button onClick={handleConfirmClick}>구매 확인</button>
          </>
        )}
        {modalType === "confirm" && selectedProduct && (
          <>
            <h2>구매하시겠습니까?</h2>
            <p>사용 포인트: {selectedProduct.price * quantity}P</p>
            <button onClick={handleConfirmPurchase}>예</button>
            <button onClick={closeModal}>아니오</button>
          </>
        )}
        {modalType === "insufficient" && (
          <>
            <h2>보유 포인트 부족합니다.</h2>
            <button onClick={closeModal}>돌아가기</button>
            <Link to="/charge">
              <button>충전하기</button>
            </Link>
          </>
        )}
        {modalType === "purchaseComplete" && (
          <>
            <h2>구매 완료되었습니다.</h2>
            <button onClick={closeModal}>완료</button>
          </>
        )}
      </StyledModal>
    </div>
  );
};

export default ProductList;
