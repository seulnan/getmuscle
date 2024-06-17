import React from "react";
import Toolbar from "../Toolbar";
import "./GroupPage.css";
import { Link } from "react-router-dom";
import MainProfile from "../../assets/images/MainProfile.png";
import Post from "./Post";

const GroupPage: React.FC = () => {
  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <h1 className="pageTitle">Community</h1>
        <div className="profileAndFeed">
          <Link to="/myprofile" className="profilePicLink">
            <img src={MainProfile} alt="mainprofile" />
          </Link>
          <h2 className="feedlist">게시물</h2>
          <div className="postContainer">
            <Post
              profilePic="profilePic.jpg"
              nickname="John Doe"
              workoutPic="workoutPic.jpg"
              dailyWord="Today's word"
              workoutName="Workout Name"
              sets={3}
              reps={10}
              isLiked={true} //하트아이콘을 채워진 상태로 표시
            />
            <Post
              profilePic="profilePic.jpg"
              nickname="John Doe"
              workoutPic="workoutPic.jpg"
              dailyWord="Today's word"
              workoutName="Workout Name"
              sets={3}
              reps={10}
              isLiked={true}
            />
            <Post
              profilePic="profilePic.jpg"
              nickname="John Doe"
              workoutPic="workoutPic.jpg"
              dailyWord="Today's word"
              workoutName="Workout Name"
              sets={3}
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

export default GroupPage;
