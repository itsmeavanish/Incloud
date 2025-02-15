import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Profile from "./Profile";
import { useAuth } from "../Context/useAuth";

export default function Header() {
  const { isAuthenticated, search } = useAuth();
  const [searchval, setSearch] = useState("");

  useEffect(
    function () {
      function update() {
        search(searchval);
      }
      update();
    },
    [searchval]
  );

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .header-container {
              flex-direction: column;
              align-items: center;
              padding: 0.8rem;
            }

            .search-input {
              width: 100%;
              margin-bottom: 0.8rem;
            }
          }

          @media (max-width: 480px) {
            .search-input {
              font-size: 0.9rem;
            }

            .auth-links {
              font-size: 0.85rem;
            }
          }
        `}
      </style>
      <div
        className="header-container"
        style={{
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #D9ECFB",
          padding: "1.1rem",
          margin: "1rem",
        }}
      >
        <input
          className="search-input"
          placeholder="Search for Your files"
          style={{
            border: "none",
            width: "50%",
            maxWidth: "500px",
            outline: "none",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "5px",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="auth-links" style={{ textAlign: "right" }}>
          {!isAuthenticated ? (
            <NavLink to="/login" style={{ textDecoration: "none", color: "#007BFF" }}>
              Sign In / Sign Up
            </NavLink>
          ) : (
            <Profile />
          )}
        </div>
      </div>
    </>
  );
}
