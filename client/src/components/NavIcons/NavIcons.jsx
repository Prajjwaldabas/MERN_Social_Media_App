import React from "react";

import ChatIcon from '@mui/icons-material/Chat';
import Comment from "../../img/comment.png";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TelegramIcon from '@mui/icons-material/Telegram';

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="navIcons">
      <Link to="../home">
      
        <HomeIcon className="nav-active"/>
      </Link>
      <Link to={`/profile/${user._id}`}>  <PersonIcon /></Link>
     <Link to=''>
     <NotificationsIcon/>
     </Link>
    
  
      <Link to="../chat">
        <TelegramIcon/>
   
      </Link>
    </div>
  );
};

export default NavIcons;
