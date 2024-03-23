import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../config";
import { Link } from "react-router-dom";

const ViewNews = () => {
  const [news, setNews] = useState([]);
  const docRef = collection(db, "news");

  useEffect(() => {
    const getNews = async () => {
      const news = await getDocs(docRef);
      setNews(news.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getNews();
  }, []);
  console.log(news);

  return (
    <div className="w-full min-h-[100vh]">
      {news.length === 0 ? (
        <div className="flex justify-center items-center w-full min-h-[100vh]">
          <div className="loading-wave ">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        </div>
      ) : (
        news.map((ne, index) => {
          const { id, imageURL, title, description } = ne;
          return (
            <div>
              <Link to={`/view-news/${id}`}>
                <div
                  className="my-6 mx-20 flex flex-row border-[1px] border-black"
                  key={index}
                >
                  <p className="flex flex-col justify-center px-6 font-bold">
                    {index + 1}
                  </p>
                  <div className="bg-black ">
                    <img
                      src={imageURL}
                      className="rounded-2xl w-[180px] h-auto p-2"
                    />
                  </div>
                  <div className="flex flex-col justify-center pl-6">
                    <p className="text-xl font-medium">{title}</p>
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

export default ViewNews;
