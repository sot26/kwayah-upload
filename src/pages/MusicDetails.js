import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../config";
import { deleteObject, ref } from "firebase/storage";
import { toast } from "react-toastify";

const MusicDetails = () => {
  const [music, setMusic] = useState(null);
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

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
  }, [id]);

  useEffect(() => {
    if (music) {
      setArtist(music.artist);
      setTitle(music.title);
    }
  }, [music]);

  const handleUpdate = async () => {
    try {
      const musicDocRef = doc(db, "music", id);
      await updateDoc(musicDocRef, {
        artist,
        title,
        // other fields you want to update
      });

      toast.success("Document updated successfully");
      window.location.reload();
      navigate(`/view-music/${id}`);
    } catch (error) {
      toast.error("Error updating document: " + error.message);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "music", id));

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
      const musicDocRef = doc(db, "music", id);
      await updateDoc(musicDocRef, {
        comments: [...(music.comments || []), { name, comment }],
      });

      toast.success("Comment added successfully");
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
          <div>
            <input
              type="text"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
            />
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {/* Add input fields for other fields */}
            <button onClick={handleUpdate}>Update</button>
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
  );
};

export default MusicDetails;
