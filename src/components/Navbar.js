import React from "react";
import { NavLink } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user } = UserAuth();
  const activeLink = ({ isActive }) =>
    isActive ? "text-white font-bold border-black" : "";

  return (
    <div className="w-full h-auto">
      {user ? (
        <div className="w-full flex flex-col justify-center items-center">
          <div className="text-md md:text-lg lg:text-xl flex w-full justify-center bg-green-500">
            <NavLink to="/" className={activeLink}>
              <p className="p-2 w-full bg-green-500">Home</p>
            </NavLink>
            <NavLink to="/add-music" className={activeLink}>
              <p className="p-2 w-full bg-green-500">Add Music</p>
            </NavLink>
            <NavLink to="/view-music" className={activeLink}>
              <p className="p-2 w-full bg-green-500">View Music</p>
            </NavLink>
            <NavLink to="/add-video" className={activeLink}>
              <p className="p-2 w-full bg-green-500">Add Video</p>
            </NavLink>
            <NavLink to="/view-video" className={activeLink}>
              <p className="p-2 w-full bg-green-500">View Video</p>
            </NavLink>
            <NavLink to="/add-news" className={activeLink}>
              <p className="p-2 w-full bg-green-500">Add News</p>
            </NavLink>
            <NavLink to="/view-news" className={activeLink}>
              <p className="p-2 w-full bg-green-500">View News</p>
            </NavLink>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Navbar;
