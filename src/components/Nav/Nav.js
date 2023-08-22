import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import "./Nav.css";
import { getUser } from "../API/API";
function Nav() {
  const [userData, setUserData] = useState([]);
  const { isLoggedIn, setLoggedIn, userId, setUserId } = useAuth();

  const nav = useNavigate();

  useEffect(() => {
    if (isLoggedIn && userId) {
      const fetchUserData = async () => {
        try {
          // const response = await axios.get(
          //   `http://localhost:3006/user/${userId}`
          // );

          const response = await getUser(userId);

          setUserData(response.data.id);
        } catch (error) {
          console.log(error);
        }
      };

      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        setLoggedIn(true);
        setUserId(storedUserId);
      }

      fetchUserData();
    }
  }, [isLoggedIn, userId, setLoggedIn, setUserId]);

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    setLoggedIn(false);
    setUserId(null);
    nav("/");
  };

  return (
    <nav className="custom-nav">
      {isLoggedIn ? (
        <>
          <Link to={`/user-dash/${userData}`}>Home</Link>
          <Link to="/products">Products</Link>
          <Link to={`/orders/${userId}`}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT334f4FXHxNX-2ekYY_X6W_tr5gpKIluZPQg&usqp=CAU"
              alt="Cart"
            />
          </Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      ) : (
        <Link to="/">Home</Link>
      )}
    </nav>
  );
}

export default Nav;
