import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/deals.css";

const Deals = () => {

  const [deals, setDeals] = useState([]);

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();


  /* =========================
     FETCH DEALS
  ========================= */

  useEffect(() => {

    fetch("https://kiddoworld-server.onrender.com/deals")
      .then((res) => res.json())
      .then((data) => setDeals(data))
      .catch((err) => console.log(err));

  }, []);


  /* =========================
     ADD TO BAG
  ========================= */

  const addToBag = (product) => {

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


    // Check if product already exists
    const existingProduct = cart.find(
      (item) =>
        String(item.id) === String(product.id)
    );


    let updatedCart;


    if (existingProduct) {

      // Increase quantity
      updatedCart = cart.map((item) =>
        String(item.id) === String(product.id)
          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) + 1
            }
          : item
      );

      alert(
        `${product.name} quantity increased 🛍️`
      );

    } else {

      // Add new product
      const newCartItem = {
        ...product,

        // Use sale price in cart
        price: Number(product.salePrice),

        quantity: 1
      };

      updatedCart = [
        ...cart,
        newCartItem
      ];

      alert(
        `${product.name} added to Bag 🛍️`
      );

    }


    // Save user-specific cart
    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );

  };


  /* =========================
     RENDER
  ========================= */

  return (

    <div className="deals-page">


      {/* HERO */}

      <section className="deals-hero">

        <div className="deals-hero-content">

          <span className="small-title">
            KIDDO WORLD SPECIAL
          </span>

          <h1>
            Little Deals,
            <br />
            <em>Big Smiles!</em>
          </h1>

          <p>
            Discover amazing deals on toys, clothes, books
            and more at happy prices.
          </p>

          <a
            href="#deal-products"
            className="shop-deals-btn"
          >
            Shop Deals ✨
          </a>

        </div>


        <div className="deal-hero-circle">

          <span>SALE</span>

          <strong>UP TO</strong>

          <b>50%</b>

          <small>OFF</small>

        </div>

      </section>


      {/* HIGHLIGHTS */}

      <section className="deal-highlights">

        <div className="deal-highlight-card pink">

          <span>🧸</span>

          <div>
            <h3>Toy Time</h3>
            <p>Up to 40% OFF</p>
          </div>

        </div>


        <div className="deal-highlight-card green">

          <span>👗</span>

          <div>
            <h3>Little Fashion</h3>
            <p>Up to 30% OFF</p>
          </div>

        </div>


        <div className="deal-highlight-card yellow">

          <span>📚</span>

          <div>
            <h3>Book Corner</h3>
            <p>Up to 25% OFF</p>
          </div>

        </div>


        <div className="deal-highlight-card purple">

          <span>🎁</span>

          <div>
            <h3>Gift Picks</h3>
            <p>Special Prices</p>
          </div>

        </div>

      </section>


      {/* PRODUCTS */}

      <section
        className="deals-products-section"
        id="deal-products"
      >

        <div className="deals-heading">

          <span>DON'T MISS OUT</span>

          <h2>Today's Best Deals</h2>

          <p>
            Grab them before they're gone!
          </p>

        </div>


        <div className="deals-grid">

          {deals.map((product) => {

            const discount = Math.round(
              (
                (
                  Number(product.originalPrice) -
                  Number(product.salePrice)
                ) /
                Number(product.originalPrice)
              ) * 100
            );


            return (

              <div
                className="deal-product-card"
                key={product.id}
              >


                <div className="deal-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <span className="discount-badge">
                    -{discount}%
                  </span>

                </div>


                <div className="deal-info">

                  <span className="deal-category">
                    {product.category}
                  </span>

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.description}
                  </p>


                  <div className="price-row">

                    <strong>
                      ₹{product.salePrice}
                    </strong>

                    <del>
                      ₹{product.originalPrice}
                    </del>

                  </div>


                  <button
                    type="button"
                    className="deal-bag-btn"
                    onClick={() =>
                      addToBag(product)
                    }
                  >
                    Add to Bag 🛍️
                  </button>

                </div>

              </div>

            );

          })}

        </div>

      </section>


      {/* BOTTOM */}

      <section className="deal-bottom">

        <div>

          <span>
            ✨ LIMITED TIME OFFER ✨
          </span>

          <h2>
            More Fun. Less Spend.
          </h2>

          <p>
            Find something special without breaking the bank.
          </p>

        </div>


        <div className="deal-bottom-circle">

          50%

          <small>
            OFF
          </small>

        </div>

      </section>

    </div>
  );
};

export default Deals;