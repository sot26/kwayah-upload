import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/login");
  //   }
  // }, []);

  return <div>home</div>;
};

export default Home;
