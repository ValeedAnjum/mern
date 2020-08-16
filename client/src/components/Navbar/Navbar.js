import React from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const Navbar = () => {
  return (
    <Menu>
      <Menu.Item name="editorials">
        <NavLink to="/login">Sign</NavLink>
      </Menu.Item>
      <Menu.Item name="reviews">
        <NavLink to="/register">Register</NavLink>
      </Menu.Item>
      <Menu.Item name="reviews">Posts</Menu.Item>
    </Menu>
  );
};

export default Navbar;
