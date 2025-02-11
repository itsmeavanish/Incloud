import { MdOutlineCloudUpload } from "react-icons/md";
import styles from "../components/Content.module.css"
import { useState } from "react";
import Uploadbox from "./Uploadbox";
import "../index.css"
import { IoMdCloseCircle } from "react-icons/io";
export function Upload({items}){
    const [uploader,setuploader]=useState(false);
    function handleclick(){
        setuploader (!uploader)
    }
    return(
        <>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "1rem", gap: "1rem", backgroundColor: "#F4F4F4", borderRadius: "1rem", paddingLeft: "2.2rem", paddingRight: "2.2rem",position: "relative", /* Required for absolute positioning of the text */overflow: "hidden" /* Ensures sliding text is clipped */}} className={styles.container} onClick={handleclick}>
             <img src={items.imageUrl} height="100rem" width="100rem" alt="PDF" />
            <span>{items.name} Format</span>
                    <span className={styles.uploader}>
                        <MdOutlineCloudUpload /> 
                        <span>Upload</span>
    
                    </span>
        </div>
        {uploader ? 
        <div style={{display:"flex", flexDirection:"column", position:"absolute", zIndex:"2000", width:"63% ", height:"fit-content", padding:"1.3rem", top:"4rem", gap:"0.7rem", background:"#fbfbfc7f", border:"1px solid #e9e9f1"}} className="bg-opacity-50 backdrop-blur-md shadow-lg transform -translate-y-6 -translate-x-6 rounded-lg element" >
            <h2 style={{fontWeight:"600"}}>Upload Box</h2>
            <Uploadbox name={items.name}/>
            <span style={{position:"absolute", right:"2rem", cursor:"pointer"}} onClick={()=>setuploader(!uploader)}><IoMdCloseCircle /></span>
        </div> :""}
        </>
        
    )
}