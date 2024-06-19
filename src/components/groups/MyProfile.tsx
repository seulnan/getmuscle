import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MyProfile.css";
import FeedList from "../../assets/images/FeedList.png";
import MainProfile from "../../assets/images/MainProfile.png";
import MateProfile from "../../assets/images/MateProfile.png";
import Toolbar from "../Toolbar";
import ProfileCard from "../groups/ProfileCard";
import axios from "axios";
import RecommendProfile1 from "../../assets/images/RecommendProfile1.png";
import RecommendProfile2 from "../../assets/images/RecommendProfile2.png";
import RecommendProfile3 from "../../assets/images/RecommendProfile3.png";

const MyProfile: React.FC = () => {
  const [friends, setFriends] = useState<any[]>([]);
  const [profiles, setProfiles] = useState([
    {
      image: RecommendProfile1,
      nickname: "이연재",
      fitnessGoal: "#다이어트",
      healthCareer: "#헬창"
    },
    {
      image: RecommendProfile2,
      nickname: "김지후",
      fitnessGoal: "#득근",
      healthCareer: "#헬린이"
    },
    {
      image: RecommendProfile3,
      nickname: "송예림",
      fitnessGoal: "#체력 증진",
      healthCareer: "#헬창"
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
        <div className="mainProfile">
          <img id="mainimage" src={MainProfile} alt="mateprofile" />
          <div className="profileText">
            <span id="profilename">박하은</span>
            <span id="tag">#다이어트 #헬린이</span>
          </div>
        </div>
        <h2 id="recommendtitle">득근메이트추천</h2>
        <div className="profileCardsContainer">
          {profiles.map((profile, index) => (
            <ProfileCard
              key={index}
              image={profile.image}
              nickname={profile.nickname}
              fitnessGoal={profile.fitnessGoal}
              healthCareer={profile.healthCareer}
              onAddFriend={() => addFriend(profile)}
              showAddFriendButton={true}
            />
          ))}
        </div>
        <h2 id='myfriendtitle'>나의 득근메이트</h2>
        <div className="friendCardContainer">
          <Link to="/groups/mateprofile">
            <ProfileCard
              image={MateProfile} // Replace with your friend's image URL
              nickname="김난슬" // Replace with your friend's nickname
              fitnessGoal="#다이어트" // Replace with your friend's fitness goal
              healthCareer="헬린이"
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
