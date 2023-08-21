import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import Orders from "../Oders/Orders";
import "./UserHome.css";
import { getUser } from "../API/API";

function Userhome() {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await axios.get(`http://localhost:3006/user/${id}`);
        const response = await getUser(id);

        setUserData(response.data); //
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [id]);
  return (
    <div className="user-home-container">
      <h1>My Account</h1>
      <Link to={`/edit/${id}`} className="edit-link">
        Edit
      </Link>
      <div>
        <p>
          Hey <strong>{userData.username}</strong>, welcome back to your
          shopping account
        </p>
      </div>
      <div>
        <Orders />
      </div>
    </div>
  );
}

export default Userhome;
