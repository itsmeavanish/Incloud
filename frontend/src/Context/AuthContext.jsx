import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const Authcontext = createContext();

const getToken = () => localStorage.getItem("token");

const initialState = {
  user: null,
  isAuthenticated: !!getToken(),
  loading: true,
  error: null,
  value: "",
  trashData: JSON.parse(localStorage.getItem("trashData")) || [], // Load trashData from localStorage
  favoriteData: JSON.parse(localStorage.getItem("favoriteData")) || [], // Load favoriteData from localStorage
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, loading: false, error: null };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "loading":
      return { ...state, loading: action.payload ?? true, error: null };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "setUser":
      return { ...state, user: action.payload, isAuthenticated: true, loading: false, error: null };
    case "search":
      return { ...state, value: action.payload };
    case "trashvalue":
      return { ...state, trashData: action.payload };
    case "favoritevalue":
      return { ...state, favoriteData: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

export default function AuthProvider({ children }) {
  const API_BASE_URL = "https://incloud-backend.vercel.app/";

  const [{ user, isAuthenticated, loading, error, value, trashData, favoriteData }, dispatch] = useReducer(reducer, initialState);

  const fetchUserProfile = async () => {
    try {
      dispatch({ type: "loading" });
      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(`${API_BASE_URL}api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch({ type: "setUser", payload: response.data });
    } catch (err) {
      console.error("Error fetching user profile:", err);
      dispatch({ type: "error", payload: err.response?.data?.error || "Failed to fetch user profile" });
    }
  };

  // Save trashData and favoriteData to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("trashData", JSON.stringify(trashData));
  }, [trashData]);

  useEffect(() => {
    localStorage.setItem("favoriteData", JSON.stringify(favoriteData));
  }, [favoriteData]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      dispatch({ type: "loading", payload: false });
    }
  }, [isAuthenticated]);

  const login = () => dispatch({ type: "login" });
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("trashData"); // Clear trashData on logout
    localStorage.removeItem("favoriteData"); // Clear favoriteData on logout
    dispatch({ type: "logout" });
  };
  const search = (value) => dispatch({ type: "search", payload: value });
  const trash = (value) =>
    dispatch({ type: "trashvalue", payload: [...trashData, value] });
  const favorite = (value) =>
    dispatch({ type: "favoritevalue", payload: [...favoriteData, value] });

  return (
    <Authcontext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        value,
        trashData,
        favoriteData,
        login,
        logout,
        search,
        trash,
        favorite,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export { Authcontext };
