import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/toys.css";

const Toys = () => {
  const [toys, setToys] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();

  // Fetch toys from JSON Server
  useEffect(() => {
    axios
      .get("https://kiddoworld-server.onrender.com/toys")
      .then((response) => {
        setToys(response.data);
      })
      .catch((error) => {
        console.log("Error fetching toys:", error);
      });
  }, []);

  // Load user-specific wishlist
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

  // Add / Remove Wishlist
  const toggleWishlist = (toy) => {
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
      (item) =>
        String(item.id) === String(toy.id)
    );

    let updatedWishlist;

    if (alreadyAdded) {
      updatedWishlist = currentWishlist.filter(
        (item) =>
          String(item.id) !== String(toy.id)
      );

      alert(`${toy.name} removed from wishlist 💔`);
    } else {
      updatedWishlist = [
        ...currentWishlist,
        toy
      ];

      alert(`${toy.name} added to wishlist ❤️`);
    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      `wishlist_${currentUser.id}`,
      JSON.stringify(updatedWishlist)
    );
  };

  // Add to Cart using localStorage
  const addToBag = (toy) => {
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
      (item) =>
        String(item.id) === String(toy.id)
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = currentCart.map((item) =>
        String(item.id) === String(toy.id)
          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) + 1
            }
          : item
      );

      alert(
        `${toy.name} quantity increased 🛍️`
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          ...toy,
          quantity: 1
        }
      ];

      alert(
        `${toy.name} added to your bag 🛍️`
      );
    }

    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );
  };

  // Categories
  const categories = [
    "All",
    ...new Set(
      toys.map((toy) => toy.category)
    )
  ];

  // Search + Category Filter
  const filteredToys = toys.filter((toy) => {
    const matchesSearch =
      toy.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      toy.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      toy.category === category;

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  return (
    <div className="toys-page">

      <h1>🧸 Toys</h1>

      <p>
        Fun, exciting and educational toys
        for every little one!
      </p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search toys..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Categories */}
      <div className="category-buttons">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() =>
              setCategory(cat)
            }
            className={
              category === cat
                ? "active"
                : ""
            }
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Toy Cards */}
      <div className="toy-grid">

        {filteredToys.length > 0 ? (

          filteredToys.map((toy) => {

            const isWishlisted =
              wishlist.some(
                (item) =>
                  String(item.id) ===
                  String(toy.id)
              );

            return (
              <div
                className="toy-card"
                key={toy.id}
              >

                <div className="toy-image">

                  <img
                    src={toy.image}
                    alt={toy.name}
                  />

                  {/* Wishlist */}
                  <button
                    className={`wishlist-btn ${
                      isWishlisted
                        ? "liked"
                        : ""
                    }`}
                    onClick={() =>
                      toggleWishlist(toy)
                    }
                  >
                    {isWishlisted
                      ? "♥"
                      : "♡"}
                  </button>

                  <span className="toy-category">
                    {toy.category}
                  </span>

                </div>

                <div className="toy-details">

                  <h3>{toy.name}</h3>

                  <div className="toy-rating">
                    ⭐ {toy.rating}
                  </div>

                  <p className="toy-age">
                    👶 {toy.age}
                  </p>

                  <p className="toy-description">
                    {toy.description}
                  </p>

                  <div className="toy-bottom">

                    <div className="toy-price">
                      ₹{toy.price}
                    </div>

                    <button
                      className="bag-btn"
                      onClick={() =>
                        addToBag(toy)
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

          <div className="no-toys">

            <div>🧸</div>

            <h3>
              No toys found
            </h3>

            <p>
              Try searching for another
              toy or category.
            </p>

          </div>

        )}

      </div>

    </div>
  );
};

export default Toys;