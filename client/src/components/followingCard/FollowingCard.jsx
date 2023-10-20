import React from 'react'
import {  useSelector } from "react-redux";
import './followingCard.css'
import User from '../User/User';
import { useState,useEffect } from 'react';
import {  getUser } from '../../api/UserRequests';
import { useParams } from 'react-router-dom';
import { getUserById } from '../../actions/UserAction';
import { useDispatch } from 'react-redux';


const FollowingCard = () => {
  const dispatch = useDispatch()
  const params = useParams()

  
    
    const authUser = useSelector((state) => state.authReducer.authData.user);
    const [user, setUser] = useState(authUser);
    const [modalOpened, setModalOpened] = useState(false);
    
    // console.log(user)


    useEffect(() => {
      const fetchData = async () => {
        if (params.id) {
        
          try {
            const profileUser = await dispatch(getUserById(params.id));
            // console.log(profileUser)
            setUser(profileUser);
          } catch (error) {
         
            console.error(error);
          }
        } else {
          setUser(authUser);
        }
      };
  
      fetchData();
    }, [dispatch, params.id, authUser]);



  


    const [followersData, setFollowersData] = useState([]);
  const [followingData, setFollowingData] = useState([]);


  const [userData,setUserData] = useState("followers")

  useEffect(() => {
    const fetchDataForFollowersAndFollowing = async () => {
     
      const followerDataPromises = user.followers.map(async (followerId) => {
        const follower = await getUser(followerId);
        return follower;
      });

      const followingDataPromises = user.following.map(async (followingId) => {
        const following = await getUser(followingId);
    
        return following;
      });

      const [followers, following] = await Promise.all([
        Promise.all(followerDataPromises),
        Promise.all(followingDataPromises),
      ]);

      setFollowersData(followers);
      setFollowingData(following);
    };

    fetchDataForFollowersAndFollowing();
  }, [user.followers, user.following]);

  return (
    <div className='followingCard '>
        
        <div className='flex  w-100 jcsa p-10 aic g-5'>
        <div className={`${userData==="followers" ? "brbt":" "} flex g-10 fwb  w-100 p-5 jcc aic cp`} onClick={()=>setUserData("followers")}>
        <span>{user.followers.length}</span>
  <span>Followers</span>

</div>
{/* <div className="vl"></div> */}
<div className={`${userData==="followings" ? "brbt":" "} flex g-10 fwb  w-100 p-5 jcc aic cp`}  onClick={()=>setUserData("followings")}>
<span>{user.following.length}</span>
  <span>Following</span>
 
</div>
        </div>
   



   <div className='flex fd-col  w-100 g-10'>
    
    { userData === "followers" ? (
 followersData.map((following, id) => {
    
    
  return   <User person={following.data} location='modal' key={id} />
  
  
   
  })

    ) :( 

      followingData.map((following, id) => {
    
    
        return   <User person={following.data} location='modal' key={id} />
        
        
         
        })
    )

    }
  




   </div>


    </div>
  )
}

export default FollowingCard