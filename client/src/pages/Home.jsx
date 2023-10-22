import React from "react";
import PostSide from "../components/PostSide/PostSide";
import ProfileSide from "../components/profileSide/ProfileSide";
import RightSide from "../components/RightSide/RightSide";
import { useSelector } from "react-redux";
import { logout } from "../actions/AuthActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./Home.css";


const Home = () => {
  const token = useSelector((state) => state.authReducer.authData.token);

  const dispatch = useDispatch()

  const parseToken = (token) => {
    try {
      const tokenParts = token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Invalid token');
      }
  
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload;
    } catch (error) {
      console.error('Error parsing token:', error);
      return {};
    }
  };

  useEffect(() => {
    // Check if the token is expired here
   

    // console.log(token)
    if (token) {
      const tokenData = parseToken(token);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      // console.log(tokenData.exp)

      if (tokenData.exp < currentTime) {
        dispatch(logout())
        console.log("token has expired")
      }
    }
  }, []);
 
  return (
    <div className="Home">
      <ProfileSide/>
      <PostSide />
      <RightSide />
    </div>
  );
};

export default Home;
