import React, { useState } from "react";
import "./Post.css";

import {  addComment, getComments, likePost } from "../../api/PostsRequests";
import { deletePostById } from "../../actions/PostsAction";
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
import Comments from "../Comments/Comments";


const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data?.likes.includes(user._id));
  const [likes, setLikes] = useState(data?.likes.length)
  const [profileUser,setProfileUser]=useState(null)
  const [loading,setLoading] = useState(false)
const [isOpened,setIsOpened] = useState(false)



  const dispatch = useDispatch()

const [showComment,setShowComment] = useState(false)
const [comment,setComment]=useState("")
const [postComments, setPostComments] = useState(data?.comments || []);

// const [localComments, setLocalComments] = useState(postComments);





  useEffect(()=>{

    const fetchProfileUser = async ()=>{
      try {
        setLoading(true)
        const proUser = await dispatch(getUserById(data?.userId));
       
        setProfileUser(proUser)
        setLoading(false)
       
      } catch (error) {
        console.log(error)
      }
    }
    fetchProfileUser();
  
  },[])
 

  // get all comments related to the posts
  // console.log(data)

useEffect(()=>{
  const RetrieveComments = async( )=>{
    try {
      // console.log(data)
      const response = await getComments(data?._id)
      const commentsData = response.data
    // console.log(response.data)
    setPostComments(commentsData)
    
   
// console.log(postComments)
    
    } catch (error) {
      console.log(error)
    }
    }

    RetrieveComments()

},[setPostComments])



const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];


const timestamp = data?.createdAt;
const date = new Date(timestamp);

const day = date.getDate();
const monthIndex = date.getMonth();
const year = date.getFullYear();

const formattedDate = `${day} ${monthNames[monthIndex]}, ${year}`;

const handleDelete = async () => {
  try {
    // Make the API request to delete the post
    await dispatch(deletePostById(data?._id,user._id));
    console.log(data?._id);
  } catch (error) {
    console.error('Error deleting the post:', error);
  }
};







//add a comment
const handleCreateComment = async () => {
  try {
    setLoading(true);
    const response = await addComment(user._id, data?._id, comment);

    if (response.status === 201) {
      const createdComment = response.data;

      // Update the postComments state with the new comment
      setPostComments([...postComments, createdComment]);
      setComment("");
      setLoading(false);
    }
  } catch (error) {
    console.error("Error creating comment:", error);
  }
};





  
  const handleLike = () => {
    likePost(data?._id, user._id);
    setLiked((prev) => !prev);
    liked? setLikes((prev)=>prev-1): setLikes((prev)=>prev+1)
  };
  return (<>

  {
    loading ? (<Loader/>):(


    <div className="Post">
      <div className="flex jcsb">

    
<div className="flex aic g-10">
<img src={profileUser?.profilePicture?process.env.REACT_APP_PUBLIC_FOLDER + profileUser.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png" } alt=""  className="logo"/>

<div> 

<Link to={`/profile/${data?.userId}`}   className="flex g-3px " >
<span className="fwb fs-13">{profileUser?.firstname}</span>
<span className="fwb fs-13">{profileUser?.lastname}</span>
  </Link> 
    

      <div>
<span className="fs-10 grey">{formattedDate} </span>

      </div>



      </div>
      </div>


      <div style={{position:"relative"}}>
  <MoreHorizIcon className="cp"  onClick={()=>setIsOpened(!isOpened)}   />

  {
  isOpened && (
   
      <div name="" id="PostSelect" >

      <p value="" className="cp" > Save Post</p>
      <div className="greyLine"></div>

      {data?.userId === user._id 
      && (
<p value="" onClick={handleDelete} className="cp"> Delete Post </p>
      )
      
      }

      
      
       
      </div>

  )
    }

</div>


</div >

<div className="detail">
        {/* <span>
          <b>{data.name} </b>
        </span> */}
        <span>{data?.desc}</span>
      </div>
     
      <img
        src={data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data?.image : ""}
        alt=""
      />

      <div className="postReact">
        {liked ? (  <FavoriteIcon className='liked'     onClick={handleLike}/>)
        
        :(
          <FavoriteBorderIcon className="liked"  onClick={handleLike}/>
        )

        }
      
       <SmsIcon className="liked"  onClick={()=>setShowComment(!showComment)}/>
       <TelegramIcon className="liked" />


      
    
     
      </div>

      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>

      { showComment && 
         <div className="comments-container flex jcsb g-10 fd-col">

{postComments
  ?.filter((comment) => !comment.parentComment) // Filter out top-level comments
  .map((comment, key) => {
    return (
      <div key={key}>
        <Comments
          comment={comment}
          postComments={postComments}
          isFirstChildOfFirstParent={key === 0}
          showComment={showComment}
          data={data}
        />
      </div>
    );
  })}





         
         
<div className= "flex jcsb g-10">


         <img src={user?.profilePicture ? process.env.REACT_APP_PUBLIC_FOLDER + user?.profilePicture : process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"  } alt="" className="logo" />
         <input type="text"  placeholder="Write a comment..." name="comment" value={comment} onChange={(e)=>setComment(e.target.value)}/>
   
 
   
         <button className="button ps-button" onClick={handleCreateComment}>Post</button>
         </div>
 
        </div>

      }
     
  



    </div>

)
}
    </>
  );
};

export default Post;
