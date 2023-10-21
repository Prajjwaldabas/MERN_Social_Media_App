import React, { useState } from "react";
import "./Post.css";

import { likePost } from "../../api/PostsRequests";
import { useSelector } from "react-redux";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SmsIcon from '@mui/icons-material/Sms';
import TelegramIcon from '@mui/icons-material/Telegram';
import { useEffect } from "react";
import { getUserById } from "../../actions/UserAction";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length)
  const [profileUser,setProfileUser]=useState(null)
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()



  useEffect(()=>{

    const fetchProfileUser = async ()=>{
      try {
        setLoading(true)
        const proUser = await dispatch(getUserById(data.userId));
       
        setProfileUser(proUser)
        setLoading(false)
       
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfileUser();
  
  },[])
 



const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const timestamp = data.createdAt;
const date = new Date(timestamp);

const day = date.getDate();
const monthIndex = date.getMonth();
const year = date.getFullYear();

const formattedDate = `${day} ${monthNames[monthIndex]}, ${year}`;



  
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  return (<>

  {
    loading ? (<Loader/>):(


    <div className="Post">
      <div className="flex jcsb">

    
<div className="flex aic g-10">
<img src={profileUser?.profilePicture?process.env.REACT_APP_PUBLIC_FOLDER + profileUser.profilePicture : "" } alt=""  className="logo"/>

<div> 

<Link to={`/profile/${data.userId}`}   className="flex g-3px " >
<span className="fwb fs-13">{profileUser?.firstname}</span>
<span className="fwb fs-13">{profileUser?.lastname}</span>
  </Link> 
    

      <div>
<span className="fs-10 grey">{formattedDate} </span>

      </div>



      </div>
      </div>


      <div>
  <MoreHorizIcon className="cp"/>
</div>


</div >

<div className="detail">
        {/* <span>
          <b>{data.name} </b>
        </span> */}
        <span>{data.desc}</span>
      </div>
     
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""}
        alt=""
      />

      <div className="postReact">
        {liked ? (  <FavoriteIcon className='liked'     onClick={handleLike}/>)
        
        :(
          <FavoriteBorderIcon className="liked"  onClick={handleLike}/>
        )

        }
      
       <SmsIcon className="liked"/>
       <TelegramIcon className="liked"/>
      
    
     
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
     
    </div>

)
}
    </>
  );
};

export default Post;
