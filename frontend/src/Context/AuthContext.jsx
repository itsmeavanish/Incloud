import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

export const Authcontext = createContext();

const getToken = () => localStorage.getItem("token");

const initialState = {
  user: null,
  isAuthenticated: !!getToken(),
  loading: true,
  error: null,
  value: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, loading: false, error: null };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, loading: false };
    case "loading":
      return { ...state, loading: true, error: null };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "setUser":
      return { ...state, user: action.payload, isAuthenticated: true, loading: false, error: null };
    case "search":
      return { ...state, value: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

export function AuthProvider({ children }) {
    const API_BASE_URL="https://incloud-backend.vercel.app/"
  const [{ user, isAuthenticated, loading, error, value }, dispatch] = useReducer(reducer, initialState);

  const fetchUserProfile = async () => {
    try {
      dispatch({ type: "loading" });
      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(`${API_BASE_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch({ type: "setUser", payload: response.data });
    } catch (err) {
      dispatch({ type: "error", payload: err.response?.data?.error || "Failed to fetch user profile" });
    }
  };

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
    dispatch({ type: "logout" });
  };
  const search = (value) => dispatch({ type: "search", payload: value });

  return (
    <Authcontext.Provider value={{ user, isAuthenticated, loading, error, value, login, logout, search }}>
      {children}
    </Authcontext.Provider>
  );
}
