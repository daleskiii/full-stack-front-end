import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedIn, setUserId } = useAuth();
  const nav = useNavigate();

  const fetchUserData = async () => {
    if (!username) {
      alert("Username is required");
      return;
    }
    if (!password) {
      alert("Password is required");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    try {
      const password_hash = password;
      const result = await axios.post(`http://localhost:3006/user/login`, {
        username,
        password_hash,
      });
      console.log(result.data.user);
      const { user } = result.data;
      const { id } = user;
      setUserId(id);
      setLoggedIn(true);
      nav(`/user-dash/${id}`);
    } catch (e) {
      alert("incorrect password");
      console.log(e);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    fetchUserData();
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
