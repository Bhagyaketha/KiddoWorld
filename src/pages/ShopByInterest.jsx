import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/shopbyinterest.css";

const ShopByInterest = () => {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/interests")
      .then((response) => response.json())
      .then((data) => {
        setInterests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching interests:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="interest-loading">Loading interests...</div>;
  }

  return (
    <div className="interest-page">

      {/* HERO SECTION */}
      <section className="interest-hero">

        <div className="interest-hero-content">
          <span className="interest-label">
            DISCOVER WHAT THEY LOVE
          </span>

          <h1>
            Shop By <span>Interest</span>
          </h1>

          <p>
            From little artists to future scientists, discover products
            selected around every child's unique interests and imagination.
          </p>

          <Link to="/Shop" className="hero-shop-btn">
            Explore Everything →
          </Link>
        </div>

        <div className="interest-hero-art">
          <div className="floating-item item-one">🎨</div>
          <div className="floating-item item-two">🚀</div>
          <div className="floating-item item-three">📚</div>
          <div className="floating-item item-four">🧸</div>
        </div>

      </section>


      {/* INTEREST SECTION */}
      <section className="interest-section">

        <div className="interest-heading">
          <span>FIND THEIR FAVORITES</span>

          <h2>
            What Are They Into?
          </h2>

          <p>
            Pick an interest and find something they'll love.
          </p>
        </div>


        {/* INTEREST GRID */}
        <div className="interest-grid">

          {interests.map((interest) => (

            <div
              className="interest-card"
              key={interest.id}
            >

              <div className="interest-image">
                <img
                  src={interest.image}
                  alt={interest.title}
                />

                <div className="interest-icon">
                  {interest.icon}
                </div>
              </div>

              <div className="interest-info">

                <h3>{interest.title}</h3>

                <p>
                  {interest.description}
                </p>

                <Link
  to={
    interest.title === "Arts & Crafts"
      ? "/ArtsCrafts"
      : interest.title === "Fashion & Style"
      ? "/Clothing"
      : interest.title === "Reading"
      ? "/Books"
      : interest.title === "Sports"
      ? "/Sports"
      : interest.title === "School-Supplies"
      ? "/SchoolSupplies"
      : interest.title === "Dolls & Pretend Play"
      ? "/Toys"
      : "/Shop"
  }
  className="interest-link"
>
  Explore →
</Link>
              </div>

            </div>

          ))}

        </div>

      </section>


      {/* BOTTOM CTA */}
      <section className="interest-cta">

        <div className="cta-content">

          <span>CAN'T DECIDE?</span>

          <h2>
            Find a gift they'll absolutely love.
          </h2>

          <p>
            Tell us a little about them and we'll help you discover
            something special.
          </p>

          <Link
            to="/GiftFinder"
            className="gift-finder-btn"
          >
            Find Their Perfect Gift 🎁
          </Link>

        </div>

      </section>

    </div>
  );
};

export default ShopByInterest;