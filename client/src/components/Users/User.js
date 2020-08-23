import React from "react";
import moment from "moment";
const User = ({ user }) => {
  const { name, email, online } = user;
  const postDate = Date.parse(online);
  const currentDate = new Date().getTime();
  // console.log(postDate);
  // console.log(currentDate);
  // const dif = currentDate - postDate;
  // const difInMin = Math.round(dif / 1000);
  console.log(Date.parse(online));
  return (
    <div
      style={{
        boxShadow: "0px 0px 4px #968d8d",
        margin: "10px",
        padding: "5px",
      }}
    >
      <p>{name}</p>
      <p>{email}</p>
      <p>{online}</p>
    </div>
  );
};

export default User;
