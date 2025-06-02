import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import { FaSignOutAlt } from "react-icons/fa";
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = async () => {
  await logout();
  navigate("/");
};

  return (
    <nav className="nav-bar">
      <h1 className="logo">UG Sales</h1>
      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        {token ? (
          <>
            <NavLink to="/dashboard">Sales Dashboard</NavLink>
            <NavLink to="/salesreps">Sales Representative</NavLink>
            <button
              className="btn-logout"
              onClick={handleLogout}
              style={{
                background: "none",
                border: "none",
                color: "inherit",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                fontSize: "1rem",
                padding: 0,
                marginLeft: "1rem"
              }}
              aria-label="Logout"
              title="Logout"
            >
              <FaSignOutAlt style={{ marginRight: "0.25rem" }} /> Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/signup">Sign Up</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
