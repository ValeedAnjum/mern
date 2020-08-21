import React from "react";

export const Post = ({ post }) => {
  const { des, title, date } = post;
  return (
    <div className="Post">
      <h1>{title}</h1>
      <h3>{des}</h3>
      <p>{date}</p>
    </div>
  );
};
