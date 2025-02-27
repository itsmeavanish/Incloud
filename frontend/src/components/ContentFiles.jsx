import { useEffect, useRef, useState } from "react";
import Contentbox from "./Contentbox";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import Uploadbox from "./Uploadbox";
import { TbMaximize } from "react-icons/tb";
import { useAuth } from "../Context/useAuth";
import Spinner from "../Stylings/Spinner";

export default function ContentFiles({ files }) {
  const [id, setId] = useState();
  const { user, value, trash, favorite, trashData } = useAuth();
  const [data, setData] = useState([]);
  const [iframe, setIframe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [uploader, setUploader] = useState(false);
  const [fileSize, setFileSize] = useState(1);
  const divRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const name = "general";

  // Filter data based on user email and search value
  useEffect(() => {
    const filteredData =
      files?.filter((item) => item.email === user?.email) || [];
    setData(
      value
        ? filteredData.filter((item) =>
            item.name?.toLowerCase().includes(value.toLowerCase())
          )
        : filteredData
    );
  }, [files, user?.email, value]);

  // Handle trash functionality
  useEffect(() => {
    async function trashfile() {
      try {
        if (id) {
          const updatedData = data?.filter((file) => file._id !== id);
          await trash(updatedData);
          setData(trashData);
        }
      } catch (error) {
        console.error("Failed to trash the file:", error);
      }
    }    
   trashfile();
  }, [id, data, trash,trashData]);

  const handleTrashFile = (id) => setId(id);

  const handleFavorites = (id) => {
    const updatedData = data?.filter((file) => file._id !== id);
    favorite(updatedData); // Call to update favorites
    setData(updatedData);
  };

  const enterFullscreen = () => {
    if (divRef.current) {
      if (divRef.current.requestFullscreen) {
        divRef.current.requestFullscreen();
      } else if (divRef.current.webkitRequestFullscreen) {
        divRef.current.webkitRequestFullscreen();
      } else if (divRef.current.msRequestFullscreen) {
        divRef.current.msRequestFullscreen();
      }
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ul className="m-4 p-4 list-none flex flex-col gap-2">
        {/* Table Header */}
        <li className="flex justify-between p-4 text-gray-600 text-center border-b">
          <span>Name</span>
          <span className="pl-16">Type</span>
          <span className="pl-8">FileSize</span>
          <span>Created at</span>
        </li>

        {/* Files List */}
        {files?.length ? (
          <li className="flex flex-col gap-4">
            {data?.map((item, index) => (
              <Contentbox
                key={index}
                item={item}
                setvisible={setVisible}
                visible={visible}
                seturl={setUrl}
                iframe={iframe}
                setiframe={setIframe}
                fileSize={fileSize}
                handletrashfile={handleTrashFile}
              />
            ))}
          </li>
        ) : (
          <span className="text-center p-4">No files yet</span>
        )}

        {/* Upload Button */}
        <button
          className="relative bg-green-600 text-white py-2 px-4 rounded-full w-fit mx-auto mt-4"
          onClick={() => setUploader(!uploader)}
        >
          Upload
        </button>
      </ul>

      {/* File Preview Modal */}
      {visible && (
        <div
        style={{
          display: "flex",
          flexDirection: "column",
          position: "absolute",
          zIndex: "2000",
          height: "fit-content",
          padding: "1.3rem",
          top: "7rem",
          left: "25rem",
          gap: "0.7rem",
          background: "#fbfbfc7f",
          border: "1px solid #e9e9f1",
        }}
          ref={divRef}
         className="bg-opacity-50 backdrop-blur-md shadow-lg transform -translate-y-6 -translate-x-6 rounded-lg element"
        >
          <h2 className="font-semibold text-center">Your Uploaded Data</h2>
          <span
            className="absolute top-4 right-16 cursor-pointer"
            onClick={enterFullscreen}
          >
            <TbMaximize />
          </span>
          <span
            className="absolute top-4 right-8 cursor-pointer"
            onClick={() => {
              setVisible(!visible);
              setIframe(false);
            }}
          >
            <IoMdCloseCircle />
          </span>
          {!iframe ? (
            <img src={url} className="h-80" alt="Preview" />
          ) : (
            <iframe src={url} className="h-80 w-80" title="Preview"></iframe>
          )}
        </div>
      )}

      {/* Uploader Modal */}
      {uploader && (
        <div className="flex flex-col absolute z-50 w-3/5 h-auto p-6 top-28 left-1/4 gap-4 bg-white shadow-lg rounded-lg">
          <h2 className="font-semibold text-center">Upload Box</h2>
          <Uploadbox name={name} setfileSize={setFileSize} />
          <span
            className="absolute top-4 right-8 cursor-pointer"
            onClick={() => setUploader(!uploader)}
          >
            <IoMdCloseCircle />
          </span>
        </div>
      )}
    </>
  );
}
