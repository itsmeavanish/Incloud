import { SiFiles } from "react-icons/si";
import { CiHeart } from "react-icons/ci";
import { RiLinksFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import styles from "./Content.module.css";
import { useState } from "react";

export default function Contentbox({
  item,
  setVisible,
  visible,
  setUrl,
  iframe,
  setIframe,
  fileSize,
  setId,
}) {
  const id = item._id;

  // Format the creation date
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();

  // Handle file preview
  const handleEvent = () => {
    setVisible(!visible);
    setIframe(false);

    if (item.imageUrl || item.videoUrl || item.fileUrl) {
      setUrl(item.imageUrl || item.videoUrl || item.fileUrl);
      if (item.videoUrl || item.fileUrl) setIframe(true);
    }
  };
  function handleaction(id){
    setId(id);
  }


  return (
    <div className="group">
      {/* Main file item */}
      <li className={styles.fileitem} onClick={handleEvent}>
        <div className={styles.fileinfo}>
          <span className={styles.fileicon}>
            <SiFiles color="#fdca13" />
          </span>
          <span className={styles.filename}>{item.name}</span>
        </div>
        <span className={styles.filetype}>{item.type || "Folder"}</span>
        <span className={styles.filesize}>{fileSize} MB</span>
        <span className={styles.filedate}>{formatDate(item.createdAt)}</span>
      </li>

      {/* Hover actions */}
      <div
        className="w-fit h-fit bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg p-3 gap-4"
        onClick={(e) => e.stopPropagation()} // Prevent triggering the main click
      >
        <span onClick={()=>handleaction(id)}>
          <RiLinksFill />
        </span>
        <span onClick={()=>handleaction(id)}>
          <CiHeart />
        </span>
        <span onClick={()=>handleaction(id)} >
          <FaTrash />
        </span>
      </div>
    </div>
  );
}
