
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import "../styles/login.css";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      // Get users from db.json
      const response = await axios.get(
        "http://localhost:5001/users"
      );

      const users = response.data;

      // Find user using email
      const user = users.find(
        (user) => user.email === email
      );

      // Account not found
      if (!user) {

        setMessage(
          "Account not found. Please register first."
        );

        return;
      }

      // Incorrect password
      if (user.password !== password) {

        setMessage(
          "Incorrect password. Please try again."
        );

        return;
      }

      // -------------------------------
      // REDUX: Store logged-in user
      // -------------------------------
      dispatch(loginUser(user));

      // Keep this for now
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );

      setMessage("Login successful!");

      // Navigate to Home
      setTimeout(() => {
        navigate("/Home");
      }, 800);

    } catch (error) {

      console.log(error);

      setMessage(
        "Unable to connect to server."
      );
    }
  };


  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-image"></div>

        {/* LOGIN */}

        <div className="login-content">

          <span className="login-label">
            KIDDOWORLD
          </span>

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Sign in to continue your journey.
          </p>


          <form onSubmit={handleLogin}>

            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

            </div>


            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>


            <button
              type="submit"
              className="login-btn"
            >
              Sign In
              <span>→</span>
            </button>

          </form>


          {message && (
            <p className="login-message">
              {message}
            </p>
          )}


          <div className="register-text">

            Don't have an account?

            <Link to="/Register">
              Register
            </Link>

          </div>

        </div>

      </div>

    </div>

  );
};

export default Login;

