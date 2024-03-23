import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ViewVideo = () => {
  const [videos, setVideos] = useState([]);
  const docRef = collection(db, "videos");

  useEffect(() => {
    const getVideos = async () => {
      const videoDocs = await getDocs(docRef);
      setVideos(videoDocs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getVideos();
  }, []);

  return (
    <div className="w-full min-h-[100vh]">
      {videos.length === 0 ? (
        <div className="flex justify-center items-center w-full min-h-[100vh]">
          <div className="loading-wave ">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        </div>
      ) : (
        videos.map((video, index) => {
          const { id, imageURL, title, description } = video;
          return (
            <div key={index}>
              <Link to={`/view-video/${id}`}>
                <div className="my-6 mx-20 flex flex-row border-[1px] border-black">
                  <p className="flex flex-col justify-center px-6 font-bold">
                    {index + 1}
                  </p>
                  <div className="bg-black ">
                    <img
                      src={video.imageURL}
                      alt={video.title}
                      className="rounded-2xl w-[200px] h-auto p-2"
                    />
                  </div>
                  <div className="flex flex-col justify-center pl-6">
                    <p className="text-xl font-bold">{video.artist}</p>
                    <p className="text-xl font-medium">{video.title}</p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })
      )}
    </div>
  );
};

export default ViewVideo;
