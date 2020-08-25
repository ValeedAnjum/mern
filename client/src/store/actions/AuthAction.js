import axios from "axios";
import { setAuthToken } from "../../components/util/setAuthToken";
export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      const res = await axios.get("/users/user");
      dispatch({ type: "SET_PROFILE", payload: res.data });
      dispatch({ type: "LOGIN_SUCCESS", payload: localStorage.token });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = ({ name, email, password }) => async (dispatch) => {
  console.log(name, email, password);
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    console.log("REGISTRATION_START");
    const res = await axios.post("/users//register", body, config);
    dispatch({ type: "REGISTRATION_SUCCESS", payload: res.data.token });
    dispatch(loadUser());
  } catch (error) {
    console.log(error);
  }
};

export const logIn = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post(`/users/login`, body, config);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data.token });
    dispatch(loadUser());
  } catch (error) {
    console.log(error.message);
  }
};

export const logOut = () => (dispatch) => {
  dispatch({ type: "LOGOUT" });
  dispatch({ type: "CLEAR_PROFILE" });
};
