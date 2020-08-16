import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { LogIn } from "../../store/actions/auth";
const SignIn = ({ login }) => {
  const submitHandler = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
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
  return {};
};

const mapDispatch = (dispatch) => {
  return {
    login: (cred) => dispatch(LogIn(cred)),
  };
};

export default connect(mapState, mapDispatch)(SignIn);
