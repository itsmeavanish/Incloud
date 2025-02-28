import { SiFiles } from "react-icons/si";
import styles from"./Content.module.css"
import { useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { RiLinksFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
export default function Contentbox({ item,setvisible,visible,seturl,iframe,setiframe,fileSize,handletrashfile }) {
  const id =item?._id;
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  console.log("item",item)
  function handleevent(){
    setvisible(!visible);
    if (item.imageUrl){
    seturl(item.imageUrl);}
    else if(item.videoUrl){
      seturl(item.videoUrl)
      setiframe(!iframe);
    }
    else{
      seturl(item.fileUrl)
      setiframe(!iframe);
    } 
  }
  return (
    // JSX part (React component)
<div className="group">
<li 
        className={styles.fileitem} 
        onClick={handleevent}
      >
        <div className={styles.fileinfo}>
          <span className={styles.fileicon}>
            <SiFiles color="#fdca13" />
          </span>
          <span className={styles.filename}>{item.name}</span>
        </div>
        <span className={styles.filetype}>Folder</span>
        <span className={styles.filesize}> MB</span>
        <span className={styles.filedate}>{formatDate(item?.createdAt)}</span>

        {/* Hover content */}
        
      </li>
      <div className="m-7 w-fit h-fit bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg p-3 gap-4 relative right-30 bottom-10">
          <span onClick={()=>handletrashfile(id)} >
          <RiLinksFill  />
          </span>
          <span onClick={()=>handletrashfile(id)}>
          <CiHeart /> 
          </span>
         <span onClick={()=>handletrashfile(id)}>
         <FaTrash  />
         </span>
          
        </div>
</div>

  );
  
}
