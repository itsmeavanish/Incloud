import React from "react";

import styles from "./Profile.module.css";
import { ChevronDown } from "lucide-react";
import { useAuth } from "../Context/useAuth";

const Profile = () => {
  const { user, loading, error,logout } = useAuth();
  function handlelogout(e){
    e.preventDefault();
    logout();

  }
  if (loading) {
    return <div className={styles.loader}>
    <span>.</span>
    <span>.</span>
    <span>.</span>
    <span>.</span>
  </div>
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <button className={styles.profilecontainer} >
      
      <div className="flex items-center justify-center border-2 border-gray-100 shadow-sm px-3 rounded-full py-1 gap-1">
        <span className="text-sm font-medium text-gray-800">Welcome {user.name.split(" ")[0]} </span>
      <ChevronDown className="text-gray-500 w-4 h-4" />
      </div>

      {/* Dropdown Icon */}
      <div className={styles.profilebox}>
      <div className={styles.profileicon}>
        <img src={user?.profilePhoto} alt="Profile" />
      </div>
        <h3>{user?.name || ""}</h3>
        <p>Email: {user?.email || ""}</p>
        <p> Joined At : {user?.createdAt.split("T")[0]}</p>
        <button onClick={handlelogout}>Logout</button>
      </div>
    </button>
  );
};

export default Profile;
