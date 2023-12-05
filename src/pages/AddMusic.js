import { addDoc, collection } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../config";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddMusic = ({ isAuth }) => {
  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgressAudio, setUploadProgressAudio] = useState(0);
  const [uploadProgressImage, setUploadProgressImage] = useState(0);

  const navigate = useNavigate();

  // upload music
  const handleMusic = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `kwayah/${Date.now()} ${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgressAudio(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setAudioFile(downloadURL);
          toast.success("audio uploaded successfully");
        });
      }
    );
  };

  // upload image
  const handleImage = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `kwayah/${Date.now()} ${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgressImage(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFile(downloadURL);
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const docRef = addDoc(collection(db, "music"), {
        artist: artist,
        title: title,
        releaseDate: releaseDate,
        description: description,
        info: info,
        imageURL: imageFile,
        audioURL: audioFile,
      });
      toast.success("music successfully uploaded");
      setArtist("");
      setAudioFile("");
      setDescription("");
      setInfo("");
      setReleaseDate("");
      setTitle("");
      setUploadProgressImage("");
      setUploadProgressAudio("");
      navigate("/view-music");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // useEffect(() => {
  //   if (isAuth === false) {
  //     navigate("/login");
  //   }
  // }, []);

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[500px] min-w-[400px]"
        >
          <div className="flex flex-col mb-2">
            <label className="text-xl font-semibold">Artist</label>
            <input
              type="text"
              required
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              placeholder="Artist name"
              className="border-[1px] border-black rounded-lg p-[3px]"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-xl font-semibold">Title</label>
            <input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Music Title"
              className="border-[1px] border-black rounded-lg p-[3px]"
            />
          </div>
          <div className="flex flex-col mb-2">
            <div className="group w-full border-2 rounded-2xl">
              {uploadProgressAudio === 0 ? null : (
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-3">
                  <div
                    className="bg-green-400 text-lg font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-7"
                    style={{ width: `${uploadProgressAudio}%` }}
                  >
                    {uploadProgressAudio < 100
                      ? `uploading ${uploadProgressAudio}%`
                      : `upload complete ${uploadProgressAudio}%`}
                  </div>
                </div>
              )}
              <label className="text-xl font-semibold">Audio</label>
              <input
                type="file"
                required
                placeholder="audio"
                onChange={(e) => handleMusic(e)}
                className="w-full border-[1px] border-black rounded-lg p-[3px]"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="group w-full border-2 rounded-2xl">
              {uploadProgressImage === 0 ? null : (
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-3">
                  <div
                    className="bg-blue-600 text-lg font-medium text-blue-100 text-center p-0.5 leading-none rounded-full h-7"
                    style={{ width: `${uploadProgressImage}%` }}
                  >
                    {uploadProgressImage < 100
                      ? `uploading ${uploadProgressImage}%`
                      : `upload complete ${uploadProgressImage}%`}
                  </div>
                </div>
              )}
              <label className="text-xl font-semibold">Image</label>
              <input
                type="file"
                required
                placeholder="image"
                onChange={(e) => handleImage(e)}
                className="w-full border-[1px] border-black rounded-lg p-[3px]"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-xl font-semibold">Release Date</label>
            <input
              value={releaseDate}
              required
              onChange={(e) => setReleaseDate(e.target.value)}
              type="text"
              placeholder="Release Date"
              className="border-[1px] border-black rounded-lg p-[3px]"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-xl font-semibold">Description</label>
            <textarea
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Description"
              className="border-[1px] border-black rounded-lg p-[3px]"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label className="text-xl font-semibold">Music Info</label>
            <textarea
              value={info}
              required
              onChange={(e) => setInfo(e.target.value)}
              type="text"
              placeholder="Music Info"
              className="border-[1px] border-black rounded-lg p-[3px]"
            />
          </div>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddMusic;
