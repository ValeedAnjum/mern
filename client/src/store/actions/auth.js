import axios from "axios";
export const LogIn = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`/users/login`, body, config);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
