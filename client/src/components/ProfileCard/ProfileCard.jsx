import React from "react";
import "./ProfileCard.css";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import FollowingModal from "../followingModal/followingModal";
import { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";

import { getUserById } from "../../actions/UserAction";
import Loader from "../Loader/Loader";


const ProfileCard = ({location}) => {
  

    const params = useParams()
    const dispatch = useDispatch();
    const authUser = useSelector((state) => state.authReducer.authData.user);
    const [user, setUser] = useState(authUser);
    
    // console.log(user)
   
const [loading,setLoading] = useState(false)

    useEffect(() => {
      const fetchData = async () => {
        if (location === "profilePage") {
          setLoading(true)
          // console.log(location);
          try {

            const profileUser = await dispatch(getUserById(params.id));
            // console.log(profileUser)
            setUser(profileUser);
            setLoading(false);
          } catch (error) {
         
            console.error(error);
          }
        } else {
          setUser(authUser);
        }
      };
  
      fetchData();
    }, [dispatch, location, params.id, authUser]);
    
  
  
  

 
  
  


  const [modalOpened, setModalOpened] = useState(false);
 
  

  // const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  

  return ( <>
  {
    loading ? (<Loader/>):(


  
 
    
    <div className="ProfileCard">
       
      <div className="ProfileImages">
        <img src={
            user?.coverPicture
              ? serverPublic + user.coverPicture
              : serverPublic + "defaultCover.jpg"
          } alt="CoverImage" />
        <img
          src={
            user?.profilePicture
              ? serverPublic + user.profilePicture
              : serverPublic + "defaultProfile.png"
          }
          alt="ProfileImage"
        />
      </div>
      <div className="ProfileName">
        <span>{user?.firstname} {user?.lastname}</span>
        <span>{user?.worksAt? user.worksAt : 'Write about yourself'}</span>
      </div>


 <div className="followStatus">
 <hr />
 <div>
   <div className="follow" >
    <button onClick={() => setModalOpened(true)} className="fwb flex g-10 fd-col aic cp">
     <span>{user?.followers.length}</span>
     <span    >Followers</span>
    </button>

   </div>
   <div className="vl"></div>
   <div className="follow"  >

    <button onClick={() => setModalOpened(true)} className="fwb flex g-10 fd-col aic cp">
     <span>{user?.following.length}</span>
     <span  >Following</span>
    </button>

   </div>

   <FollowingModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
 
   {/* for profilepage */}
   {location === "profilePage" && (
     <>
       <div className="vl"></div>
       <div className="follow">
         <span>{
         posts.filter((post)=>post.userId === user?._id).length
         }</span>
         <span>Posts</span>
       </div>{" "}
     </>
   )}
 </div>
 <hr />
 
</div>
   
     




      {location === "profilePage" ? (
        ""
      ) : (

        
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "rgb(107 82 178)" }}>
            My Profile
          </Link>
        </span>
      )}
      
    </div>
      )
    }
    </>
  );
};

export default ProfileCard;
