import { useEffect, useRef, useState } from "react";
import Contentbox from "./Contentbox";
import "../index.css";
import { IoMdCloseCircle } from "react-icons/io";
import Uploadbox from "./Uploadbox";
import { TbMaximize } from "react-icons/tb";
import { useAuth } from "../Context/useAuth";
import Spinner from "../Stylings/Spinner";
import MediaView from "./MediaView";

export default function ContentFiles({ files }) {
  const { user, value, trash, trashData, favorite,links} = useAuth();
  const [data, setData] = useState([]);
  const [iframe, setIframe] = useState(false);
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [uploader, setUploader] = useState(false);
  const [fileSize, setFileSize] = useState(1);
  const divRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const name = "general";

  // Load data and filter out trashed files
  useEffect(() => {
    const filteredData =
      files?.filter(
        (item) =>
          item.email === user?.email &&
          !trashData.some((trashed) => trashed._id === item._id)
      ) || [];
    setData(
      value
        ? filteredData.filter((item) =>
            item.name?.toLowerCase().includes(value.toLowerCase())
          )
        : filteredData
    );
  }, [files, user?.email, value, trashData]);

  // Trash a file by moving it to trashData and filtering from main data
  const handleTrashFile = (fileId) => {
    const fileToTrash = data.find((file) => file._id === fileId);
    if (fileToTrash) {
      const updatedTrashData = [...trashData, fileToTrash];
      trash(updatedTrashData); // Update trashData in context
      setData(data.filter((file) => file._id !== fileId)); // Filter from current data
    }
  };

  const handleFavorites = (id) => {
    const updatedData = data?.filter((file) => file._id === id);
    if(updatedData){
      favorite(updatedData); // Call to update favorites
    }
    
  };
  const handlelinks = (id) => {
    const updatedData = data?.filter((file) => file._id === id);
    if(updatedData){
      links(updatedData); // Call to update favorites
    }
   
  };


  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <ul className="m-4 p-4 list-none flex flex-col gap-2">
        <li className="flex justify-between p-4 text-gray-600 text-center border-b">
          <span>Name</span>
          <span className="pl-16">Type</span>
          <span className="pl-8">FileSize</span>
          <span>Created at</span>
        </li>

        {data?.length ? (
          <li className="flex flex-col gap-4">
            {data.map((item, index) => (
              <Contentbox
                key={index}
                item={item}
                setvisible={setVisible}
                visible={visible}
                seturl={setUrl}
                iframe={iframe}
                setiframe={setIframe}
                fileSize={fileSize}
                handletrashfile={handleTrashFile}
                handleFavorites={handleFavorites}
                handlelinks={handlelinks}
              />
            ))}
          </li>
        ) : (
          <span className="text-center p-4">No files yet</span>
        )}

        <button className="relative bg-green-600 text-white py-2 px-4 rounded-full w-fit mx-auto mt-4"
          onClick={() => setUploader(!uploader)}
        >
          Upload
        </button>
      </ul>

        <MediaView  divRef={divRef} setvisible={setVisible} visible={visible} iframe={iframe} url={url}/>
     

      {/* Uploader Modal */}
      {uploader && (
        <div className="flex flex-col absolute z-50 w-3/5 h-auto p-6 top-28 left-1/4 gap-4 bg-white shadow-lg transform -translate-y-6 -translate-x-6 rounded-lg element"  >
          <h2 className="font-semibold text-center">Upload Box</h2>
          <Uploadbox name={name} setfileSize={setFileSize} />
          <span
            className="absolute top-4 right-8 cursor-pointer"
            onClick={() => setUploader(!uploader)}>
            <IoMdCloseCircle />
          </span>
        </div>
      )}
    </>
  );
}
