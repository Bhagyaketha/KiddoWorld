import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/trending.css";

const Trending = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

    axios
      .get("https://kiddoworld-server.onrender.com/homeProducts")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.log("Error loading trending products:", error);
      });

  }, []);

  return (

    <div className="trending-page">

      <section className="trending-hero">

        <p>✦ KIDDOWORLD TRENDING ✦</p>

        <h1>
          What's <span>Trending?</span>
        </h1>

        <h3>
          Discover the favorites little explorers love right now ✨
        </h3>

      </section>


      <section className="trending-products">

        <p className="trending-small-title">
          ✦ LITTLE FAVORITES ✦
        </p>

        <h2>
          Trending Picks
        </h2>

        <p className="trending-subtitle">
          Explore our most loved products.
        </p>


        <div className="trending-grid">

          {products.map((product) => (

            <div
              className="trending-card"
              key={product.id}
            >

              <div className="trending-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <span>
                  ⭐ Trending
                </span>

              </div>


              <div className="trending-info">

                <p>
                  {product.category}
                </p>

                <h3>
                  {product.name}
                </h3>

                <strong>
                  ₹{product.price}
                </strong>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>

  );
};

export default Trending;