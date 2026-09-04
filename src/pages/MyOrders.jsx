
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/myorders.css";

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Get logged-in user from Redux
  const currentUser = useSelector(
    (state) => state.user.currentUser
  );


  useEffect(() => {

    const fetchOrders = async () => {

      try {

        // Check Redux for logged-in user
        if (!currentUser) {

          setOrders([]);
          setLoading(false);

          return;
        }


        // Get orders belonging to the logged-in user
        const response = await axios.get(
          `http://localhost:5000/orders?userId=${currentUser.id}`
        );


        setOrders(response.data);

      } catch (error) {

        console.log(
          "Error fetching orders:",
          error
        );

      } finally {

        setLoading(false);

      }

    };


    fetchOrders();

  }, [currentUser]);


  if (loading) {

    return (
      <div className="orders-loading">
        Loading your orders...
      </div>
    );

  }


  // If no user is logged in
  if (!currentUser) {

    return (
      <div className="orders-page">

        <div className="no-orders">

          <div>
            🔐
          </div>

          <h2>
            Please Login
          </h2>

          <p>
            Please login to view your orders.
          </p>

          <button
            onClick={() => navigate("/Login")}
          >
            Login ✨
          </button>

        </div>

      </div>
    );

  }


  return (

    <div className="orders-page">


      {/* HEADER */}

      <div className="orders-header">

        <p>KIDDOWORLD</p>

        <h1>
          My Orders 📦
        </h1>

        <span>
          Your little one's happy orders
        </span>

      </div>



      {/* NO ORDERS */}

      {orders.length === 0 ? (

        <div className="no-orders">

          <div>
            🛍️
          </div>

          <h2>
            No Orders Yet
          </h2>

          <p>
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() => navigate("/Shop")}
          >
            Start Shopping ✨
          </button>

        </div>

      ) : (


        /* ORDERS */

        <div className="orders-container">

          {orders
            .slice()
            .reverse()
            .map((order) => (

              <div
                className="order-card"
                key={order.id}
              >


                {/* ORDER HEADER */}

                <div className="order-top">

                  <div>

                    <h3>
                      Order #{order.id}
                    </h3>

                    <p>
                      Ordered on: {order.date}
                    </p>

                  </div>


                  <span className="order-status">

                    {order.status}

                  </span>

                </div>



                {/* PRODUCTS */}

                <div className="order-products">

                  {order.items.map((item) => (

                    <div
                      className="order-product"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />


                      <div>

                        <h4>
                          {item.name}
                        </h4>

                        <p>
                          Quantity:{" "}
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



                {/* ORDER BOTTOM */}

                <div className="order-bottom">

                  <div>

                    <span>
                      Payment
                    </span>

                    <strong>
                      {order.paymentMethod}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{order.total}
                    </strong>

                  </div>

                </div>


              </div>

            ))}

        </div>

      )}

    </div>

  );

};

export default MyOrders;

