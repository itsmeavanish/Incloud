
import { useAuth } from '../Context/useAuth'
import styles from "../components/Content.module.css"
import { SiFiles } from "react-icons/si";
export default function Trash() {
  const {trashData}=useAuth();
  
  return (
    

    <ul className='display flex flex-col p-2'>
      <h1 style={{fontWeight:"600", padding:"1rem", marginLeft:"1rem"}}>
        Your Trashed Data
      </h1>
      <li className="flex justify-between p-4 text-gray-600 text-center border-b">
          <span>Name</span>
          <span className="pl-16">Type</span>
          <span className="pl-8">FileSize</span>
          <span>Created at</span>
      </li>
      { trashData.map((item)=><TrashBox key={item?._id} item={item}/>)}
      

      
      

    </ul>
  )
}
function TrashBox({item}){
  const formatDate = (dateString) => new Date(dateString).toLocaleDateString();
  console.log("trash",item);
  return(
    <li className={styles.fileitem}>
    <div className={styles.fileinfo}>
      <span className={styles.fileicon}>
        <SiFiles color="#fdca13" />
      </span>
      <span className={styles.filename}>{item.name}</span>
    </div>
    <span className={styles.filetype}>Folder</span>
    <span className={styles.filesize}>4 MB</span>
    <span className={styles.filedate}>{formatDate(item?.createdAt)}</span>

    {/* Hover content */}
    
  </li>
  )
}
