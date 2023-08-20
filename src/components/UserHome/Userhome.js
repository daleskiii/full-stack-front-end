import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Nav from "../Nav/Nav";

function Userhome() {
  const [userData, setUserData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3006/user/${id}`);

        setUserData(response.data); //
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [id]);

  return (
    <>
      <div>hey {userData.username}, welcome back to your shopping account </div>
    </>
  );
}

export default Userhome;
