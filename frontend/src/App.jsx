import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Storage from "./Pages/Storage";
import Login from "./Pages/Login";
import Trash from "./Pages/Trash";
import SharedLinks from "./Pages/SharedLinks";
import Favorites from "./Pages/Favorites";
import Recents from "./Pages/Recents";
import Media from "./Pages/Media";
import Register from "./Pages/Register";
import { AuthProvider } from "./Context/AuthContext";
import { Suspense } from "react";
import Spinner from "./Stylings/Spinner";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <AuthProvider>   
        <BrowserRouter>
        <Suspense fallback={<Spinner />}>
        <Routes>
          <Route element={<AppLayout />}>
          <Route path="/" index element={<Navigate to ="/storage" />} />
          <Route path="/storage"element={<Storage />} />
          <Route path="/media" element={<Media />} />
          <Route path="/recents" element={<Recents />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/sharedlinks" element={<SharedLinks />} />
          <Route path="/trash" element={<Trash />} />
          </Route>
          {/* Public routes */}
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer position="top-center" gutter={12}
    containerStyle={{margin:"8px"}}
    toastOptions={{
      success:{
        duration:3000,

      },
      error:{
        duration:5000,
      },
      style:{
        fontSize:"16px",
        maxWidth:"500px",
        padding:" 16px 24px",
        backgroundColor:"white",
        color:"RichBlack"
      }
    }}
    />
      </AuthProvider>
  );
}

export default App;
