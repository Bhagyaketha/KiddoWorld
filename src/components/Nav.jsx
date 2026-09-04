
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/navbar.css";

const Nav = () => {

  const [shopOpen, setShopOpen] = useState(false);

  // Get current user from Redux
  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  return (

    <nav className="navbar">

      <h1 className="kiddo-logo">

        <span className="red">K</span>
        <span className="green">i</span>
        <span className="orange">d</span>
        <span className="pink">d</span>
        <span className="blue">o</span>
        <span className="brown">W</span>
        <span className="blue">o</span>
        <span className="red">r</span>
        <span className="orange">l</span>
        <span className="green">d</span>

      </h1>


      <div className="nav-links">

        <Link to="/Home">
          Home
        </Link>


        <div className="shop-dropdown">

          <button
            className="shop-button"
            onClick={() => setShopOpen(!shopOpen)}
          >
            Shop {shopOpen ? "▴" : "▾"}
          </button>


          {shopOpen && (

            <div className="dropdown-menu">

              <Link to="/Toys">
                🧸 Toys
              </Link>

              <Link to="/Clothing">
                👕 Clothing
              </Link>

              <Link to="/Books">
                📚 Books
              </Link>

              <Link to="/SchoolSupplies">
                ✏️ School Supplie
              </Link>

              <Link to="/ArtsCrafts">
                🎨 Arts & Crafts
              </Link>

              <Link to="/Sports">
                ⚽ Sports & Outdoor
              </Link>

            </div>

          )}

        </div>


        <Link to="/ShopByAge">
          Shop by Age
        </Link>

        <Link to="/ShopByInterest">
          Interests
        </Link>

        <Link to="/GiftFinder">
          Gift Finder
        </Link>

        <Link to="/Deals">
          Deals
        </Link>

        <Link to="/AIStoryMaker">
          ✨ AI Story Maker
        </Link>

      </div>


      <div className="nav-actions">

        <Link
          to="/Wishlist"
          className="nav-icon"
        >
          ❤️
        </Link>


        <Link
          to="/Cart"
          className="nav-icon"
        >
          🛒
        </Link>


        <Link
          to="/Profile"
          className="nav-icon"
        >
          👤
        </Link>


        {/* Show username if logged in */}
        {currentUser ? (

          <Link to="/Profile">
            Hi, {currentUser.name}
          </Link>

        ) : (

          <Link to="/Login">
            Login
          </Link>

        )}

      </div>

    </nav>

  );
};

export default Nav;
