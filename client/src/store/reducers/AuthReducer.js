const initState = {
  auth: false,
  profile: null,
};

export const AuthReducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload);
      return { ...state, auth: true };
    case "LOGOUT":
    case "CLEAR_PROFILE":
      localStorage.removeItem("token");
      return { ...state, auth: false, profile: null };
    case "SET_PROFILE":
      return { ...state, profile: payload };
    default:
      return state;
  }
};
