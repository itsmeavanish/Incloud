import React from 'react'
import { IoMdCloseCircle } from 'react-icons/io';
import { TbMaximize } from 'react-icons/tb';

export default function MediaView({divRef,setVisible,setIframe,visible,iframe,url}) {
    const enterFullscreen = () => {
        if (divRef.current) {
          if (divRef.current.requestFullscreen) {
            divRef.current.requestFullscreen();
          } else if (divRef.current.webkitRequestFullscreen) {
            divRef.current.webkitRequestFullscreen();
          } else if (divRef.current.msRequestFullscreen) {
            divRef.current.msRequestFullscreen();
          }
        }
      };
    
  return (
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
          ref={divRef}
          className="bg-opacity-50 backdrop-blur-md shadow-lg transform -translate-y-6 -translate-x-6 rounded-lg element"
        >
          <h2 className="font-semibold text-center">Your Uploaded Data</h2>
          <span
            className="absolute top-4 right-16 cursor-pointer"
            onClick={enterFullscreen}
          >
            <TbMaximize />
          </span>
          <span
            className="absolute top-4 right-8 cursor-pointer"
            onClick={() => {
              setVisible(!visible);
              setIframe(false);
            }}
          >
            <IoMdCloseCircle />
          </span>
          <div style={{height:"100%", width:"100%", display:"flex", justifyContent:"center", alignItems:"center" }}>
          {!iframe ? (
            <img src={url} height="70%" width="50%" alt="Preview" />
          ) : (
            <iframe src={url} height="70%" width="50%"title="Preview" style={{scrollbarWidth:"none"}}></iframe>
          )}
          </div>
        </div>
  )
}
