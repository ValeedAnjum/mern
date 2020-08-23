import React from "react";
import moment from "moment";
export const Post = ({ post }) => {
  const { des, title, date } = post;
  return (
    <div
      className="Post"
      style={{
        boxShadow: "0px 0px 4px #968d8d",
        margin: "10px",
        padding: "5px",
      }}
    >
      <h1>{title}</h1>
      <h3>{des}</h3>
      <p>{moment(date).fromNow()}</p>
    </div>
  );
};
