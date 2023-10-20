import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector } from "react-redux";


const FollowersCard = ({ location }) => {
  console.log(location)
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  return (
    <div  className="FollowersCard">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <h3>People you may know</h3>

      {!location ? (
        <span onClick={() => setModalOpened(true)} className="orange-bold-text">Show more</span>
      ) : (
        ""
      )}

      
      </div>
     
     <div    className={`${location==='modal' ? "person":"people-container"}`} >

    

      {persons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} location={location}/>;
      })}

    

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
        location='modal'
      />
       </div>

       <div>
       
        
       </div>
     
    </div>
  );
};

export default FollowersCard;
