import Sidebar from "./Sidebar";
import styles from "./AppLayout.module.css"
import { Outlet } from "react-router-dom";
import Header from "./Header";
export default function AppLayout() {
  return (
    <div className={styles.homepage}>
         <Sidebar />
         
         <div className={styles.main} >
         <Header />
         <Outlet />
         </div>
    </div>
  )
}
