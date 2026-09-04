
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";
import axios from "axios";
import "../styles/profile.css";

const Profile = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Get logged-in user from Redux
  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  // Redux dispatch
  const dispatch = useDispatch();


  useEffect(() => {

    const getProfile = async () => {

      try {

        // Check Redux for logged-in user
        if (!currentUser) {
          navigate("/Login");
          return;
        }

        // Get latest user data from db.json
        const response = await axios.get(
          `http://localhost:5000/users/${currentUser.id}`
        );

        setUser(response.data);

      } catch (error) {

        console.log(error);

        setUser(null);

      } finally {

        setLoading(false);

      }
    };

    getProfile();

  }, [currentUser, navigate]);


  // Logout
  const handleLogout = () => {

    // Clear Redux user
    dispatch(logoutUser());

    // Clear localStorage for now
    navigate("/Login");

    // Go to Login
    navigate("/Login");

  };


  if (loading) {
    return (
      <div className="profile-page">

        <div className="loading">
          Loading profile...
        </div>

      </div>
    );
  }


  if (!user) {
    return (
      <div className="profile-page">

        <div className="no-profile">

          <h2>Profile Not Found</h2>

          <p>
            Please login to view your profile.
          </p>

          <button
            onClick={() => navigate("/Login")}
          >
            Go to Login
          </button>

        </div>

      </div>
    );
  }


  return (

    <div className="profile-page">

      <div className="profile-card">

        {/* PROFILE HEADER */}

        <div className="profile-header">

          <div className="profile-avatar">

            {user.name
              ? user.name.charAt(0).toUpperCase()
              : "U"}

          </div>

          <div className="profile-heading">

            <span>KIDDOWORLD</span>

            <h1>
              My Profile
            </h1>

            <p>
              Welcome back, {user.name}!
            </p>

          </div>

        </div>


        {/* USER DETAILS */}

        <div className="profile-details">

          <div className="detail-item">

            <label>Full Name</label>

            <p>
              {user.name}
            </p>

          </div>


          <div className="detail-item">

            <label>Email Address</label>

            <p>
              {user.email}
            </p>

          </div>


          <div className="detail-item">

            <label>Phone Number</label>

            <p>
              {user.phone || "Not provided"}
            </p>

          </div>


          <div className="detail-item">

            <label>Account Status</label>

            <p className="status">
              Active
            </p>

          </div>

        </div>


        {/* PROFILE ACTIONS */}

        <div className="profile-actions">

          <button
            className="edit-btn"
            onClick={() => navigate("/EditProfile")}
          >
            Edit Profile
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>


        {/* QUICK LINKS */}

        <div className="profile-links">

          <div
            onClick={() => navigate("/Wishlist")}
          >
            <span>♡</span>
            <p>Wishlist</p>
          </div>


          <div
            onClick={() => navigate("/MyOrders")}
          >
            <span>◷</span>
            <p>My Orders</p>
          </div>


          <div
            onClick={() => navigate("/Cart")}
          >
            <span>🛍</span>
            <p>My Bag</p>
          </div>

        </div>

      </div>

    </div>

  );
};

export default Profile;

