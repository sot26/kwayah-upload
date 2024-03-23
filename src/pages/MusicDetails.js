import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../config";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";

const MusicDetails = () => {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const [music, setMusic] = useState(null); // Change initial state to null or an empty object if you prefer

  useEffect(() => {
    const getMusic = async () => {
      const musicDocRef = doc(db, "music", id);
      const musicDocSnapshot = await getDoc(musicDocRef);

      if (musicDocSnapshot.exists()) {
        setMusic({ ...musicDocSnapshot.data(), id: musicDocSnapshot.id });
      } else {
        console.log("Document does not exist!");
      }
    };

    getMusic();
  }, [id]); // Include id in dependency array

  const handleDelete = async () => {
    try {
      // Delete document from Firestore
      await deleteDoc(doc(db, "music", id));

      // Delete files from storage
      const storagePathImage = music.imageURL;
      const storagePathAudio = music.audioURL;

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
      const musicDocRef = doc(db, "music", id);
      await updateDoc(musicDocRef, {
        comments: [...(music.comments || []), { name, comment }],
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
      const updatedComments = music.comments.filter(
        (_, index) => index !== commentIndex
      );
      const musicDocRef = doc(db, "music", id);
      await updateDoc(musicDocRef, { comments: updatedComments });

      toast.success("Comment deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {music ? (
        <div>
          <div>
            <p>{music.artist}</p>
            <p>{music.title}</p>
            <button onClick={handleDelete}>delete</button>
            {music.comments && (
              <div>
                {music.comments.map((comment, index) => (
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

export default MusicDetails;
