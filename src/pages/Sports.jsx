import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/sports.css";

const Sports = () => {

  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();


  /* =================================
     FETCH PRODUCTS
  ================================= */

  useEffect(() => {

    axios
      .get("http://localhost:5000/sports")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log("Error fetching sports:", error);
      });

  }, []);


  /* =================================
     LOAD USER-SPECIFIC WISHLIST
  ================================= */

  useEffect(() => {

    if (!currentUser) {
      setWishlist([]);
      return;
    }

    const savedWishlist = localStorage.getItem(
      `wishlist_${currentUser.id}`
    );

    setWishlist(
      savedWishlist
        ? JSON.parse(savedWishlist)
        : []
    );

  }, [currentUser]);


  /* =================================
     WISHLIST
  ================================= */

  const toggleWishlist = (item) => {

    if (!currentUser) {
      alert("Please login first 🔐");
      navigate("/Login");
      return;
    }

    const savedWishlist = localStorage.getItem(
      `wishlist_${currentUser.id}`
    );

    const currentWishlist = savedWishlist
      ? JSON.parse(savedWishlist)
      : [];

    const exists = currentWishlist.some(
      (product) =>
        String(product.id) === String(item.id)
    );

    let updatedWishlist;

    if (exists) {

      updatedWishlist = currentWishlist.filter(
        (product) =>
          String(product.id) !== String(item.id)
      );

      alert(`${item.name} removed from wishlist 💔`);

    } else {

      updatedWishlist = [
        ...currentWishlist,
        item
      ];

      alert(`${item.name} added to wishlist ❤️`);

    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      `wishlist_${currentUser.id}`,
      JSON.stringify(updatedWishlist)
    );

  };


  /* =================================
     ADD TO BAG
  ================================= */

  const addToBag = (item) => {

    if (!currentUser) {
      alert("Please login first 🔐");
      navigate("/Login");
      return;
    }

    const savedCart = localStorage.getItem(
      `cart_${currentUser.id}`
    );

    const currentCart = savedCart
      ? JSON.parse(savedCart)
      : [];

    const existing = currentCart.find(
      (product) =>
        String(product.id) === String(item.id)
    );

    let updatedCart;

    if (existing) {

      updatedCart = currentCart.map(
        (product) =>
          String(product.id) === String(item.id)
            ? {
                ...product,
                quantity:
                  Number(product.quantity || 1) + 1
              }
            : product
      );

      alert(`${item.name} quantity increased 🛍️`);

    } else {

      updatedCart = [
        ...currentCart,
        {
          ...item,
          quantity: 1
        }
      ];

      alert(`${item.name} added to bag ⚽`);

    }

    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );

  };


  /* =================================
     CATEGORIES
  ================================= */

  const categories = [
    "All",
    ...new Set(
      items.map(
        (item) => item.category
      )
    )
  ];


  /* =================================
     SEARCH + FILTER
  ================================= */

  const filteredItems = items.filter((item) => {

    const searchMatch =
      item.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      item.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      item.category === category;

    return searchMatch && categoryMatch;

  });


  return (

    <div className="sports-page">


      {/* ================================
          HERO
      ================================= */}

      <section className="sports-hero">

        <div className="sports-hero-content">

          <p className="sports-small-title">
            ✦ PLAY • MOVE • HAVE FUN ✦
          </p>

          <h1>
            Little
            <br />
            <span>Champions!</span>
          </h1>

          <p className="sports-hero-text">
            Get little ones moving with fun sports
            equipment made for exciting adventures,
            active play and happy memories.
          </p>

          <button
            className="sports-explore-btn"
            onClick={() =>
              document
                .getElementById("sports-products")
                .scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Explore Sports ⚽
          </button>

        </div>


        <div className="sports-hero-art">

          <div className="sports-circle">
            ⚽
          </div>

          <span className="sports-star sports-star1">
            ✦
          </span>

          <span className="sports-star sports-star2">
            ✧
          </span>

          <span className="sports-star sports-star3">
            ♡
          </span>

        </div>

      </section>


      {/* ================================
          INTRO
      ================================= */}

      <section className="sports-intro">

        <p>
          RUN • JUMP • PLAY
        </p>

        <h2>
          Ready, Set,
          <span> Play!</span>
        </h2>

        <h4>
          Fun sports gear for active little adventurers.
        </h4>

      </section>


      {/* ================================
          SEARCH + FILTER
      ================================= */}

      <section className="sports-controls">

        <div className="sports-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search sports products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="sports-filter">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            {categories.map((cat) => (

              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>

            ))}

          </select>

        </div>

      </section>


      {/* ================================
          PRODUCTS
      ================================= */}

      <section
        className="sports-products"
        id="sports-products"
      >

        <div className="sports-heading">

          <div>

            <p>
              SPORTS & OUTDOOR COLLECTION
            </p>

            <h2>
              {category === "All"
                ? "Little Champions"
                : category}
            </h2>

          </div>

          <span>
            {filteredItems.length} items found
          </span>

        </div>


        <div className="sports-grid">

          {filteredItems.length > 0 ? (

            filteredItems.map((item) => {

              const isWishlisted =
                wishlist.some(
                  (product) =>
                    String(product.id) ===
                    String(item.id)
                );

              return (

                <div
                  className="sports-card"
                  key={item.id}
                >

                  {/* IMAGE */}

                  <div className="sports-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />


                    <button
                      type="button"
                      className={`sports-wishlist ${
                        isWishlisted
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleWishlist(item)
                      }
                    >
                      {isWishlisted
                        ? "♥"
                        : "♡"}
                    </button>


                    <span className="sports-tag">
                      {item.category}
                    </span>

                  </div>


                  {/* INFO */}

                  <div className="sports-info">

                    <h3>
                      {item.name}
                    </h3>


                    <div className="sports-rating">
                      ⭐ {item.rating}
                    </div>


                    <p className="sports-age">
                      👧 {item.age}
                    </p>


                    <p className="sports-description">
                      {item.description}
                    </p>


                    <div className="sports-bottom">

                      <strong>
                        ₹{item.price}
                      </strong>


                      <button
                        type="button"
                        onClick={() =>
                          addToBag(item)
                        }
                      >
                        🛒 Add to Bag
                      </button>

                    </div>

                  </div>

                </div>

              );

            })

          ) : (

            <div className="sports-empty">

              <div>⚽</div>

              <h3>
                No sports products found
              </h3>

              <p>
                Try searching for another product.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>

  );
};

export default Sports;