import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/shop.css";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://kiddoworld-server.onrender.com/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.log("Category error:", error);
      });
  }, []);

  const openCategory = (path) => {
    navigate(path);
  };

  return (
    <div className="shop-page">

      {/* ================= HERO ================= */}

      <section className="shop-hero">

        <div className="shop-hero-content">

          <span className="shop-small-title">
            WELCOME TO KIDDOWORLD
          </span>

          <h1>
            Everything Little
            <br />
            <em>Hearts Love</em>
          </h1>

          <p>
            Explore our playful collection of toys, clothes,
            books, creative supplies and outdoor fun.
          </p>

          <button
            onClick={() =>
              document
                .getElementById("shop-categories")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            Explore Collection ✨
          </button>

        </div>


        <div className="shop-hero-art">

          <div className="hero-circle">
            🧸
          </div>

          <div className="floating-star star-one">
            ✦
          </div>

          <div className="floating-star star-two">
            ✧
          </div>

          <div className="floating-heart">
            ♡
          </div>

        </div>

      </section>


      {/* ================= CATEGORY SECTION ================= */}

      <section
        className="shop-categories"
        id="shop-categories"
      >

        <div className="shop-section-title">

          <span>
            SHOP BY CATEGORY
          </span>

          <h2>
            Pick Your Little Favorite
          </h2>

          <p>
            Something fun for every little personality.
          </p>

        </div>


        <div className="category-grid">

          {categories.map((category) => (

            <div
              className={`category-card ${category.className}`}
              key={category.id}
              onClick={() =>
                openCategory(category.path)
              }
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <div className="category-content">

                <span>
                  {category.tagline}
                </span>

                <h3>
                  {category.name}
                </h3>

                <p>
                  {category.description}
                </p>

                <button>
                  Explore →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= BOTTOM BANNER ================= */}

      <section className="shop-banner">

        <div>

          <span>
            MADE FOR LITTLE DREAMERS
          </span>

          <h2>
            Let Their Imagination
            <br />
            Run Wild ✨
          </h2>

          <p>
            Discover products that make learning,
            playing and growing more magical.
          </p>

        </div>


        <div className="shop-banner-art">
          🌈
        </div>

      </section>

    </div>
  );
};

export default Shop;