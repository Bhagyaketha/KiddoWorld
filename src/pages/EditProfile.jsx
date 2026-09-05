import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/editprofile.css";

const EditProfile = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {

    const loggedInUser =
      JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      navigate("/Login");
      return;
    }

    axios
      .get(`http://localhost:5001/users/${loggedInUser.id}`)
      .then((response) => {

        setUser(response.data);

        setName(response.data.name || "");
        setEmail(response.data.email || "");
        setPhone(response.data.phone || "");

      })
      .catch((error) => {
        console.log(error);
      });

  }, [navigate]);


  const handleUpdate = async (e) => {

    e.preventDefault();

    try {

      const updatedUser = {
        ...user,
        name: name,
        email: email,
        phone: phone
      };

      const response = await axios.put(
        `http://localhost:5001/users/${user.id}`,
        updatedUser
      );

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data)
      );

      alert("Profile updated successfully! 💕");

      navigate("/Profile");

    } catch (error) {

      console.log(error);

      alert("Unable to update profile.");

    }

  };


  if (!user) {
    return (
      <div className="edit-profile-loading">
        Loading...
      </div>
    );
  }


  return (

    <div className="edit-profile-page">

      <div className="edit-profile-card">

        <div className="edit-profile-header">

          <div className="edit-avatar">
            {name
              ? name.charAt(0).toUpperCase()
              : "U"}
          </div>

          <div>
            <span>KIDDOWORLD</span>

            <h1>Edit Profile</h1>

            <p>
              Update your personal information
            </p>
          </div>

        </div>


        <form onSubmit={handleUpdate}>

          <div className="edit-input">

            <label>Full Name</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

          </div>


          <div className="edit-input">

            <label>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          <div className="edit-input">

            <label>Phone Number</label>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

          </div>


          <div className="edit-buttons">

            <button
              type="submit"
              className="save-profile-btn"
            >
              Save Changes
            </button>

            <button
              type="button"
              className="cancel-profile-btn"
              onClick={() => navigate("/Profile")}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>

  );
};

export default EditProfile;