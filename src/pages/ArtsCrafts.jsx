import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/artscrafts.css";

const ArtsCrafts = () => {
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
      .get("http://localhost:5000/artsCrafts")
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.log(
          "Error fetching arts & crafts:",
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
        `${item.name} added to bag 🎨`
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
    <div className="craft-page">

      {/* HERO */}

      <section className="craft-hero">

        <div className="craft-hero-content">

          <p className="craft-small-title">
            ✦ CREATE • IMAGINE • EXPLORE ✦
          </p>

          <h1>
            Little Hands,
            <br />
            <span>Big Creativity!</span>
          </h1>

          <p className="craft-hero-text">
            Let little imaginations shine with colorful
            art supplies and exciting DIY craft kits made
            for creative kids.
          </p>

          <button
            className="craft-explore-btn"
            onClick={() =>
              document
                .getElementById("craft-products")
                .scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Explore Crafts 🎨
          </button>

        </div>

        <div className="craft-hero-art">

          <div className="craft-circle">
            🎨
          </div>

          <span className="craft-star craft-star1">
            ✦
          </span>

          <span className="craft-star craft-star2">
            ✧
          </span>

          <span className="craft-star craft-star3">
            ♡
          </span>

        </div>

      </section>

      {/* INTRO */}

      <section className="craft-intro">

        <p>
          DRAW • PAINT • CREATE
        </p>

        <h2>
          A Little
          <span> Creativity</span>
        </h2>

        <h4>
          Big ideas begin with little hands.
        </h4>

      </section>

      {/* SEARCH + FILTER */}

      <section className="craft-controls">

        <div className="craft-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search art & craft products..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="craft-filter">

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
        className="craft-products"
        id="craft-products"
      >

        <div className="craft-heading">

          <div>

            <p>
              ART & CRAFT COLLECTION
            </p>

            <h2>
              {category === "All"
                ? "Creative Corner"
                : category}
            </h2>

          </div>

          <span>
            {filteredItems.length} items found
          </span>

        </div>

        <div className="craft-grid">

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
                  className="craft-card"
                  key={item.id}
                >

                  <div className="craft-image">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <button
                      type="button"
                      className={`craft-wishlist ${
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

                    <span className="craft-tag">
                      {item.category}
                    </span>

                  </div>

                  <div className="craft-info">

                    <h3>
                      {item.name}
                    </h3>

                    <div className="craft-rating">
                      ⭐ {item.rating}
                    </div>

                    <p className="craft-age">
                      👧 {item.age}
                    </p>

                    <p className="craft-description">
                      {item.description}
                    </p>

                    <div className="craft-bottom">

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

            <div className="craft-empty">

              <div>🎨</div>

              <h3>
                No crafts found
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

export default ArtsCrafts;