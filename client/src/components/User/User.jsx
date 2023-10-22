import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from "react-router-dom";
import { Loader } from "@mantine/core";

const User = ({ person,location }) => {
  console.log(location)
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)

  const [following, setFollowing] = useState(
    person.followers.includes(user._id) 
  );
  const handleFollow = async () => {
    if (following) {
      try {
        setLoading(true)
         dispatch(unfollowUser(person._id, user));
       
        setFollowing(false);
        setLoading(false)
        console.log(following)
      } catch (error) {
       
        console.error('Error unfollowing user:', error);
      }
    } else {
      try {
        setLoading(true)
         dispatch(followUser(person._id, user));
      
        setFollowing(true);
        setLoading(false)
        console.log(following)
      } catch (error) {
 
        console.error('Error following user:', error);
      }
    }
  };
  
  return (
    <div className={`${location==='modal' ? "flex jcsb aic": "follower"}`}>

      <Link to={`/profile/${person._id}`}  className={`${location==='modal' ? "flex g-10 aic": "person-mob jcc"}`}  >

      {!person.profilePicture ? (
         <img
         src={publicFolder + "defaultProfile.png"}
         alt="profile"
         className="followerImage"
       />
  // <AccountCircleIcon style={{height:"3.2rem",width:"3.2rem"}}/>
) : (
  <img
    src={publicFolder + person.profilePicture}
    alt="profile"
    className="followerImage"
  />
)}

        <div className="name">
          <span>{person.firstname} {person.lastname}</span>
          {/* <span>@{person.username}</span> */}
        </div>
      </Link>
      { (person._id !== user._id ) &&
 <button
 className={
   following ? "button fc-button UnfollowButton" : "button fc-button"
 }
 onClick={handleFollow}
>
  {loading ? ("Loading...") :(following ? "Unfollow" : "Follow" )}
 
</button>
      
       
      }
      
    </div>
  );
};

export default User;
