import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentFiles from "../components/ContentFiles";
import { IoCloudUploadOutline } from "react-icons/io5";

export default function Storage() {
  const [data, setData] = useState([]);
  const navigate=useNavigate();
  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFiles] = useState([]);

  
  useEffect(() => {
    // Define the async fetch function
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          // If there's no token, redirect to the login page
          navigate('/login');
          return;
        }
        const response = await fetch("http://localhost:4000/api/auth/upload/fetchfile",{
          method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        }},); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log("result is ",result);
        setData(result); // Update the data state
        setLoading(false); // Set loading to false
      } catch (err) {
        setError(err.message); // Update error state
        setLoading(false); // Set loading to false
      }
    };

    // Call the fetch function
    fetchData();
  }, [navigate]); // Empty dependency array ensures the effect runs only once


  useEffect(() => {
    if (data) {
      setFiles(data.files);
console.log("data",data)
    }
  }, [data]); // Removed 'file' from dependencies
  // Conditional rendering
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div style={{color:"black", display:"flex",flexDirection:"column", justifyContent:"space-between"}}>
       <div>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "2rem"  }}>
              <span style={{ fontWeight: "600" }}>My storage</span>
              <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <IoCloudUploadOutline />
                <button style={{ border: "none", background: "transparent" }}>Upload</button>
              </span>
            </div>
             <ContentFiles files={file} /> 
          </div>
    </div>
  )
}
