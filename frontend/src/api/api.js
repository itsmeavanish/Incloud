import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api/auth",
  withCredentials: true, // Allow cookies to be sent
});



// Add Authorization header if needed
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Authentication and User Management API endpoints
export const registerUser = (data) => API.post("/register", data); // User registration
export const loginUser = (data) => API.post("/login", data); // User login
export const getCurrentUser = () => API.get("/profile"); // Fetch current user profile
export const logoutUser = () => API.post("/logout"); // Logout user
// User profile and management

export const updateUserProfile = (data) => API.put("/profile", data); // Update current user profile

// Admin-related actions
export const getAllUsers = () => API.get("/register"); // Get all users
export const getUserById = (id) => API.get(`/${id}`); // Get user by ID
export const updateUserById = (id, data) => API.put(`/${id}`, data); // Update user by ID
export const deleteUserById = (id) => API.delete(`/${id}`); // Delete user by ID
