import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();


  return (
    <nav>
      <NavLink to="/" className="logo">Apollo</NavLink>

      <div className="nav-actions">
        <NavLink data-testid="sign-up-btn" className={location.pathname === "/signup" || location.pathname === "/login" ? "hidden-nav" : null} to="/signup">Sign Up</NavLink>
        <NavLink data-testid="login-btn" className={location.pathname === "/login" || location.pathname === "/signup" ? "hidden-nav" : null} to="/login">Log In</NavLink>
      </div>
    </nav>
  )
};

export default Navbar;