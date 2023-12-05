import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import AddMusic from "./pages/AddMusic";
import VIewMusic from "./pages/VIewMusic";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./config";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        setIsAuth(false);
        localStorage.clear();
        setIsAuth(false);
        toast.success("Logout Successful");
        window.location.pathname = "/login";
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  console.log(isAuth);
  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="w-full px-12 text-2xl font-bold my-3 flex justify-between ">
        <div>
          <Link to="/">KWAYAH MUSIC</Link>
        </div>
        <div>
          {isAuth ? (
            <button onClick={logoutUser}>Logout</button>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </div>
      {!isAuth ? "" : <Navbar setIsAuth={setIsAuth} />}
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/add-music/:id" element={<AddMusic isAuth={isAuth} />} />
        <Route path="/view-music" element={<VIewMusic isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
