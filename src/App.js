import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import AddMusic from "./pages/AddMusic";
import VIewMusic from "./pages/VIewMusic";
import Login from "./pages/Login";
import { AuthContextProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import MusicDetails from "./pages/MusicDetails";
import AddVideo from "./pages/AddVideo";
import ViewVideo from "./pages/ViewVideo";
import VideoDetails from "./pages/VideoDetails";
import AddNews from "./pages/AddNews";
import ViewNews from "./pages/ViewNews";
import NewsDetails from "./pages/NewsDetails";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Header />
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-music" element={<AddMusic />} />
            <Route path="/add-video" element={<AddVideo />} />
            <Route path="/add-news" element={<AddNews />} />
            <Route path="/view-music" element={<VIewMusic />} />
            <Route path="/view-video" element={<ViewVideo />} />
            <Route path="/view-news" element={<ViewNews />} />
            <Route path="/view-music/:id" element={<MusicDetails />} />
            <Route path="/view-video/:id" element={<VideoDetails />} />
            <Route path="/view-news/:id" element={<NewsDetails />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
