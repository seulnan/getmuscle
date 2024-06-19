import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyProfile.css";
import FeedList from "../../assets/images/FeedList.png";
import MainProfile from "../../assets/images/MainProfile.png";
import MateProfile from "../../assets/images/MateProfile.png";
import Toolbar from "../Toolbar";
import ProfileCard from "../groups/ProfileCard";
import axios from "axios";

const MyProfile: React.FC = () => {
  const [friends, setFriends] = useState<any[]>([]);
  const [profiles, setProfiles] = useState([
    {
      image: "profilePic1.jpg",
      nickname: "User 1",
      fitnessGoal: "Lose Weight",
    },
    {
      image: "profilePic2.jpg",
      nickname: "User 2",
      fitnessGoal: "Lose Weight",
    },
    {
      image: "profilePic2.jpg",
      nickname: "User 3",
      fitnessGoal: "Lose Weight",
    },
    {
      image: "profilePic2.jpg",
      nickname: "User 4",
      fitnessGoal: "Lose Weight",
    },
  ]);

  const addFriend = async (friend: any) => {
    try {
      // 친구 추가 API 호출
      const response = await axios.post("/api/friends", friend); // API URL 예: "/api/friends"
      setFriends([...friends, response.data]);

      // 1초 후 프로필 목록에서 제거
      setTimeout(() => {
        setProfiles(profiles.filter((p) => p.nickname !== friend.nickname));
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        // 친구 목록 불러오기 API 호출
        const response = await axios.get("/api/friends"); // API URL 예: "/api/friends"
        setFriends(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFriends();
  }, []);

  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <h1 className="pageTitle">Community</h1>
        <Link to="/groups" className="feedlistIcon">
          <img src={FeedList} alt="feedlist" />
        </Link>

        <div className="profileInfo">
          <img src={MainProfile} alt="mainprofile" />
          <div>
            <p>운동짱</p>
            <p>#다이어트 #헬린이</p>
          </div>
        </div>
        <h2>득근메이트추천</h2>
        <div className="profileCardsContainer">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              image={profile.image}
              nickname={profile.nickname}
              fitnessGoal={profile.fitnessGoal}
              onAddFriend={() => addFriend(profile)}
              showAddFriendButton={true}
            />
          ))}
        </div>
        <h2>나의 득근메이트</h2>
        <div className="friendCardContainer">
          {friends.map((friend) => (
            <Link to="/mateprofile" key={friend._id}>
              <ProfileCard
                image={friend.image}
                nickname={friend.nickname}
                fitnessGoal={friend.fitnessGoal}
                onAddFriend={() => {}} // 친구목록에는 친구추가버튼필요없으니 빈 함수 전달
                showAddFriendButton={false}
              />
            </Link>
          ))}

          <Link to="/mateprofile">
            <ProfileCard
              image={MateProfile} // Replace with your friend's image URL
              nickname="김난슬" // Replace with your friend's nickname
              fitnessGoal="#다이어트 #헬린이" // Replace with your friend's fitness goal
              onAddFriend={() => {}}
              showAddFriendButton={false}
            />
          </Link>
        </div>
        <Toolbar />
      </div>
    </div>
  );
};

export default MyProfile;
