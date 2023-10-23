import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import TelegramIcon from "@mui/icons-material/Telegram";

const NavIcons = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [activeLink, setActiveLink] = useState(""); // State to track the active link

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName); // Set the active link when a link is clicked
  };

  return (
    <div className="navIcons">
      <Link to="../home" onClick={() => handleLinkClick("home")}>
        <HomeIcon className={activeLink === "home" ? "nav-active" : ""} />
      </Link>
      <Link to={`/profile/${user._id}`} onClick={() => handleLinkClick("profile")}>
        <PersonIcon className={activeLink === "profile" ? "nav-active" : ""} />
      </Link>
      <Link to="" onClick={() => handleLinkClick("notifications")}>
        <NotificationsIcon
          className={activeLink === "notifications" ? "nav-active" : ""}
        />
      </Link>
      <Link to="../chat" onClick={() => handleLinkClick("chat")}>
        <TelegramIcon className={activeLink === "chat" ? "nav-active" : ""} />
      </Link>
    </div>
  );
};

export default NavIcons;
