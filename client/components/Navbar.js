import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

let Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Numbers Game</h1>
    <h2>Can you find the right number?</h2>
    <hr />
  </div>
);

export default Navbar;
