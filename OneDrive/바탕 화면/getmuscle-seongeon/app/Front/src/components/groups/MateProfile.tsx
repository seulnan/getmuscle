import { Link } from "react-router-dom";
import Post from "./Post";
import MainProfile from "../../assets/images/MainProfile.png";
import MateProfileImage from "../../assets/images/MateProfile.png";

const MateProfile = () => {
  const posts = [
    {
      id: 1,
      profilePic: MateProfileImage,
      nickname: "김난슬",
      workoutPic: "https://example.com/workout1.jpg", // 운동 사진 URL
      dailyWord: "오늘도 열심히 운동했어요!",
      workoutName: "스쿼트",
      sets: 3,
      reps: 12,
      isLiked: true,
    },
    {
      id: 2,
      profilePic: MateProfileImage,
      nickname: "김난슬",
      workoutPic: "https://example.com/workout2.jpg", // 운동 사진 URL
      dailyWord: "헬린이의 첫 데드리프트 도전!",
      workoutName: "데드리프트",
      sets: 4,
      reps: 10,
      isLiked: true,
    },
    {
      id: 3,
      profilePic: MateProfileImage,
      nickname: "김난슬",
      workoutPic: "https://example.com/workout2.jpg", // 운동 사진 URL
      dailyWord: "헬린이의 첫 데드리프트 도전!",
      workoutName: "데드리프트",
      sets: 4,
      reps: 10,
      isLiked: true,
    },
  ];

  return (
    <div className="pageContainer">
      <div className="contentContainer">
        <h1 className="pageTitle">Community</h1>
        <Link to="/myprofile" className="mainProfileIcon">
          <img src={MainProfile} alt="mainprofile" />
        </Link>

        <h2>나의 득근메이트</h2>
        <div className="mateProfile">
          <img src={MateProfileImage} alt="mateprofile" />
          <div>
            <h3>김난슬</h3>
            <p>#다이어트 #헬린이</p>
          </div>
        </div>

        <div className="postsContainer">
          {posts.map((post) => (
            <Post
              key={post.id}
              profilePic={post.profilePic}
              nickname={post.nickname}
              workoutPic={post.workoutPic}
              dailyWord={post.dailyWord}
              workoutName={post.workoutName}
              sets={post.sets}
              reps={post.reps}
              isLiked={post.isLiked}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MateProfile;
