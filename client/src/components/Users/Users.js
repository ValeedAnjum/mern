import React, { useEffect, useState, Fragment } from "react";
import User from "./User";
import axios from "axios";
const Users = () => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axios.get("/users/allusers");
      setusers(res.data);
    };
    fetchUsers();
  }, []);

  return (
    <Fragment>
      {users.map((user) => {
        return <User key={user._id} user={user} />;
      })}
    </Fragment>
  );
};

export default Users;
