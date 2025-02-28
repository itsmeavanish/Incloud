import { SiFiles } from "react-icons/si";
import styles from"./Content.module.css"
import { useState } from "react";
import { CiHeart } from "react-icons/ci";
import { RiLinksFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import { Heart } from "lucide-react";
export default function Contentbox({ item,setvisible,visible,seturl,iframe,setiframe,fileSize,handletrashfile,handleFavorites,handlelinks }) {
  const [isFavorited, setIsFavorited] = useState(false);
  const toggleFavorite = () => {
    setIsFavorited((prev) => !prev);
  };
  const id =item?._id;
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
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
      <div className="w-fit h-fit bg-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg p-3 gap-4 relative  bottom-20" style={{left:"78%"}}>
          <span   onClick={()=>handlelinks(id)}>
          <RiLinksFill  />
          </span>
          <span onClick={()=>handleFavorites(id)}>
          <button className={`flex items-center justify-center p-4 rounded-full `}>
        <Heart onClick={toggleFavorite}
        size={16}
        className={`transition-all ${
          isFavorited ? "fill-current scale-125 rounded-full bg-transparent text-red-500" : "scale-100 bg-transparent text-gray-700 rounded-full"
        }`}
      />
    </button>
          </span>
         <span onClick={()=>handletrashfile(id)} >
         <FaTrash />
         </span>
          
        </div>
</div>

  );
  
}
