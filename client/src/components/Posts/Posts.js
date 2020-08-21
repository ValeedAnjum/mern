import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { compose } from "redux";
import axios from "axios";
import { Post } from "./Post";

const Posts = (props) => {
  const { auth } = props;
  const [posts, setposts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/post/2");
      console.log(res.data);
      setposts(res.data);
    };
    fetchPosts();
  }, []);
  if (!auth) {
    return <Redirect to="/login" />;
  }
  return auth ? (
    <Fragment>
      {posts.map((post) => {
        return <Post post={post} key={post._id} />;
      })}
    </Fragment>
  ) : null;
};

const mapState = (state) => {
  return {
    auth: state.auth.auth,
  };
};
export default compose(withRouter, connect(mapState, null))(Posts);
