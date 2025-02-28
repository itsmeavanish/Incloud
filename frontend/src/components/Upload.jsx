import { MdOutlineCloudUpload } from "react-icons/md";
import styles from "../components/Content.module.css";
import { useState } from "react";
import Uploadbox from "./Uploadbox";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";

export function Upload({ items }) {
  const [uploader, setuploader] = useState(false);
  function handleclick() {
    setuploader(!uploader);
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "1rem",
          gap: "1rem",
          backgroundColor: "#F4F4F4",
          borderRadius: "1rem",
          position: "relative",
          overflow: "hidden",
          width: "100%",
          maxWidth: "400px", // Limit container width
          textAlign: "center",
        }}
        className={styles.container}
        onClick={handleclick}
      >
        <img
          src={items.imageUrl}
          height="100rem"
          width="100rem"
          alt="PDF"
          style={{
            maxWidth: "80%",
            height: "auto",
          }}
        />
        <span style={{ fontSize: "1rem", fontWeight: "500" }}>
          {items.name} Format
        </span>
        <span className={styles.uploader}>
          <MdOutlineCloudUpload size="1.5rem" />
          <span style={{ marginLeft: "0.5rem", fontSize: "0.9rem" }}>Upload</span>
        </span>
      </div>
      {uploader ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "absolute",
            zIndex: "2000",
            width: "90%",
            maxWidth: "400px",
            padding: "1.3rem",
            top: "4rem",
            gap: "0.7rem",
            background: "#fbfbfc7f",
            border: "1px solid #e9e9f1",
            borderRadius: "1rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          className="flex flex-col absolute z-50 w-3/5 h-auto p-6 top-28 left-1/4 gap-4 bg-white shadow-lg transform -translate-y-6 -translate-x-6 rounded-lg element"
        >
          <h2 style={{ fontWeight: "600", fontSize: "1.2rem", textAlign: "center" }}>
            Upload Box
          </h2>
          <Uploadbox name={items.name} />
          <span
            style={{
              position: "absolute",
              right: "1rem",
              top: "1rem",
              cursor: "pointer",
            }}
            onClick={() => setuploader(!uploader)}
          >
            <IoMdCloseCircle size="1.5rem" color="#888" />
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
