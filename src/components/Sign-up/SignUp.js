import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const SignUp = () => {
  const [username, setUserName] = useState("");
  const [password_hash, setPassword] = useState("");

  const nav = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!username || username.includes(" ")) {
      alert("Username is required and should not contain spaces");
      return;
    }
    if (!password_hash || password_hash.length < 6) {
      alert("Password is required and should be at least 6 characters long");
      return;
    }

    try {
      const data = { username, password_hash };
      const result = await axios.post(`http://localhost:3006/user`, data);
      console.log(result);
      setUserName("");
      setPassword("");
      nav(`/login`);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input
          type="username"
          placeholder="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password_hash}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>
          * Your personal data will be used to support your experience
          throughout this website, to manage access to your account.
        </p>
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
