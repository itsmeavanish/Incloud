import React, { useState } from "react";
import { Upload, Lock, Mail, User, Camera } from "lucide-react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../Stylings/Spinner";
import { useAuth } from "../Context/useAuth";

export default function Register() {
    const API_BASE_URL="https://incloud-backend.vercel.app/"
  const {login}=useAuth();
  const [loading,setloading]=useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePhoto: null, // Changed to null for handling file uploads properly
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0], // File object
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Use FormData for file upload
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("profilePhoto", formData.profilePhoto);

    try {
      const response = await axios.post(
        `${API_BASE_URL}api/auth/register`,
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      localStorage.setItem("token", response.data.token);
      console.log("response", response);
      login(formData);
      setloading(true);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
    finally{
      setloading(false)
    }
  };

  return (

    <div className={styles.page}>
      {loading ?<Spinner />:""}
      <div className={styles.container}>
        <div className={styles.card}>
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.logo}>
              <Upload className={styles.icon} />
            </div>
            <h1 className={styles.title}>MediaVault</h1>
            <p className={styles.subtitle}>Your secure media storage solution</p>
          </div>

          {/* Form Section */}
          <div className={styles.formSection}>
            <h2 className={styles.welcome}>Create Account</h2>
            <p className={styles.instructions}>
              Sign up to create your free account
            </p>

            {error && <p className={styles.error}>{error}</p>} {/* Display error message */}

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <Mail className={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <User className={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Username"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputGroup}>
                <Lock className={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.inputgroup}>
                <label htmlFor="file-input" className={styles.profilebox}>
                  <Camera className={styles.inputIcon} />
                  <span className={styles.inputText}>
                    Upload Your Profile Photo
                  </span>
                </label>
                <input
                  id="file-input"
                  type="file"
                  name="profilePhoto"
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>

              <button type="submit" className={styles.submitButton}>
                Sign Up
              </button>
            </form>

            <p className={styles.footerText}>
              Already have an account?
              <button
                onClick={() => navigate("/login")}
                className={styles.toggleButton}
              >
                Sign In
              </button>
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Upload className={styles.smallIcon} />
            </div>
            <p>Fast Upload</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Lock className={styles.smallIcon} />
            </div>
            <p>Secure Storage</p>
          </div>
          <div className={styles.featureItem}>
            <div className={styles.featureIcon}>
              <Mail className={styles.smallIcon} />
            </div>
            <p>Easy Sharing</p>
          </div>
        </div>
      </div>
    </div>
  );
}
