import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/home.css";

const Home = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5001/homeProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error loading home products:", error);
      });

  }, []);


  return (

    <div className="home-page">

      {/* =====================================
          HERO SECTION
      ====================================== */}

      <section className="home-hero">

        <div className="home-hero-content">

          <p className="home-small-title">
            ✦ WELCOME TO KIDDOWORLD ✦
          </p>

          <h1>
            Little Things,
            <br />
            <span>Big Happiness!</span>
          </h1>

          <p className="home-hero-text">
            Discover a magical world of toys, books,
            clothing, crafts, school supplies and
            outdoor adventures made especially for
            little explorers.
          </p>

          <div className="home-hero-buttons">

            <Link
              to="/Shop"
              className="home-shop-btn"
            >
              Explore Collection 🛍️
            </Link>

            <Link
              to="/ShopByAge"
              className="home-age-btn"
            >
              Shop By Age →
            </Link>

          </div>

        </div>


        <div className="home-hero-visual">

          <div className="home-main-circle">
            🧸
          </div>

          <div className="home-floating home-ball">
            ⚽
          </div>

          <div className="home-floating home-book">
            📚
          </div>

          <div className="home-floating home-paint">
            🎨
          </div>

          <div className="home-floating home-star">
            ⭐
          </div>

        </div>

      </section>


      {/* =====================================
          TRUST FEATURES
      ====================================== */}

      <section className="home-features">

        <div className="home-feature-card">

          <span>🚚</span>

          <div>
            <h3>Free Delivery</h3>
            <p>On selected orders</p>
          </div>

        </div>


        <div className="home-feature-card">

          <span>🛡️</span>

          <div>
            <h3>Kid Friendly</h3>
            <p>Carefully selected products</p>
          </div>

        </div>


        <div className="home-feature-card">

          <span>💝</span>

          <div>
            <h3>Made With Love</h3>
            <p>For little happy moments</p>
          </div>

        </div>


        <div className="home-feature-card">

          <span>🔄</span>

          <div>
            <h3>Easy Returns</h3>
            <p>Simple & stress-free</p>
          </div>

        </div>

      </section>


      {/* =====================================
          SHOP BY CATEGORY
      ====================================== */}

      <section className="home-categories">

        <div className="home-section-title">

          <p>
            EXPLORE OUR WORLD
          </p>

          <h2>
            Shop By Category
          </h2>

          <span>
            Everything little ones love, all in one place.
          </span>

        </div>


        <div className="home-category-grid">


          <Link
            to="/Toys"
            className="home-category-card toys-card"
          >

            <div className="category-icon">
              🧸
            </div>

            <h3>Toys</h3>

            <p>
              Fun & playful
            </p>

            <span>
              Explore →
            </span>

          </Link>


          <Link
            to="/Clothing"
            className="home-category-card clothing-card"
          >

            <div className="category-icon">
              👕
            </div>

            <h3>Clothing</h3>

            <p>
              Cute little styles
            </p>

            <span>
              Explore →
            </span>

          </Link>


          <Link
            to="/Books"
            className="home-category-card books-card"
          >

            <div className="category-icon">
              📚
            </div>

            <h3>Books</h3>

            <p>
              Stories & learning
            </p>

            <span>
              Explore →
            </span>

          </Link>


          <Link
            to="/SchoolSupplies"
            className="home-category-card school-card"
          >

            <div className="category-icon">
              ✏️
            </div>

            <h3>School Supplies</h3>

            <p>
              Ready to learn
            </p>

            <span>
              Explore →
            </span>

          </Link>


          <Link
            to="/ArtsCrafts"
            className="home-category-card craft-card"
          >

            <div className="category-icon">
              🎨
            </div>

            <h3>Arts & Crafts</h3>

            <p>
              Create & imagine
            </p>

            <span>
              Explore →
            </span>

          </Link>


          <Link
            to="/Sports"
            className="home-category-card sports-card"
          >

            <div className="category-icon">
              ⚽
            </div>

            <h3>Sports & Outdoor</h3>

            <p>
              Run & play
            </p>

            <span>
              Explore →
            </span>

          </Link>

        </div>

      </section>


      {/* =====================================
          TRENDING BANNER
      ====================================== */}

      <section className="home-banner">

        <div className="home-banner-content">

          <p>
            ✦ LITTLE EXPLORERS ✦
          </p>

          <h2>
            Play.
            Create.
            <span>Imagine.</span>
          </h2>

          <p>
            Make every childhood moment a little more magical.
          </p>

          <Link
            to="/Trending"
            className="home-banner-btn"
          >
            See What's Trending →
          </Link>

        </div>


        <div className="home-banner-art">
          🌈
        </div>

      </section>


      {/* =====================================
          POPULAR PRODUCTS
      ====================================== */}

      <section className="home-products">

        <div className="home-section-title">

          <p>
            OUR LITTLE FAVORITES
          </p>

          <h2>
            Popular Picks
          </h2>

          <span>
            Loved by little ones and their families.
          </span>

        </div>


        <div className="home-product-grid">

          {products.slice(0, 4).map((product) => (

            <div
              className="home-product-card"
              key={product.id}
            >

              <div className="home-product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <span>
                  ⭐ {product.rating}
                </span>

              </div>


              <div className="home-product-info">

                <p>
                  {product.category}
                </p>

                <h3>
                  {product.name}
                </h3>

                <div className="home-product-bottom">

                  <strong>
                    ₹{product.price}
                  </strong>

                  <Link
                    to="/Shop"
                  >
                    View →
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>


        <div className="home-view-all">

          <Link to="/Shop">
            View All Products →
          </Link>

        </div>

      </section>


      {/* =====================================
          SHOP BY AGE
      ====================================== */}

      <section className="home-age-section">

        <div className="home-section-title">

          <p>
            FIND THE PERFECT PICK
          </p>

          <h2>
            Shop By Age
          </h2>

          <span>
            Products designed for every little stage.
          </span>

        </div>


        <div className="home-age-grid">

          <Link
            to="/ShopByAge"
            className="home-age-card"
          >

            <span>🌱</span>

            <h3>
              0 – 2 Years
            </h3>

            <p>
              Tiny Explorers
            </p>

          </Link>


          <Link
            to="/ShopByAge"
            className="home-age-card"
          >

            <span>🧸</span>

            <h3>
              3 – 5 Years
            </h3>

            <p>
              Little Learners
            </p>

          </Link>


          <Link
            to="/ShopByAge"
            className="home-age-card"
          >

            <span>🎨</span>

            <h3>
              6 – 8 Years
            </h3>

            <p>
              Creative Kids
            </p>

          </Link>


          <Link
            to="/ShopByAge"
            className="home-age-card"
          >

            <span>🚀</span>

            <h3>
              9 – 12 Years
            </h3>

            <p>
              Big Adventurers
            </p>

          </Link>

        </div>

      </section>


      {/* =====================================
          GIFT FINDER
      ====================================== */}

      <section className="home-gift">

        <div className="home-gift-icon">
          🎁
        </div>

        <div className="home-gift-content">

          <p>
            NEED A LITTLE HELP?
          </p>

          <h2>
            Find the Perfect Gift
          </h2>

          <span>
            Tell us what you're looking for and
            we'll help you find something special.
          </span>

        </div>

        <Link
          to="/GiftFinder"
          className="home-gift-btn"
        >
          Find a Gift →
        </Link>

      </section>


      {/* =====================================
          FINAL CTA
      ====================================== */}

      <section className="home-final">

        <div>

          <p>
            ✦ WELCOME TO THE MAGIC ✦
          </p>

          <h2>
            Childhood is an adventure.
          </h2>

          <span>
            Let's make every moment count. 💕
          </span>

        </div>

        <Link
          to="/Shop"
          className="home-final-btn"
        >
          Start Exploring
        </Link>

      </section>

    </div>

  );
};

export default Home;