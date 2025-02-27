import { useEffect, useRef, useState } from "react";
import Contentbox from "./Contentbox";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import Uploadbox from "./Uploadbox";
import { TbMaximize } from "react-icons/tb";
import { useAuth } from "../Context/useAuth";
import Spinner from "../Stylings/Spinner";

export default function ContentFiles({ files }) {
  const [id, setId] = useState("");
  const [data, setData] = useState([]);
  const [iframe, setIframe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [uploader, setUploader] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, value, trash, favorite } = useAuth();
  const divRef = useRef(null);

  useEffect(() => {
    // Filter files by user email and search value
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

  useEffect(() => {
    if (id) {
      const updatedData = data?.filter((file) => file._id !== id);
      trash(updatedData); // Assuming `trash` is synchronous
      setData(updatedData);
    }
  }, [id, trash, data]);

  const handleFavorites = (fileId) => {
    const updatedFavorites = data?.filter((file) => file._id !== fileId);
    favorite(updatedFavorites);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      divRef.current?.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <ul className="file-list">
        <li className="file-list-header">
          <span>Name</span>
          <span>Type</span>
          <span>File Size</span>
          <span>Created At</span>
        </li>
        {data.length ? (
          data.map((item) => (
            <Contentbox
              key={item._id}
              item={item}
              setvisible={setVisible}
              visible={visible}
              seturl={setUrl}
              iframe={iframe}
              setiframe={setIframe}
              setid={setId}
            />
          ))
        ) : (
          <span className="no-files">No files available</span>
        )}
        <button className="upload-button" onClick={() => setUploader(true)}>
          Upload
        </button>
      </ul>

      {/* Preview Modal */}
      {visible && (
        <Modal
          title="Your Uploaded Data"
          onClose={() => {
            setVisible(false);
            setIframe(false);
          }}
          onExpand={toggleFullscreen}
        >
          {!iframe ? (
            <img ref={divRef} src={url} alt="Preview" className="preview-img" />
          ) : (
            <iframe
              src={url}
              title="Preview"
              className="preview-iframe"
            ></iframe>
          )}
        </Modal>
      )}

      {/* Upload Modal */}
      {uploader && (
        <Modal
          title="Upload Box"
          onClose={() => setUploader(false)}
        >
          <Uploadbox />
        </Modal>
      )}
    </>
  );
}

// Modal Component
function Modal({ title, onClose, onExpand, children }) {
  return (
    <div className="modal-container">
      <h2 className="modal-title">{title}</h2>
      {onExpand && (
        <span className="modal-expand" onClick={onExpand}>
          <TbMaximize />
        </span>
      )}
      <span className="modal-close" onClick={onClose}>
        <IoMdCloseCircle />
      </span>
      {children}
    </div>
  );
}
