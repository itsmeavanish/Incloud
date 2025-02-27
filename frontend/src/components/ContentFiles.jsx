import { useEffect, useRef, useState } from "react";
import Contentbox from "./Contentbox";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import Uploadbox from "./Uploadbox";
import { TbMaximize } from "react-icons/tb";
import { useAuth } from "../Context/useAuth";
import Spinner from "../Stylings/Spinner";

export default function ContentFiles({ files }) {
  const { user, value, trash, favorite, trashData, favoriteData } = useAuth();
  const [data, setData] = useState([]);
  const [iframe, setIframe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [uploader, setUploader] = useState(false);
  const [fileSize, setFileSize] = useState(1);
  const divRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const name = "general";

  useEffect(() => {
    const initialData = files?.filter((item) => item.email === user?.email) || [];
    const filteredData = value
      ? initialData.filter((item) => item.name?.toLowerCase().includes(value.toLowerCase()))
      : initialData;
    setData(filteredData);
  }, [files, user?.email, value]);

  function handletrashfile(id) {
    const initialData = data?.filter((item) => item.email === user?.email) || [];
    const filteredtrashData = initialData.filter((file) => id === file?._id);
    trash(filteredtrashData);

    const updatedData = initialData.filter((item) => !filteredtrashData.includes(item));
    setData(updatedData);
  }

  function handlefavorites(id) {
    const favoriteFile = data?.find((file) => id === file?._id);
    if (favoriteFile) {
      favorite([...favoriteData, favoriteFile]);
    }
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      divRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ul className="file-list">
        <li className="file-header">
          <span>Name</span>
          <span>Type</span>
          <span>FileSize</span>
          <span>Created at</span>
        </li>
        {data?.length ? (
          data.map((item, index) => (
            <Contentbox
              key={index}
              item={item}
              setvisible={setVisible}
              visible={visible}
              seturl={setUrl}
              iframe={iframe}
              setiframe={setIframe}
              fileSize={fileSize}
              handletrashfile={handletrashfile}
              handlefavorites={handlefavorites}
            />
          ))
        ) : (
          <span className="no-files-message">
            {value ? "No files match your search" : "No files yet"}
          </span>
        )}
      </ul>
      <button className="upload-button" onClick={() => setUploader((prev) => !prev)}>
        Upload
      </button>
      {visible && (
        <div className="modal">
          <h2>Your Uploaded Data</h2>
          <span className="fullscreen-icon" onClick={toggleFullscreen}>
            <TbMaximize />
          </span>
          <span className="close-icon" onClick={() => setVisible(false)}>
            <IoMdCloseCircle />
          </span>
          {!iframe ? (
            <img ref={divRef} src={url} className="preview-image" />
          ) : (
            <iframe src={url} className="preview-iframe" />
          )}
        </div>
      )}
      {uploader && (
        <div className="modal uploader-modal">
          <h2>Upload Box</h2>
          <Uploadbox name={name} setfileSize={setFileSize} />
          <span className="close-icon" onClick={() => setUploader(false)}>
            <IoMdCloseCircle />
          </span>
        </div>
      )}
    </>
  );
}
