import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { editUser, deleteUser } from "../API/API";
function Edit() {
  const [username, setUserName] = useState("");
  const [password_hash, setPassword] = useState("");
  const { setLoggedIn, setUserId } = useAuth();
  const { id } = useParams();
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username) {
      alert("Username is required");
      return;
    }
    if (!password_hash) {
      alert("Password is required");
      return;
    }
    if (password_hash.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      // const updated = await axios.put(`http://localhost:3006/user/${id}`, {
      //   username,
      //   password_hash,
      // });
      const updatedUserData = {
        username: username,
        password_hash: password_hash,
      };

      const updated = await editUser(id, updatedUserData);

      setUserId(id);
      nav(`/user-dash/${id}`);
      console.log(updated);
      return updated;
    } catch (e) {
      console.log(e);
    }
  }

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      setLoggedIn(false);
      setUserId(null);
      localStorage.removeItem("userId");
      nav("/");
    } catch (error) {
      throw error;
    }
  };

  return (
    <div>
      Edit
      <form onSubmit={handleSubmit}>
        <input
          type="name"
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

        <button>Submit</button>
      </form>
      <button onClick={handleDelete}> delete </button>
    </div>
  );
}

export default Edit;
