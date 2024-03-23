import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../config";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const AddNews = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [info, setInfo] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadProgressVideo, setUploadProgressVideo] = useState(0);
  const [uploadProgressImage, setUploadProgressImage] = useState(0);

  const navigate = useNavigate();

  // upload video
  const handleVideo = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `news/${Date.now()} ${file.name}`);

    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgressVideo(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setVideoFile(downloadURL);
          toast.success("video uploaded successfully");
        });
      }
    );
  };

  // upload image
  const handleImage = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `news/${Date.now()} ${file.name}`);

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
      const docRef = addDoc(collection(db, "news"), {
        title: title,
        date: date,
        description: description,
        info: info,
        imageURL: imageFile,
        videoURL: videoFile,
      });
      toast.success("video successfully uploaded");
      setVideoFile("");
      setDescription("");
      setInfo("");
      setDate("");
      setTitle("");
      setUploadProgressImage("");
      setUploadProgressVideo("");
      navigate("/view-news");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col max-w-[500px] min-w-[400px]"
        >
          <div className="flex flex-col mb-2">
            <label className="text-xl font-semibold">Title</label>
            <input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="VideoTitle"
              className="border-[1px] border-black rounded-lg p-[3px]"
            />
          </div>
          <div className="flex flex-col mb-2">
            <div className="group w-full border-2 rounded-2xl">
              {uploadProgressVideo === 0 ? null : (
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-3">
                  <div
                    className="bg-green-400 text-lg font-sm text-blue-100 text-center p-0.5 leading-none rounded-full h-7"
                    style={{ width: `${uploadProgressVideo}%` }}
                  >
                    {uploadProgressVideo < 100
                      ? `uploading ${uploadProgressVideo}%`
                      : `upload complete ${uploadProgressVideo}%`}
                  </div>
                </div>
              )}
              <label className="text-xl font-semibold">Video</label>
              <input
                type="file"
                placeholder="Video"
                onChange={(e) => handleVideo(e)}
                className="w-full border-[1px] border-black rounded-lg p-[3px]"
              />
            </div>
          </div>
          <div className="flex flex-col mb-2">
            <div className="group w-full border-2 rounded-2xl">
              {uploadProgressImage === 0 ? null : (
                <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-3">
                  <div
                    className="bg-blue-600 text-lg font-sm text-blue-100 text-center p-0.5 leading-none rounded-full h-7"
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
            <label className="text-xl font-semibold">Date</label>
            <input
              value={date}
              required
              onChange={(e) => setDate(e.target.value)}
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
            <label className="text-xl font-semibold">News Info</label>
            <textarea
              value={info}
              required
              onChange={(e) => setInfo(e.target.value)}
              type="text"
              placeholder="News Info"
              className="border-[1px] border-black rounded-lg p-[3px]"
            />
          </div>
          <button type="submit" className="bg-black text-white py-2 rounded-xl">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
