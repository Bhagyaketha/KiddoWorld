
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/userSlice";
import "../styles/register.css";

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();


  const handleRegister = async (e) => {

    e.preventDefault();

    // Check password
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }


    try {

      // Check whether email already exists
      const response = await axios.get(
        "https://kiddoworld-server.onrender.com/users"
      );

      const users = response.data;

      const existingUser = users.find(
        (user) => user.email === email
      );


      if (existingUser) {

        setMessage(
          "Account already exists. Please login."
        );

        return;
      }


      // Create new user
      const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password
      };


      // Save user to db.json
      const postResponse = await axios.post(
        "https://kiddoworld-server.onrender.com/users",
        newUser
      );


      // Get the newly created user
      const createdUser = postResponse.data;


      // -------------------------------
      // REDUX: Store registered user
      // -------------------------------
      dispatch(loginUser(createdUser));


      // Also keep login information in localStorage for now
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(createdUser)
      );


      setMessage(
        "Registration successful! 🎉"
      );


      // Go to Home page
      setTimeout(() => {
        navigate("/Home");
      }, 1500);


    } catch (error) {

      console.log(error);

      setMessage(
        "Registration failed. Please try again."
      );

    }
  };


  return (

    <div className="register-page">

      <div className="register-box">

        <h2>Create Account 🧸</h2>

        <p>
          Join KiddoWorld today!
        </p>


        <form onSubmit={handleRegister}>

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />


          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />


          <input
            type="tel"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />


          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />


          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            required
          />


          <button type="submit">
            Register
          </button>

        </form>


        {message && (
          <p className="register-message">
            {message}
          </p>
        )}


        <p>
          Already have an account?{" "}

          <Link to="/Login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;

