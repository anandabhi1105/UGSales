import React from "react";
import NavBar from "./NavBar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-base-200">
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;