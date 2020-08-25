import React, { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { signUp } from "../../store/actions/AuthAction";
const Register = (props) => {
  const { auth, signup } = props;
  if (auth) {
    return <Redirect to="/posts" />;
  }
  const submitHandler = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signup({ name, email, password });
  };
  return (
    <Fragment>
      <Form style={{ width: "400px", margin: "0 auto" }}>
        <Form.Field>
          <label>Name</label>
          <input placeholder="First Name" id="name" />
          <label>Email</label>
          <input placeholder="First Name" id="email" />
          <label>Password</label>
          <input placeholder="First Name" id="password" type="password" />
        </Form.Field>
        <button onClick={submitHandler}>Register</button>
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
    signup: (cred) => dispatch(signUp(cred)),
  };
};

export default connect(mapState, mapDispatch)(Register);
