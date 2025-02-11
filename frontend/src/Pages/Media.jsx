import { IoCloudUploadOutline } from "react-icons/io5";
import { Upload } from "../components/Upload";
const upload = [
  { name: "PDF", imageUrl: "./pdf.webp" },
  { name: "DOCX", imageUrl: "./docx.png" },
  { name: "XLSX", imageUrl: "./xlsx.png" },
  { name: "IMAGE", imageUrl: "./svg.webp" },
  { name: "VIDEO", imageUrl: "./video.png" },
];

export default function Media() {
  return (
    <div style={{textAlign:"center"}}>
     <div style={{display:"flex", justifyContent:"space-between", padding:"2rem"}}>
      <span style={{fontWeight:"600"}}> Add Your media</span>
      <span style={{display:"flex", justifyContent:"center", alignItems:"center" }}>
          <IoCloudUploadOutline size="1.5rem" />
          <button style={{border:"none", background:"transparent", fontSize:"1rem"}}>Upload</button>
      </span>
     </div>
          <div style={{backgroundColor:"", display:"flex", justifyContent:"space-evenly"}}>
            {upload.map((item,index)=><Upload items={item} key={index}/>)}
          </div> 
    </div>
  )
}
