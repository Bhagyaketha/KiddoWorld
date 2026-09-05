import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/schoolsupplies.css";

const SchoolSupplies = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();

  /* ================================
     FETCH PRODUCTS
  ================================= */

  useEffect(() => {
    axios
      .get("https://kiddoworld-server.onrender.com/schoolSupplies")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(
          "Error fetching school supplies:",
          error
        );
      });
  }, []);

  /* ================================
     LOAD USER WISHLIST
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

  /* ================================
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

    const alreadyAdded = currentWishlist.some(
      (product) =>
        String(product.id) === String(item.id)
    );

    let updatedWishlist;

    if (alreadyAdded) {
      updatedWishlist = currentWishlist.filter(
        (product) =>
          String(product.id) !== String(item.id)
      );

      alert(
        `${item.name} removed from wishlist 💔`
      );
    } else {
      updatedWishlist = [
        ...currentWishlist,
        item
      ];

      alert(
        `${item.name} added to wishlist ❤️`
      );
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      `wishlist_${currentUser.id}`,
      JSON.stringify(updatedWishlist)
    );
  };

  /* ================================
     ADD TO CART
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

    const existingItem = currentCart.find(
      (product) =>
        String(product.id) === String(item.id)
    );

    let updatedCart;

    if (existingItem) {
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

      alert(
        `${item.name} quantity increased 🛍️`
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          ...item,
          quantity: 1
        }
      ];

      alert(
        `${item.name} added to bag ✏️`
      );
    }

    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );
  };

  /* ================================
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

  /* ================================
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
    <div className="school-page">

      {/* HERO */}

      <section className="school-hero">

        <div className="school-hero-content">

          <p className="school-small-title">
            ✦ READY • SET • LEARN ✦
          </p>

          <h1>
            School Days,
            <br />
            <span>Happy Ways!</span>
          </h1>

          <p className="school-hero-text">
            Make every school day more colorful,
            creative and organized with our adorable
            collection of school essentials.
          </p>

          <button
            className="school-explore-btn"
            onClick={() =>
              document
                .getElementById("school-products")
                .scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Shop School Essentials ✏️
          </button>

        </div>

        <div className="school-hero-art">

          <div className="school-circle">
            🎒
          </div>

          <span className="school-star school-star1">
            ✦
          </span>

          <span className="school-star school-star2">
            ✧
          </span>

          <span className="school-star school-star3">
            ♡
          </span>

        </div>

      </section>

      {/* INTRO */}

      <section className="school-intro">

        <p>
          LEARN • CREATE • GROW
        </p>

        <h2>
          Everything Little
          <span> Learners Need</span>
        </h2>

        <h4>
          Cute essentials for big school adventures.
        </h4>

      </section>

      {/* SEARCH + FILTER */}

      <section className="school-controls">

        <div className="school-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search school supplies..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="school-filter">

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

      {/* PRODUCTS */}

      <section
        className="school-products"
        id="school-products"
      >

        <div className="school-heading">

          <div>

            <p>
              SCHOOL COLLECTION
            </p>

            <h2>
              {category === "All"
                ? "School Essentials"
                : category}
            </h2>

          </div>

          <span>
            {filteredItems.length} items found
          </span>

        </div>

        <div className="school-grid">

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
                  className="school-card"
                  key={item.id}
                >

                  <div className="school-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <button
                      type="button"
                      className={`school-wishlist ${
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

                    <span className="school-tag">
                      {item.category}
                    </span>

                  </div>

                  <div className="school-info">

                    <h3>
                      {item.name}
                    </h3>

                    <div className="school-rating">
                      ⭐ {item.rating}
                    </div>

                    <p className="school-age">
                      👧 {item.age}
                    </p>

                    <p className="school-description">
                      {item.description}
                    </p>

                    <div className="school-bottom">

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

            <div className="school-empty">

              <div>🎒</div>

              <h3>
                No school supplies found
              </h3>

              <p>
                Try searching for another item.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default SchoolSupplies;