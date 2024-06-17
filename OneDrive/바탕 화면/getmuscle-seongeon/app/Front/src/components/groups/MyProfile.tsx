import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./MyProfile.css";
import FeedList from "../../assets/images/FeedList.png";
import MainProfile from "../../assets/images/MainProfile.png";
import Toolbar from "../Toolbar";

const MyProfile = () => {
  const [profile, setProfile] = useState({ nickname: "", fitnessGoal: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("/api/profile"); // Replace with your actual API endpoint
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="myProfileContainer">
      <Link to="/groups" className="feedlistIcon">
        <img src={FeedList} alt="feedlist" />
      </Link>
      <h1 className="pageTitle">Community</h1>
      <div className="profileInfo">
        <img src={MainProfile} alt="mainprofile" />
        <div>
          <h2>{profile.nickname}</h2>
          <p>{profile.fitnessGoal}</p>
        </div>
      </div>
      <h2>득근메이트추천</h2>
      <Toolbar />
    </div>
  );
};

export default MyProfile;
