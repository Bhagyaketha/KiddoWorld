
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/checkout.css";

const Checkout = () => {

  const navigate = useNavigate();

  // GET CURRENT USER FROM REDUX
  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  // CART
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // CUSTOMER DETAILS
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: ""
  });

  // PAYMENT
  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [upiId, setUpiId] = useState("");


  // ==========================================
  // LOAD CART FROM USER-SPECIFIC LOCAL STORAGE
  // ==========================================

  useEffect(() => {

    if (!currentUser) {
      setCart([]);
      setLoading(false);
      return;
    }

    try {

      const savedCart = localStorage.getItem(
        `cart_${currentUser.id}`
      );

      if (savedCart) {

        const parsedCart = JSON.parse(savedCart);

        setCart(
          Array.isArray(parsedCart)
            ? parsedCart
            : []
        );

      } else {

        setCart([]);

      }

    } catch (error) {

      console.log(
        "Error loading cart:",
        error
      );

      setCart([]);

    } finally {

      setLoading(false);

    }

  }, [currentUser]);


  // ==========================================
  // CUSTOMER INPUT
  // ==========================================

  const handleChange = (e) => {

    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });

  };


  // ==========================================
  // TOTAL
  // ==========================================

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.price) *
        Number(item.quantity || 1),
    0
  );


  // ==========================================
  // PLACE ORDER
  // ==========================================

  const handlePlaceOrder = async () => {

    // LOGIN CHECK
    const loggedInUser =
      currentUser ||
      JSON.parse(
        localStorage.getItem("loggedInUser")
      );

    if (!loggedInUser) {

      alert(
        "Please login before placing your order."
      );

      navigate("/Login");

      return;

    }


    // CART CHECK
    if (cart.length === 0) {

      alert("Your cart is empty.");

      navigate("/Cart");

      return;

    }


    // DELIVERY VALIDATION
    if (
      !customer.name.trim() ||
      !customer.phone.trim() ||
      !customer.address.trim() ||
      !customer.city.trim() ||
      !customer.state.trim() ||
      !customer.pincode.trim()
    ) {

      alert(
        "Please fill all delivery information."
      );

      return;

    }


    // UPI VALIDATION
    if (
      paymentMethod === "UPI / Online Payment" &&
      !upiId.trim()
    ) {

      alert(
        "Please enter your UPI ID."
      );

      return;

    }


    // ==========================================
    // CREATE ORDER
    // ==========================================

    const newOrder = {

      id: Date.now(),

      userId: loggedInUser.id,

      customer: {
        name: customer.name,
        phone: customer.phone,
        address: customer.address,
        city: customer.city,
        state: customer.state,
        pincode: customer.pincode
      },

      items: cart,

      total: total,

      paymentMethod: paymentMethod,

      upiId:
        paymentMethod ===
        "UPI / Online Payment"
          ? upiId
          : "",

      date:
        new Date().toLocaleDateString(),

      status: "Placed"

    };


    try {

      // ==========================================
      // SAVE ORDER TO JSON SERVER
      // ==========================================

      await axios.post(
        "http://localhost:5001/orders",
        newOrder
      );


      // ==========================================
      // CLEAR USER'S LOCAL STORAGE CART
      // ==========================================

      localStorage.removeItem(
        `cart_${loggedInUser.id}`
      );

      // Clear checkout cart state
      setCart([]);


      // ==========================================
      // SUCCESS
      // ==========================================

      alert(
        "Order placed successfully! 🎉"
      );


      // GO TO MY ORDERS
      navigate("/MyOrders");

    } catch (error) {

      console.log(
        "Error placing order:",
        error
      );

      alert(
        "Unable to place order. Please make sure JSON Server is running."
      );

    }

  };


  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {

    return (

      <div className="checkout-loading">

        Loading checkout...

      </div>

    );

  }


  // ==========================================
  // NOT LOGGED IN
  // ==========================================

  if (!currentUser) {

    return (

      <div className="checkout-page">

        <div className="checkout-container">

          <div className="empty-checkout">

            <div>
              🔐
            </div>

            <h2>
              Please Login
            </h2>

            <p>
              Login to continue with your checkout.
            </p>

            <button
              onClick={() =>
                navigate("/Login")
              }
            >
              Login
            </button>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================
  // PAGE
  // ==========================================

  return (

    <div className="checkout-page">

      <div className="checkout-container">


        {/* HEADER */}

        <div className="checkout-title">

          <p>
            KIDDOWORLD
          </p>

          <h1>
            Checkout
          </h1>

          <span>
            Complete your order and make someone's
            day special 💕
          </span>

        </div>


        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <div className="empty-checkout">

            <div>
              🛍️
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              Add some products before checking out.
            </p>

            <button
              onClick={() =>
                navigate("/Shop")
              }
            >
              Continue Shopping
            </button>

          </div>

        ) : (

          <div className="checkout-grid">


            {/* =================================
                DELIVERY + PAYMENT
            ================================= */}

            <div className="checkout-box">

              <h2>
                Delivery Information
              </h2>


              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customer.name}
                onChange={handleChange}
              />


              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={customer.phone}
                onChange={handleChange}
              />


              <input
                type="text"
                name="address"
                placeholder="House / Street"
                value={customer.address}
                onChange={handleChange}
              />


              <input
                type="text"
                name="city"
                placeholder="City"
                value={customer.city}
                onChange={handleChange}
              />


              <input
                type="text"
                name="state"
                placeholder="State"
                value={customer.state}
                onChange={handleChange}
              />


              <input
                type="text"
                name="pincode"
                placeholder="PIN Code"
                value={customer.pincode}
                onChange={handleChange}
              />


              {/* PAYMENT */}

              <h2 className="payment-heading">
                Payment Method
              </h2>


              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    paymentMethod ===
                    "Cash on Delivery"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                Cash on Delivery

              </label>


              <label className="payment-option">

                <input
                  type="radio"
                  name="payment"
                  value="UPI / Online Payment"
                  checked={
                    paymentMethod ===
                    "UPI / Online Payment"
                  }
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                />

                UPI / Online Payment

              </label>


              {/* UPI */}

              {paymentMethod ===
                "UPI / Online Payment" && (

                <div className="upi-section">

                  <h3>
                    UPI Payment
                  </h3>

                  <p>
                    Enter your UPI ID to continue.
                  </p>


                  <input
                    type="text"
                    placeholder="example@upi"
                    value={upiId}
                    onChange={(e) =>
                      setUpiId(
                        e.target.value
                      )
                    }
                  />


                  <small>
                    Example: yourname@oksbi
                  </small>

                </div>

              )}

            </div>


            {/* =================================
                ORDER SUMMARY
            ================================= */}

            <div className="checkout-box order-summary">

              <h2>
                Order Summary
              </h2>


              <div className="checkout-items">

                {cart.map((item) => (

                  <div
                    className="checkout-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />


                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        Qty:{" "}
                        {item.quantity || 1}
                      </p>

                      <strong>
                        ₹
                        {Number(item.price) *
                          Number(
                            item.quantity || 1
                          )}
                      </strong>

                    </div>

                  </div>

                ))}

              </div>


              {/* TOTAL */}

              <div className="checkout-total">

                <span>
                  Total
                </span>

                <strong>
                  ₹{total}
                </strong>

              </div>


              {/* PLACE ORDER */}

              <button
                className="place-order-btn"
                onClick={handlePlaceOrder}
              >
                Place Order 🎁
              </button>

            </div>


          </div>

        )}

      </div>

    </div>

  );

};

export default Checkout;

