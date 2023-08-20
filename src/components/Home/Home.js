import React, { useState } from "react";
import "./Home.css";
import SignUp from "../Sign-up/SignUp";

import Verification from "../Verification/Verification";
import Login from "../Login/Login";

function Home() {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const handleAgeVerification = () => {
    setIsAgeVerified(true);
  };

  return (
    <div className="App">
      {!isAgeVerified ? (
        <Verification onVerify={handleAgeVerification} />
      ) : (
        <div className="auth-container">
          <div className="auth-component">
            <h1>Login</h1>
            <Login />
          </div>
          <div className="auth-component">
            <h1>Register</h1>
            <SignUp />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
