import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/" className="logo">Apollo</NavLink>

      <div className="nav-actions">
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/login">Log In</NavLink>
      </div>
    </nav>
  )
};

export default Navbar;