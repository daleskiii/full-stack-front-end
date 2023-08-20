import React, { useState } from "react";

function Verification({ onVerify }) {
  const [isVerified, setIsVerified] = useState(false);

  const handleVerification = () => {
    setIsVerified(true);
    onVerify();
  };
  const handleNoVerification = () => {
    if (!isVerified) {
      window.location.href = "https://www.google.com";
    }
  };

  return (
    <div className="age-verification-modal">
      <h2>Age Verification</h2>
      <p>Please confirm that you are 18 years or older.</p>
      <button onClick={handleVerification}>yes</button>
      <button onClick={handleNoVerification}>no</button>
    </div>
  );
}

export default Verification;
