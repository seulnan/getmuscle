import React from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 가져옵니다.

ReactModal.setAppElement("#root");

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode; // 모달 내부에 표시될 내용
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "40px auto",
          backgroundColor: "white",
          padding: "20px",
        }}
      >
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default Modal;
