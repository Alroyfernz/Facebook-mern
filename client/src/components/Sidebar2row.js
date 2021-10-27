import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./sidebar2row.css";
import axios from "axios";
const Sidebar2row = ({ id }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/user/" + id);
        setUser(res.data);
      } catch (error) {}
    };
    fetchUser();
  }, [id]);

  return (
    <div className="sidebar2row">
      <Avatar className="avatar" src={user?.profilePicture} alt="name" />
      <h1>{user?.name}</h1>
    </div>
  );
};

export default Sidebar2row;
