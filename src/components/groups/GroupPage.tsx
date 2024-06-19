import React from "react";
import { Outlet } from "react-router-dom";
import Toolbar from "../Toolbar";
import "./GroupPage.css";
import { Link } from "react-router-dom";
import MainProfile from "../../assets/images/MainProfile.png";
import workoutPic from "../../assets/images/Mypost1.png";
import exercisePic from '../../assets/images/Mypost2.png';
import MateProfile from "../../assets/images/MateProfile.png";
import exercisePic2 from "../../assets/images/Mypost3.png";
import MateProfile2 from "../../assets/images/Mate2Profile.png"; 
import Post from "./Post";

const GroupsPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <h1 className="pageTitle">Community</h1>
        <div className="profileAndFeed">
          <Link to="/groups/myprofile" className="profilePicLink">
            <img src={MainProfile} alt="mainprofile" />
          </Link>
          <h2 className="feedlist">게시물</h2>
          <div className="postContainer">
            <Post
              profilePic={MainProfile}
              nickname="박하은"
              workoutPic={workoutPic}
              dailyWord="운동을 열심히 하자"
              workoutName="푸쉬업"
              sets={3}
              reps={10}
              isLiked={true} //하트아이콘을 채워진 상태로 표시
            />
            <Post
              profilePic={MateProfile}
              nickname="김난슬"
              workoutPic={exercisePic2}
              dailyWord="득근하자"
              workoutName="런지"
              sets={4}
              reps={10}
              isLiked={true}
            />
            <Post
              profilePic={MateProfile2}
              nickname="김나연"
              workoutPic={exercisePic}
              dailyWord="몸짱이 될래요"
              workoutName="스쿼트"
              sets={2}
              reps={10}
              isLiked={true}
            />
          </div>
        </div>
      </div>
      <Toolbar />
    </div>
  );
};

export default GroupsPage;
