import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

let Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Parry's Numbers Game </h1>
    <h2>Choose your difficulty and guess the correct number</h2>
  </div>
);

export default Navbar;
