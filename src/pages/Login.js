import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import { auth } from "../config";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        toast.success("Logged In Successfully");
        setIsAuth(true);
        navigate("/");
        localStorage.setItem("isAuth", true);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <button
        onClick={loginWithGoogle}
        className="flex bg-white h-[40px] hover:bg-black hover:text-white shadow-lg px-[15px] w-auto items-center justify-center text-xl font-semibold mt-3 mb-6 rounded-lg"
      >
        <FcGoogle size={30} />
        <p className="px-2 text-2xl">Login With Google</p>
      </button>
    </div>
  );
};

export default Login;
