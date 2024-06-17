import React, { useEffect, useState } from "react";
import axios from "axios";
import Toolbar from "../Toolbar";
import "./GroupPage.css";
import { Link } from "react-router-dom";
import MainProfile from "../../assets/images/MainProfile.png";

interface Post {
  _id: string;
  nickname: string;
  content: string;
  author: string;
  exc_history: Int32Array;
  exc_purpose: string[];
}

const GroupPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/posts"); // API endpoint를 실제 endpoint로 변경해주세요.
        setPosts(response.data);
      } catch (error) {
        console.error("게시물목록을 조회하는데 실패했습니다", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <h1 className="pageTitle">Community</h1>
        <div className="profileAndFeed">
          <Link to="/myprofile" className="profilePicLink">
            <img src={MainProfile} alt="mainprofile" />
          </Link>
          <h2 className="feedlist">게시물</h2>
        </div>
      </div>
      {posts.map((post) => (
        <div key={post._id}>
          <p>{post.content}</p>
          <p>Author: {post.author}</p>
        </div>
      ))}
      <Toolbar />
    </div>
  );
};

export default GroupPage;
