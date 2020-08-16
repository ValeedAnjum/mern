import React, { Fragment } from "react";
import { Form } from "semantic-ui-react";
const Register = () => {
  const submitHandler = () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(name, email, password);
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

export default Register;
