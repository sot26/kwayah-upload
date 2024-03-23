import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../config";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";

const NewsDetails = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [news, setNews] = useState(null);

  useEffect(() => {
    const getNews = async () => {
      const newsDocRef = doc(db, "news", id); // Reference to the specific document
      const newsDocSnapshot = await getDoc(newsDocRef);

      if (newsDocSnapshot.exists()) {
        setNews({ ...newsDocSnapshot.data(), id: newsDocSnapshot.id });
      } else {
        console.log("Document does not exist!");
      }
    };

    getNews();
  }, [id]);

  const handleDelete = async () => {
    try {
      // Delete document from Firestore
      await deleteDoc(doc(db, "news", id));

      // Delete files from storage
      const storagePathImage = news.imageURL;
      const storagePathAudio = news.VideoURL;

      if (storagePathImage) {
        const imageRef = ref(storage, storagePathImage);
        await deleteObject(imageRef);
      }

      if (storagePathAudio) {
        const audioRef = ref(storage, storagePathAudio);
        await deleteObject(audioRef);
      }

      toast.success("Document and corresponding files deleted successfully");
      navigate("/view-music");
    } catch (error) {
      toast.error("Error deleting document and files: ", error);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    try {
      // Update document in Firestore
      const newsDocRef = doc(db, "news", id);
      await updateDoc(newsDocRef, {
        comments: [...(news.comments || []), { name, comment }],
      });

      toast.success("Comment added successfully");
      // Clear input fields after adding comment
      setName("");
      setComment("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDeleteComment = async (commentIndex) => {
    try {
      const updatedComments = news.comments.filter(
        (_, index) => index !== commentIndex
      );
      const newsDocRef = doc(db, "news", id);
      await updateDoc(newsDocRef, { comments: updatedComments });

      toast.success("Comment deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {news ? (
        <div>
          <div>
            <img src={news.imageURL} />
            <p>{news.title}</p>
            <button onClick={handleDelete}>Delete</button>
            {news.comments && (
              <div>
                {news.comments.map((comment, index) => (
                  <div key={index} className="border-2">
                    <p>Name: {comment.name}</p>
                    <p>Comment: {comment.comment}</p>
                    <button onClick={() => handleDeleteComment(index)}>
                      Delete Comment
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <form onSubmit={handleComment}>
              <input
                type="text"
                required
                placeholder="Name"
                className="border-[1px] border-black"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                required
                placeholder="Add comment"
                className="border-[1px] border-black"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button className="cursor-pointer" type="submit">
                submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full min-h-[100vh]">
          <div className="loading-wave ">
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
            <div className="loading-bar"></div>
          </div>
        </div>
      )}
    </div>
  ); // Adjust UI to handle loading state
};

export default NewsDetails;
