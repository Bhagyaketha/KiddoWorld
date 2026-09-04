import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "../styles/giftDetails.css";

const GiftDetails = () => {

  const { id } = useParams();

  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const [gift, setGift] = useState(null);
  const [loading, setLoading] = useState(true);


  /* =========================
     FETCH GIFT
  ========================= */

  useEffect(() => {

    axios
      .get(
        `http://localhost:5000/giftProducts/${id}`
      )
      .then((response) => {

        setGift(response.data);

        setLoading(false);

      })
      .catch((error) => {

        console.log(
          "Error fetching gift:",
          error
        );

        setLoading(false);

      });

  }, [id]);


  /* =========================
     ADD TO BAG
  ========================= */

  const addToBag = () => {

    if (!gift) {
      return;
    }


    // Check login
    if (!currentUser) {

      alert("Please login first 🔐");

      navigate("/Login");

      return;
    }


    // Get user-specific cart
    const savedCart = localStorage.getItem(
      `cart_${currentUser.id}`
    );

    const cart = savedCart
      ? JSON.parse(savedCart)
      : [];


    // Check existing product
    const existingItem = cart.find(
      (item) =>
        String(item.id) === String(gift.id)
    );


    let updatedCart;


    if (existingItem) {

      // Increase quantity
      updatedCart = cart.map((item) =>
        String(item.id) === String(gift.id)
          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) + 1
            }
          : item
      );

      alert(
        `${gift.name} quantity increased 🛍️`
      );

    } else {

      // Add new gift
      updatedCart = [
        ...cart,
        {
          ...gift,
          quantity: 1
        }
      ];

      alert(
        `${gift.name} added to bag 🛒`
      );

    }


    // Save user-specific cart
    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );


    // Go to Cart
    navigate("/Cart");

  };


  /* =========================
     LOADING
  ========================= */

  if (loading) {

    return (

      <div className="gift-loading">

        <h2>
          Loading Gift... 🎁
        </h2>

      </div>

    );

  }


  /* =========================
     NOT FOUND
  ========================= */

  if (!gift) {

    return (

      <div className="gift-not-found">

        <h2>
          Gift Not Found 🎁
        </h2>

        <button
          onClick={() =>
            navigate("/GiftFinder")
          }
        >
          ← Back to Gift Finder
        </button>

      </div>

    );

  }


  /* =========================
     PAGE
  ========================= */

  return (

    <div className="gift-details-page">


      {/* BACK */}

      <button
        className="gift-back-btn"
        type="button"
        onClick={() =>
          navigate("/GiftFinder")
        }
      >
        ← Back to Gifts
      </button>


      {/* DETAILS CARD */}

      <div className="gift-details-card">


        {/* IMAGE */}

        <div className="gift-details-image">

          <img
            src={gift.image}
            alt={gift.name}
          />

        </div>


        {/* INFORMATION */}

        <div className="gift-details-info">

          <p className="gift-details-label">
            🎁 KIDDOWORLD GIFT PICK
          </p>


          <h1>
            {gift.name}
          </h1>


          <p className="gift-details-age">
            👶 Suitable for {gift.age}
          </p>


          <h2>
            ₹{gift.price}
          </h2>


          <p className="gift-details-description">
            {gift.description ||
              "A wonderful gift for every little one."}
          </p>


          {/* ADD TO BAG */}

          <button
            type="button"
            className="gift-add-btn"
            onClick={addToBag}
          >
            🛒 Add to Bag
          </button>


        </div>

      </div>

    </div>

  );

};

export default GiftDetails;