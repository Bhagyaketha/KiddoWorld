import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/clothing.css";

const Clothing = () => {
  const [clothing, setClothing] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();

  /* ============================
     FETCH CLOTHING
  ============================ */

  useEffect(() => {
    axios
      .get("https://kiddoworld-server.onrender.com/clothing")
      .then((response) => {
        setClothing(response.data);
      })
      .catch((error) => {
        console.log("Error fetching clothing:", error);
      });
  }, []);

  /* ============================
     LOAD USER WISHLIST
  ============================ */

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

  /* ============================
     TOGGLE WISHLIST
  ============================ */

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

  /* ============================
     ADD TO CART
  ============================ */

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
        `${item.name} added to your bag 🛍️`
      );
    }

    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );
  };

  /* ============================
     CATEGORIES
  ============================ */

  const categories = [
    "All",
    ...new Set(
      clothing.map(
        (item) => item.category
      )
    )
  ];

  /* ============================
     FILTER
  ============================ */

  const filteredClothing =
    clothing.filter((item) => {
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
    <div className="clothing-page">

      {/* ============================
          HERO
      ============================ */}

      <section className="clothing-hero">

        <div className="clothing-hero-content">

          <p className="clothing-small-title">
            ✦ LITTLE FASHION STUDIO ✦
          </p>

          <h1>
            Tiny Styles,
            <br />
            <span>Big Smiles!</span>
          </h1>

          <p className="clothing-hero-text">
            Discover adorable outfits made for
            little personalities and big adventures.
          </p>

          <button
            className="clothing-explore"
            onClick={() =>
              document
                .getElementById("clothing-products")
                .scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Explore Collection ✨
          </button>

        </div>

        <div className="clothing-hero-art">

          <div className="fashion-circle">
            👗
          </div>

          <span className="fashion-star star1">
            ✦
          </span>

          <span className="fashion-star star2">
            ✧
          </span>

          <span className="fashion-star star3">
            ♡
          </span>

        </div>

      </section>

      {/* ============================
          INTRO
      ============================ */}

      <section className="clothing-intro">

        <p>PLAYFUL • COMFY • STYLISH</p>

        <h2>
          Dress Up Their
          <span> Little World</span>
        </h2>

        <h4>
          Cute clothes for every tiny adventure.
        </h4>

      </section>

      {/* ============================
          SEARCH + FILTER
      ============================ */}

      <section className="clothing-controls">

        <div className="clothing-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search cute outfits..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="clothing-filter">

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            {categories.map((cat) => (

              <option
                value={cat}
                key={cat}
              >
                {cat}
              </option>

            ))}

          </select>

        </div>

      </section>

      {/* ============================
          PRODUCTS
      ============================ */}

      <section
        className="clothing-products"
        id="clothing-products"
      >

        <div className="clothing-products-heading">

          <div>

            <p>OUR COLLECTION</p>

            <h2>
              {category === "All"
                ? "All Clothing"
                : category}
            </h2>

          </div>

          <span>
            {filteredClothing.length} items
          </span>

        </div>

        <div className="clothing-grid">

          {filteredClothing.length > 0 ? (

            filteredClothing.map((item) => {

              const isWishlisted =
                wishlist.some(
                  (product) =>
                    String(product.id) ===
                    String(item.id)
                );

              return (

                <div
                  className="clothing-card"
                  key={item.id}
                >

                  {/* IMAGE */}

                  <div className="clothing-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <button
                      type="button"
                      className={`clothing-wishlist ${
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

                    <span className="clothing-tag">
                      {item.category}
                    </span>

                  </div>

                  {/* INFORMATION */}

                  <div className="clothing-info">

                    <h3>
                      {item.name}
                    </h3>

                    <div className="clothing-rating">
                      ⭐ {item.rating}
                    </div>

                    <p className="clothing-age">
                      👶 {item.age}
                    </p>

                    <p className="clothing-description">
                      {item.description}
                    </p>

                    <div className="clothing-bottom">

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

            <div className="clothing-empty">

              <div>👗</div>

              <h3>
                No outfits found
              </h3>

              <p>
                Try searching for something else.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>
  );
};

export default Clothing;