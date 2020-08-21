import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { logIn } from "../../store/actions/AuthAction";
const SignIn = (props) => {
  const { login, auth } = props;
  if (auth) {
    return <Redirect to="/posts" />;
  }
  const submitHandler = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    login({ email, password });
  };
  return (
    <Fragment>
      <Form style={{ width: "400px", margin: "0 auto" }}>
        <Form.Field>
          <label>Email</label>
          <input placeholder="First Name" id="email" />
          <label>Password</label>
          <input placeholder="First Name" id="password" type="password" />
        </Form.Field>
        <button onClick={submitHandler}>Login</button>
      </Form>
    </Fragment>
  );
};

const mapState = (state) => {
  return {
    auth: state.auth.auth,
  };
};

const mapDispatch = (dispatch) => {
  return {
    login: (cred) => dispatch(logIn(cred)),
  };
};

export default connect(mapState, mapDispatch)(SignIn);
