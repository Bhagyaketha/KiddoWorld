import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/wishlist.css";

const Wishlist = () => {

  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const [wishlist, setWishlist] = useState([]);

  // Load user-specific wishlist
  useEffect(() => {

    if (!currentUser) {
      setWishlist([]);
      return;
    }

    const savedWishlist =
      localStorage.getItem(
        `wishlist_${currentUser.id}`
      );

    setWishlist(
      savedWishlist
        ? JSON.parse(savedWishlist)
        : []
    );

  }, [currentUser]);

  // Remove from Wishlist
  const removeFromWishlist = (id) => {

    const updatedWishlist =
      wishlist.filter(
        (item) =>
          String(item.id) !==
          String(id)
      );

    setWishlist(updatedWishlist);

    if (currentUser) {
      localStorage.setItem(
        `wishlist_${currentUser.id}`,
        JSON.stringify(updatedWishlist)
      );
    }

  };

  // Add Wishlist Item to Cart
  const addToBag = (product) => {

    if (!currentUser) {
      alert("Please login first 🔐");
      navigate("/Login");
      return;
    }

    const savedCart =
      localStorage.getItem(
        `cart_${currentUser.id}`
      );

    const currentCart = savedCart
      ? JSON.parse(savedCart)
      : [];

    const existingItem =
      currentCart.find(
        (item) =>
          String(item.id) ===
          String(product.id)
      );

    let updatedCart;

    if (existingItem) {

      updatedCart = currentCart.map(
        (item) =>
          String(item.id) ===
          String(product.id)
            ? {
                ...item,
                quantity:
                  Number(
                    item.quantity || 1
                  ) + 1
              }
            : item
      );

      alert(
        `${product.name} quantity increased 🛍️`
      );

    } else {

      updatedCart = [
        ...currentCart,
        {
          ...product,
          quantity: 1
        }
      ];

      alert(
        `${product.name} added to bag 🛍️`
      );

    }

    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );

  };

  return (

    <div className="wishlist-page">

      <h1>♡ My Wishlist</h1>

      <p className="wishlist-subtitle">
        Your favorite little treasures
      </p>

      {wishlist.length === 0 ? (

        <div className="empty-wishlist">

          <div>♡</div>

          <h2>
            Your Wishlist is Empty
          </h2>

          <p>
            Add your favorite toys to
            see them here.
          </p>

          <button
            onClick={() =>
              navigate("/Toys")
            }
          >
            Explore Toys 🧸
          </button>

        </div>

      ) : (

        <div className="wishlist-grid">

          {wishlist.map((item) => (

            <div
              className="wishlist-card"
              key={item.id}
            >

              <div className="wishlist-image">

                <img
                  src={item.image}
                  alt={item.name}
                />

                <button
                  onClick={() =>
                    removeFromWishlist(
                      item.id
                    )
                  }
                >
                  ♥
                </button>

              </div>

              <div className="wishlist-info">

                <h3>
                  {item.name}
                </h3>

                <p>
                  ⭐ {item.rating}
                </p>

                <span>
                  {item.age}
                </span>

                <h4>
                  ₹{item.price}
                </h4>

                <button
                  className="wishlist-bag"
                  onClick={() =>
                    addToBag(item)
                  }
                >
                  🛒 Add to Bag
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
};

export default Wishlist;