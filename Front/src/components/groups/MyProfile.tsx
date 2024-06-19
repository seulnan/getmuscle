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
      ID : 'leeyuenjae',
      image : 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyNDA2MDNfNTgg%2FMDAxNzE3NDAyMjk0NDgx.gHy9l29yyNDtkuPmSwc51z5SZ9gnm2BsS6Di3D_hyfQg.eSssTAlWeC30du5Fr-qsVsgptYe4teeVVKgavVflnP0g.JPEG%2FSmartSelect%25A3%25DF20240603%25A3%25DF170526%25A3%25DFChrome.jpg&type=a340',
      nickname: "이지은",
      fitnessGoal: "#다이어트",
    },
    { 
      ID : 'kimjihu123',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIrhwUpwlqv8Y0lpRqnRORgoJOJKZgy_ncgA&s",
      nickname: "김지후",
      fitnessGoal: "#다이어트",
    },
    { 
      ID : 'songyerim321',
      image : 'https://search.pstatic.net/sunny/?src=https%3A%2F%2Fi.pinimg.com%2F736x%2F0c%2F11%2F01%2F0c1101fbf718d4df454ff62c6f73fc47.jpg&type=a340',
      nickname: "강해린",
      fitnessGoal: "#체력충전",
    },
    {
      image: "profilePic2.jpg",
      nickname: "강해린2",
      fitnessGoal: "Lose Weight",
    },
  ]);

  const addFriend = async (friend: any) => {
    try {
      // 친구 추가 API 호출
      const response = await axios.post("http://localhost:5000/api/friends", friend); // API URL 예: "/api/friends"
      setFriends([...friends, response.data]);

      // 1초 후 프로필 목록에서 제거
      setTimeout(() => {
        fetchFriends();
        setProfiles(profiles.filter((p) => p.nickname !== friend.nickname));
      }, 1000);
      
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFriends = async () => {
    try {
      // 친구 목록 불러오기 API 호출
      const response = await axios.get("http://localhost:5000/api/friends"); // API URL 예: "/api/friends"
      //console.log(response.data);
      setFriends(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    

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
              onAddFriend={() => addFriend({ID : profile.ID})}
              showAddFriendButton={true}
            />
          ))}
        </div>
        {/* 여기서부터 나의 득근메이트 */}
        <h2>나의 득근메이트</h2>
        <div className="friendCardContainer">
          {friends.map((friend) => (
            //<Link to="/mateprofile" key={friend.ID}>
              <ProfileCard
                image={friend.image}
                nickname={friend.nickname}
                fitnessGoal={friend.fitnessGoal}
                onAddFriend={() => {}} // 친구목록에는 친구추가버튼필요없으니 빈 함수 전달
                showAddFriendButton={false}
              />
            //</Link>
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
