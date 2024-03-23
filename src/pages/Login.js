import React from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { UserAuth } from "../context/AuthContext";
import { useEffect } from "react";

const Login = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button
        onClick={handleGoogleSignIn}
        className="flex bg-white h-[40px] hover:bg-black hover:text-white shadow-lg px-[15px] w-auto items-center justify-center text-xl font-semibold mt-3 mb-6 rounded-lg"
      >
        <FcGoogle size={30} />
        <p className="px-2 text-2xl">Login With Google</p>
      </button>
    </div>
  );
};

export default Login;
