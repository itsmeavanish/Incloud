import { useState } from 'react';
import { Upload, Lock, Mail } from 'lucide-react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/useAuth';
 function Login() {
  const API_BASE_URL="https://incloud-backend.vercel.app/"
  const {login}=useAuth();
  const [data,setdata]=useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading,setloading]=useState(false);
  const [error, setError] = useState('');
  const navigate=useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true)
      const response = await axios.post(`${API_BASE_URL}api/auth/login`, formData);
      localStorage.setItem('token', response.data.token);
      console.log("response",response);
      login(formData)
      navigate('/');
      setdata(response);
      login();
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
    finally{
      setloading(false)
    }
  };
  return (
    <div className={styles.page}>
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
          <h2 className={styles.welcome}>Welcome Back!</h2>
          <p className={styles.instructions}>
          Sign in to access your media
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup} >
              <Mail className={styles.inputIcon} />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={ handleChange} className={styles.input} required></input>
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
              <div className={styles.forgotPassword}>
                <a href="#" className={styles.link}>
                  Forgot password?
                </a>
              </div>
     

            <button type="submit" className={styles.submitButton}>
              {loading ? "Signing in .....":"Sign In"}
            </button>
          </form>

          <p className={styles.footerText}>
          Don't have an account?
            <button
              onClick={()=>navigate("/register")}
              className={styles.toggleButton}
            >
              Sign Up
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

export default Login;
