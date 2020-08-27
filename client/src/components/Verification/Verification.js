import React, { useEffect, useState } from "react";
import axios from "axios";
const Verification = (props) => {
  const { token } = props.match.params;
  const [isVarified, setisVarified] = useState(false);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.post(`/users/verification/${token}`);
      console.log(res);
      if (res.data.isVarified) {
        setisVarified(res.data.isVarified);
      }
    };
    fetchPosts();
  }, []);
  return <div>{isVarified ? "Varified" : "verifying..."}</div>;
};

export default Verification;
