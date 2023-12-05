import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const activeLink = ({ isActive }) =>
    isActive ? "text-white font-bold border-black" : "";

  return (
    <div className="w-full h-auto">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="text-md md:text-lg lg:text-xl flex w-full justify-center bg-green-500">
          <NavLink to="/" className={activeLink}>
            <p className="p-2 w-full bg-green-500">Home</p>
          </NavLink>
          <NavLink to="/add-music/ADD" className={activeLink}>
            <p className="p-2 w-full bg-green-500">Add Music</p>
          </NavLink>
          <NavLink to="/view-music" className={activeLink}>
            <p className="p-2 w-full bg-green-500">View Music</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
