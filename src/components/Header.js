import React, { useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../asset/logo.png";
const Header = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="flex justify-between px-6 pt-6">
      <img src={logo} className="h-[40px]" />

      <div>
        {user ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
