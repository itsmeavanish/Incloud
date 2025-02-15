import { useEffect, useRef, useState } from "react";
import Contentbox from "./Contentbox";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import Uploadbox from "./Uploadbox";
import { TbMaximize } from "react-icons/tb";
import { useAuth } from "../Context/useAuth";
import Spinner from "../Stylings/Spinner";

export default function ContentFiles({ files }) {
  const { user, value } = useAuth();
  const [data, setData] = useState();
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
    if (value) {
      const filteredData = initialData.filter((item) =>
        item.name?.toLowerCase().includes(value.toLowerCase())
      );
      setData(filteredData);
    } else {
      setData(initialData);
    }
  }, [files, user?.email, value]);

  const enterFullscreen = () => {
    if (divRef.current.requestFullscreen) {
      divRef.current.requestFullscreen();
    } else if (divRef.current.webkitRequestFullscreen) {
      divRef.current.webkitRequestFullscreen();
    } else if (divRef.current.msRequestFullscreen) {
      divRef.current.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <style>
        {`
        /* Responsive styles */
        @media (max-width: 768px) {
          ul {
            margin: 0.5rem;
            padding: 0.5rem;
          }

          li {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }

          button {
            left: 50%;
            transform: translateX(-50%);
          }

          .element {
            width: 90%;
            left: 5%;
            top: 10%;
          }

          img, iframe {
            height: 20rem;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          li {
            gap: 0.3rem;
          }

          h2 {
            font-size: 1rem;
          }

          img, iframe {
            height: 15rem;
          }
        }
        `}
      </style>
      <ul
        style={{
          margin: "1rem",
          padding: "1rem",
          listStyleType: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.6rem",
        }}
      >
        <li
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            color: "#6c6868f7",
            textAlign: "center",
            borderBottom: "1px solid #DFE8DC",
          }}
        >
          <span>Name</span>
          <span style={{ paddingLeft: "5.2rem" }}>Type</span>
          <span style={{ paddingLeft: "3.7rem" }}>FileSize</span>
          <span>Created at</span>
        </li>
        {files?.length ? (
          <li
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
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
              />
            ))}
          </li>
        ) : (
          <span style={{ textAlign: "center", padding: "1rem" }}>
            No files yet
          </span>
        )}
        <button
          style={{
            position: "relative",
            bottom: "-10%",
            background: "#3aa56f",
            width: "fit-content",
            top: "1rem",
            left: "43%",
            padding: "1rem 2rem",
            borderRadius: "30px",
          }}
          onClick={() => setUploader(!uploader)}
        >
          Upload
        </button>
      </ul>
      {visible ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            zIndex: "2000",
            width: "63%",
            height: "90%",
            padding: "1.3rem",
            top: "4rem",
            left: "20rem",
            gap: "0.7rem",
            background: "#fbfbfc7f",
            border: "1px solid #e9e9f1",
          }}
          className="bg-opacity-50 backdrop-blur-md shadow-lg transform -translate-y-6 -translate-x-6 rounded-lg element"
        >
          <h2 style={{ fontWeight: "600", textAlign: "center" }}>
            Your Uploaded Data
          </h2>
          <span
            style={{ position: "absolute", right: "4rem", cursor: "pointer" }}
            className="expand"
            onClick={enterFullscreen}
          >
            <TbMaximize />
          </span>
          <span
            style={{ position: "absolute", right: "2rem", cursor: "pointer" }}
            onClick={() => {
              setVisible(!visible);
              setIframe(false);
            }}
          >
            <IoMdCloseCircle />
          </span>
          {!iframe ? (
            <img ref={divRef} src={url} style={{ height: "33rem" }} />
          ) : (
            <iframe
              src={url}
              alt="Preview"
              style={{ height: "33rem", width: "33rem", color: "black" }}
            />
          )}
        </div>
      ) : null}
      {uploader ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            zIndex: "2000",
            width: "63%",
            height: "fit-content",
            padding: "1.3rem",
            top: "7rem",
            left: "25rem",
            gap: "0.7rem",
            background: "#fbfbfc7f",
            border: "1px solid #e9e9f1",
          }}
          className="bg-opacity-50 backdrop-blur-md shadow-lg transform -translate-y-6 -translate-x-6 rounded-lg element"
        >
          <h2 style={{ fontWeight: "600", textAlign: "center" }}>Upload Box</h2>
          <Uploadbox name={name} setfileSize={setFileSize} />
          <span
            style={{ position: "absolute", right: "2rem", cursor: "pointer" }}
            onClick={() => setUploader(!uploader)}
          >
            <IoMdCloseCircle />
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
