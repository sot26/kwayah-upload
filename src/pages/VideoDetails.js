import {
  doc,
  getDoc,
  deleteDoc,
  addDoc,
  collection,
  updateDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../config";
import { toast } from "react-toastify";

const VideoDetails = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  useEffect(() => {
    const getVideo = async () => {
      const videoDocRef = doc(db, "videos", id); // Reference to the specific document
      const videoDocSnapshot = await getDoc(videoDocRef);

      if (videoDocSnapshot.exists()) {
        setVideo({ ...videoDocSnapshot.data(), id: videoDocSnapshot.id });
      } else {
        console.log("Document does not exist!");
      }
    };

    getVideo();
  }, [id]);
  // console.log(video.comments[2].comment);
  const handleComment = async (e) => {
    e.preventDefault();
    try {
      // Update document in Firestore
      const videoDocRef = doc(db, "videos", id);
      await updateDoc(videoDocRef, {
        comments: [...(video.comments || []), { name, comment }],
      });

      toast.success("Comment added successfully");
      // Clear input fields after adding comment
      setName("");
      setComment("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete document from Firestore
      await deleteDoc(doc(db, "video", id));

      // Delete files from storage
      const storagePathImage = video.imageURL;
      const storagePathVideo = video.videoURL;

      if (storagePathImage) {
        const imageRef = ref(storage, storagePathImage);
        await deleteObject(imageRef);
      }

      if (storagePathVideo) {
        const videoRef = ref(storage, storagePathVideo);
        await deleteObject(videoRef);
      }

      toast.success("Document and corresponding files deleted successfully");
      navigate("/view-video");
    } catch (error) {
      toast.error("Error deleting document and files: ", error);
    }
  };

  const handleDeleteComment = async (commentIndex) => {
    try {
      const updatedComments = video.comments.filter(
        (_, index) => index !== commentIndex
      );
      const videoDocRef = doc(db, "videos", id);
      await updateDoc(videoDocRef, { comments: updatedComments });

      toast.success("Comment deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {video ? (
        <div>
          <div>
            <p>{video.artist}</p>
            <p>{video.title}</p>
            {video.comments && (
              <div>
                {video.comments.map((comment, index) => (
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
            <button onClick={handleDelete}>Delete</button>
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

export default VideoDetails;
