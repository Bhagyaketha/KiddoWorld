
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:5000/admins"
      );

      const admin = response.data.find(
        (item) =>
          item.email === email &&
          item.password === password
      );

      if (admin) {
        // Save admin login status
        localStorage.setItem(
          "adminLoggedIn",
          "true"
        );

        // Save admin details
        localStorage.setItem(
          "loggedInAdmin",
          JSON.stringify(admin)
        );

        alert("Admin logged in successfully! 🎉");

        // Go to Admin Dashboard
        navigate("/AdminDashboard");
      } else {
        alert("Invalid admin email or password ❌");
      }
    } catch (error) {
      console.log("Admin login error:", error);
      alert(
        "Unable to connect to the server. Make sure JSON Server is running."
      );
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-card">

        {/* LOGO */}

        <div className="admin-login-logo">
          <h1>KiddoWorld</h1>
          <p>Admin Panel</p>
        </div>


        {/* TITLE */}

        <div className="admin-login-heading">
          <h2>Welcome Back 👋</h2>

          <p>
            Login to manage your KiddoWorld store
          </p>
        </div>


        {/* LOGIN FORM */}

        <form onSubmit={handleLogin}>

          <div className="admin-input-group">

            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>


          <div className="admin-input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>


          <button
            type="submit"
            className="admin-login-button"
          >
            LOGIN AS ADMIN
          </button>

        </form>


        {/* BACK BUTTON */}

        <button
          className="admin-back-button"
          onClick={() => navigate("/")}
        >
          ← Back to KiddoWorld
        </button>

      </div>

    </div>
  );
};

export default AdminLogin;
