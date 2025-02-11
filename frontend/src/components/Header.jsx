
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import Profile from "./Profile";
import { useAuth } from "../Context/useAuth";

export default function Header() {
  const {isAuthenticated,search}=useAuth();
  const [searchval,setSearch]=useState("")
  useEffect(function(){
    function update(){
      search(searchval)
    }
    update();
  },[searchval])
  return (
    <>
    <div style={{ color:"black", display:"flex", justifyContent:"space-between", borderBottom:"1px solid #D9ECFB", padding:"1.1rem", margin:"1rem"}}>
      <input placeholder="Search for Your files" style={{border:"none",width:"auto", outline:"none"}} onChange={(e)=>setSearch(e.target.value)}/>
      <div>
        {!isAuthenticated ?<NavLink to="/login"> Sign In / Sign Up {}</NavLink> :<Profile />}
      </div>
  
    </div>
    
    </>
  )
}
