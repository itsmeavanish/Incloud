import { SiFiles } from "react-icons/si";
import styles from"./Content.module.css"
import { useRef, useState } from "react";
export default function Contentbox({ item,setvisible,visible,seturl,iframe,setiframe,fileSize,handletrashfile }) {
  const [up,setup]=useState(false);
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
  const date=item.createdAt.split("T");
  return (
    // JSX part (React component)
<>
<li className={styles.fileitem} onMouseEnter={()=>setup(!up)}  
onMouseLeave={()=>setup(!up)}
onClick={handleevent}>
  <div className={styles.fileinfo}>
    <span className={styles.fileicon}>
      <SiFiles color="#fdca13"/>
    </span>
    <span className={styles.filename}>{item.name}</span>
  </div>
  <span className={styles.filetype}>Folder</span>
  <span className={styles.filesize}>{fileSize} MB</span>
  <span className={styles.filedate}>{date[0]}</span>
</li>
<div className={`${up ? styles.up :""}`}>
<span onClick={()=>handletrashfile(item.id)}>.</span>
<span>.</span>
<span>..</span>
</div>
</>

  );
  
}
