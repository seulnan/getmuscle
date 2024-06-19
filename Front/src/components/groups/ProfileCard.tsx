import React, { useState } from "react";
import './ProfileCard.css';
interface ProfileCardProps {
  image: string;
  nickname: string;
  fitnessGoal: string;
  healthCareer:string;
  onAddFriend: () => void;
  showAddFriendButton: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  nickname,
  fitnessGoal,
  healthCareer,
  onAddFriend,
  showAddFriendButton,
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddFriend = () => {
    onAddFriend();
    setIsAdded(true);
    setTimeout(() => {
      // 1초 뒤에 프로필을 사라지게 하는 로직은 상위 컴포넌트에서 관리
    }, 1000);
  };

  return (
    <div className="profileCard">
      <img id='friendprofile' src={image} alt={nickname} />
      <h3>{nickname}</h3>
      <div id="friendtext">
        <span>{fitnessGoal}</span>
        <span>{healthCareer}</span>
      </div>
      {showAddFriendButton && (
        <button onClick={handleAddFriend} disabled={isAdded}>
          {isAdded ? "추가완료" : "친구추가"}
        </button>
      )}
    </div>
  );
};

export default ProfileCard;
