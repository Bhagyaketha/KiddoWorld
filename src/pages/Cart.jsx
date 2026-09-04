import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/cart.css";

const Cart = () => {
  const navigate = useNavigate();

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const [cart, setCart] = useState([]);

  // Load user-specific cart
  useEffect(() => {
    if (!currentUser) {
      setCart([]);
      return;
    }

    const savedCart = localStorage.getItem(
      `cart_${currentUser.id}`
    );

    setCart(
      savedCart
        ? JSON.parse(savedCart)
        : []
    );
  }, [currentUser]);

  // Save cart to localStorage
  const saveCart = (updatedCart) => {
    setCart(updatedCart);

    if (currentUser) {
      localStorage.setItem(
        `cart_${currentUser.id}`,
        JSON.stringify(updatedCart)
      );
    }
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      String(item.id) === String(id)
        ? {
            ...item,
            quantity:
              Number(item.quantity || 1) + 1
          }
        : item
    );

    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) - 1
            }
          : item
      )
      .filter(
        (item) => Number(item.quantity) > 0
      );

    saveCart(updatedCart);
  };

  // Remove item
  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) =>
        String(item.id) !== String(id)
    );

    saveCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);

    if (currentUser) {
      localStorage.removeItem(
        `cart_${currentUser.id}`
      );
    }
  };

  // Total items
  const totalItems = cart.reduce(
    (total, item) =>
      total + Number(item.quantity || 1),
    0
  );

  // Total price
  const totalPrice = cart.reduce(
    (total, item) =>
      total +
      Number(item.price) *
        Number(item.quantity || 1),
    0
  );

  // If user is not logged in
  if (!currentUser) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <div className="cart-icon">🛒</div>

          <h2>Please Login</h2>

          <p>
            Login to view your shopping cart.
          </p>

          <button
            onClick={() => navigate("/Login")}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">

      <div className="cart-header">

        <div>
          <h1>🛒 My Cart</h1>

          <p>
            {totalItems} item
            {totalItems !== 1 ? "s" : ""} in
            your cart
          </p>
        </div>

        {cart.length > 0 && (
          <button
            className="clear-cart-btn"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        )}

      </div>

      {cart.length === 0 ? (

        <div className="empty-cart">

          <div className="cart-icon">
            🛒
          </div>

          <h2>
            Your Cart is Empty
          </h2>

          <p>
            Looks like you haven't added
            anything to your cart yet.
          </p>

          <button
            onClick={() => navigate("/Toys")}
          >
            Explore Toys 🧸
          </button>

        </div>

      ) : (

        <div className="cart-container">

          {/* Cart Items */}

          <div className="cart-items">

            {cart.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">

                  <h3>
                    {item.name}
                  </h3>

                  {item.category && (
                    <p className="cart-category">
                      {item.category}
                    </p>
                  )}

                  {item.age && (
                    <p className="cart-age">
                      👶 {item.age}
                    </p>
                  )}

                  <p className="cart-price">
                    ₹{item.price}
                  </p>

                  <div className="quantity-section">

                    <button
                      onClick={() =>
                        decreaseQuantity(
                          item.id
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity || 1}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.id
                        )
                      }
                    >
                      +
                    </button>

                  </div>

                </div>

                <div className="cart-item-right">

                  <p className="item-total">
                    ₹
                    {Number(item.price) *
                      Number(
                        item.quantity || 1
                      )}
                  </p>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    🗑️ Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* Order Summary */}

          <div className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">
              <span>
                Items
              </span>

              <span>
                {totalItems}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Subtotal
              </span>

              <span>
                ₹{totalPrice}
              </span>
            </div>

            <div className="summary-row">
              <span>
                Delivery
              </span>

              <span className="free">
                FREE
              </span>
            </div>

            <hr />

            <div className="summary-total">
              <span>
                Total
              </span>

              <span>
                ₹{totalPrice}
              </span>
            </div>

            <button
              className="checkout-btn"
              onClick={() =>
                navigate("/Checkout")
              }
            >
              Proceed to Checkout →
            </button>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;