import React, { useState, useEffect } from "react";
import heartIcon from "../../assets/images/notfillheart.png";
import fillheartIcon from "../../assets/images/fillheart.png";
import './Post.css';
import StyledModal from "../StyledModal";
import axios from "axios";

interface PostProps {
  profilePic: string;
  nickname: string;
  workoutPic: string;
  dailyWord: string;
  workoutName: string;
  sets: number;
  reps: number;
  isLiked: boolean;
}

const Post: React.FC<PostProps> = ({
  profilePic,
  nickname,
  workoutPic,
  dailyWord,
  workoutName,
  sets,
  reps,
  isLiked: isLikedProp,
}) => {
  const [isLiked, setIsLiked] = useState(isLikedProp);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const heartIconSrc = isLiked ? heartIcon : fillheartIcon;

  const toggleLike = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setModalMessage("좋아요를 취소하셔서 적립된 5포인트가 반환되었습니다!"); // 좋아요를 눌렀을 때의 메시지
      try {
        const response = await axios.post("/api/points", { increment: -5 }); // 포인트를 5만큼 감소시키는 API 요청
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setModalMessage("좋아요를 누르셔서 5포인트가 적립되었습니다!"); // 좋아요를 취소했을 때의 메시지
      try {
        const response = await axios.post("/api/points", { increment: 5 }); // 포인트를 5만큼 증가시키는 API 요청
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    setShowModal(true);
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
      }, 1250);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  return (
    <div className="post">
      <div className="profile-area">
      <img id="profile" src={profilePic} alt="profile" />
      <span className="nickname">{nickname}</span>
      </div>
      <div style={{position:"relative"}}>
        <img id="workout" src={workoutPic} alt="workout" />
        <p id='routine'>
        운동이름: {workoutName}, 세트: {sets}, 횟수: {reps}
        </p>
      </div>
      <div id="heart-container">
        <img id="heart" src={heartIconSrc} alt="like" onClick={toggleLike} />
        <span id="word">{dailyWord}</span>
      </div>
      <StyledModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="Like Modal"
      >
        {modalMessage}
      </StyledModal>
    </div>
  );
};

export default Post;
