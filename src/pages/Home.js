import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = ({ isAuth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, []);

  return <div>home</div>;
};

export default Home;
