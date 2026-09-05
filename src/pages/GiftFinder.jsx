import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/giftfinder.css";

const GiftFinder = () => {

  const navigate = useNavigate();

  const [gifts, setGifts] = useState([]);

  useEffect(() => {

    axios
      .get("http://localhost:5000/giftProducts")
      .then((response) => {
        setGifts(response.data);
      })
      .catch((error) => {
        console.log("Error fetching gift products:", error);
      });

  }, []);

  return (

    <div className="gift-finder">

      <section className="gift-hero">

        <p>🎁 KIDDOWORLD GIFT FINDER</p>

        <h1>
          Find the Perfect
          <span> Gift</span>
        </h1>

        <h3>
          Magical gifts for every little smile ✨
        </h3>

      </section>


      <section className="gift-section">

        <h2>Gift Ideas for Kids</h2>

        <p className="gift-subtitle">
          Discover something special for your little ones.
        </p>


        <div className="gift-grid">

          {gifts.map((gift) => (

            <div
              className="gift-card"
              key={gift.id}
            >

              <div className="gift-image">

                <img
                  src={gift.image}
                  alt={gift.name}
                />

                <span>
                  🎁 Gift Pick
                </span>

              </div>


              <div className="gift-info">

                <h3>
                  {gift.name}
                </h3>

                <p className="gift-age">
                  👶 {gift.age}
                </p>

                <p className="gift-price">
                  ₹{gift.price}
                </p>


              <button
                type="button"
             onClick={() => navigate(`/GiftFinder/${gift.id}`)}
                  >
                   View Gift
                 </button>

              </div>

            </div>

          ))}

        </div>

      </section>

    </div>

  );
};

export default GiftFinder;