import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config";
import { useNavigate } from "react-router-dom";

const VIewMusic = ({ isAuth }) => {
  const [music, setMusic] = useState([]);
  const docRef = collection(db, "music");
  const navigate = useNavigate();

  useEffect(() => {
    const getMusic = async () => {
      const music = await getDocs(docRef);
      setMusic(music.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getMusic();
  }, []);
  console.log(music);

  useEffect(() => {
    if (isAuth === false) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="w-full min-h-[100vh]">
      {music.length === 0 ? (
        <div className="flex justify-center items-center w-full min-h-[100vh]">
          <div className="loading-wave ">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        </div>
      ) : (
        music.map((mus, index) => {
          const {
            artist,
            audioURL,
            description,
            id,
            imageURL,
            info,
            releaseDate,
            title,
          } = mus;
          return (
            <div className="flex flex-col" key={index}>
              <p>{title}</p>
              <img src={imageURL} />
              <audio src={audioURL} controls />
            </div>
          );
        })
      )}
    </div>
  );
};

export default VIewMusic;
