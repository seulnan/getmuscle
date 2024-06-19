import React, { useState, useEffect } from "react";
import heartIcon from "../../assets/images/notfillheart.png";
import fillheartIcon from "../../assets/images/fillheart.png";
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
        const response = await axios.post("http://localhost:5000/api/likePoint", { ID : '', increment: false }); // 포인트를 5만큼 감소시키는 API 요청
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      setModalMessage("좋아요를 누르셔서 5포인트가 적립되었습니다!"); // 좋아요를 취소했을 때의 메시지
      try {
        const response = await axios.post("http://localhost:5000/api/likePoint", { ID : '', increment: true }); // 포인트를 5만큼 증가시키는 API 요청
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
      <img src={profilePic} alt="profile" />
      <span>{nickname}</span>
      <img src={workoutPic} alt="workout" />
      <img src={heartIconSrc} alt="like" onClick={toggleLike} />
      <p>{dailyWord}</p>
      <p>
        운동이름: {workoutName}, 세트: {sets}, 횟수: {reps}
      </p>
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
