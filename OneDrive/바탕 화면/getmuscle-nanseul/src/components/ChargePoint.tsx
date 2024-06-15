import React, { useState } from "react";
import axios from "axios";
import StyledModal from "./StyledModal";
import { useNavigate } from "react-router-dom";

const ChargePoint: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [points, setPoints] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleCharge = async (chargePoints: number) => {
    try {
      // 서버에 포인트 충전 요청을 보냅니다.
      const response = await axios.post("/api/charge", {
        points: chargePoints,
      });
      // 응답에서 포인트를 가져와 상태를 업데이트합니다.
      setPoints(response.data.points);
    } catch (error) {
      console.error(error);
      setPoints(null);
    } finally {
      // 모달을 엽니다.
      setModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleGoShopping = () => {
    navigate("/");
  };

  return (
    <div>
      <div>
        <span>250P</span>
        <button onClick={() => handleCharge(2500)}>₩2500</button>
      </div>
      <div>
        <span>550P</span>
        <button onClick={() => handleCharge(5000)}>₩5000</button>
      </div>
      <div>
        <span>1100P</span>
        <button onClick={() => handleCharge(10000)}>₩10000</button>
      </div>
      <StyledModal
        isOpen={modalOpen}
        onRequestClose={handleCloseModal}
        contentLabel="포인트 충전 완료"
      >
        <h1>포인트 충전이 완료되었습니다.</h1>
        <p>현재 보유 포인트: {points ? `${points}P` : "null P"}</p>
        <button onClick={handleCloseModal}>계속 충전하기</button>
        <button onClick={handleGoShopping}>쇼핑하러 가기</button>
      </StyledModal>
    </div>
  );
};

export default ChargePoint;
