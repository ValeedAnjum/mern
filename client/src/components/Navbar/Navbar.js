import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/AuthAction";
const Navbar = (props) => {
  const { auth, logout, profile } = props;
  const demy = () => {
    logout();
  };
  const authLinks = (
    <Menu>
      <Menu.Item name="reviews">
        <NavLink to="/posts">Posts</NavLink>
      </Menu.Item>
      <Menu.Item name="reviews">
        <NavLink to="/users">Users</NavLink>
      </Menu.Item>
      <Menu.Item name="reviews">
        <NavLink to="/posts" onClick={demy}>
          Logout
        </NavLink>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item name="reviews">
          {profile ? profile.email : "Loading"}
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
  const guestLinks = (
    <Menu>
      <Menu.Item name="editorials">
        <NavLink to="/login">Sign</NavLink>
      </Menu.Item>
      <Menu.Item name="reviews">
        <NavLink to="/register">Register</NavLink>
      </Menu.Item>
    </Menu>
  );
  return auth ? authLinks : guestLinks;
};

const mapState = (state) => {
  return {
    auth: state.auth.auth,
    profile: state.auth.profile,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logOut()),
  };
};
export default connect(mapState, mapDispatch)(Navbar);
