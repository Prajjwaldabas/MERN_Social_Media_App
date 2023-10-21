import React, { useEffect, useState, useRef } from "react";
import "./FollowersCard.css";
import FollowersModal from "../FollowersModal/FollowersModal";
import { getAllUser } from "../../api/UserRequests";
import User from "../User/User";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Loader/Loader";

const FollowersCard = ({ location }) => {
  const dispatch = useDispatch();
  const isMounted = useRef(true);
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);
  // const loading = useSelector((state) => state.authReducer.loading);
  const [loading,setLoading] = useState(false)

  useEffect(() => {
    // Create a cleanup function to set isMounted to false when unmounting
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (persons.length === 0) {
      setLoading(true)

      const fetchData = async () => {
        try {
          const { data } = await getAllUser();
          if (isMounted.current) {
            setPersons(data);
          

            setLoading(false)
            // console.log(loading)
 
          }
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [dispatch, persons]);

  return (
    <div className="FollowersCard">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>People you may know</h3>

        {!location ? (
          <span onClick={() => setModalOpened(true)} className="orange-bold-text">
            Show more
          </span>
        ) : (
          ""
        )}
      </div>

      {loading && <Loader/>

      }

      <div className={`${location === "modal" ? "person" : "people-container"}`}>
        {persons.map((person, id) => {
          if (person._id !== user._id) return <User person={person} key={id} location={location} />;
        })}

        <FollowersModal modalOpened={modalOpened} setModalOpened={setModalOpened} location="modal" />
      </div>
    </div>
  );
};

export default FollowersCard;
