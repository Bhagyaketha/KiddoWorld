import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const admin = localStorage.getItem("adminLoggedIn");

    if (admin !== "true") {
      navigate("/AdminLogin");
      return;
    }

    // Fetch all KiddoWorld products
    const productEndpoints = [
      { url: "toys", category: "Toys" },
      { url: "clothing", category: "Clothing" },
      { url: "books", category: "Books" },
      { url: "schoolSupplies", category: "School Supplies" },
      { url: "artsCrafts", category: "Arts & Crafts" },
      { url: "sports", category: "Sports" },
      { url: "homeProducts", category: "Home Products" },
      { url: "giftProducts", category: "Gift Products" },
      { url: "deals", category: "Deals" }
    ];

    Promise.all(
      productEndpoints.map((item) =>
        axios.get(`https://kiddoworld-server.onrender.com/${item.url}`)
      )
    )
      .then((responses) => {
        let allProducts = [];

        responses.forEach((response, index) => {
          const category =
            productEndpoints[index].category;

          const categoryProducts = Array.isArray(response.data)
            ? response.data.map((product) => ({
                ...product,
                adminCategory: category
              }))
            : [];

          allProducts = [
            ...allProducts,
            ...categoryProducts
          ];
        });

        setProducts(allProducts);
      })
      .catch((err) => {
        console.log("Product fetch error:", err);
      });

    // Fetch users
    axios
      .get("https://kiddoworld-server.onrender.com/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log("User fetch error:", err);
      });

    // Fetch orders from localStorage
    const savedOrders =
      JSON.parse(localStorage.getItem("orders")) || [];

    setOrders(savedOrders);
  }, [navigate]);

  // Delete product
  const deleteProduct = (product) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${product.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    let endpoint = "";

    switch (product.adminCategory) {
      case "Toys":
        endpoint = "toys";
        break;

      case "Clothing":
        endpoint = "clothing";
        break;

      case "Books":
        endpoint = "books";
        break;

      case "School Supplies":
        endpoint = "schoolSupplies";
        break;

      case "Arts & Crafts":
        endpoint = "artsCrafts";
        break;

      case "Sports":
        endpoint = "sports";
        break;

      case "Home Products":
        endpoint = "homeProducts";
        break;

      case "Gift Products":
        endpoint = "giftProducts";
        break;

      case "Deals":
        endpoint = "deals";
        break;

      default:
        alert("Product category not found");
        return;
    }

    axios
      .delete(
  `https://kiddoworld-server.onrender.com/${endpoint}/${product.id}`
)
      .then(() => {
        setProducts((previousProducts) =>
          previousProducts.filter(
            (item) =>
              !(
                String(item.id) === String(product.id) &&
                item.adminCategory ===
                  product.adminCategory
              )
          )
        );

        alert("Product deleted successfully 🗑️");
      })
      .catch((err) => {
        console.log(err);
        alert("Unable to delete product");
      });
  };

  // Logout
  const logoutAdmin = () => {
    localStorage.removeItem("adminLoggedIn");

    alert("Admin logged out");

    navigate("/AdminLogin");
  };

  return (
    <div className="admin-dashboard-page">

      {/* HEADER */}

      <div className="admin-header">

        <div>
          <p>KIDDOWORLD</p>
          <h1>Admin Dashboard</h1>
        </div>

        <button onClick={logoutAdmin}>
          LOGOUT
        </button>

      </div>


      {/* STATISTICS */}

      <div className="admin-stats">

        <div className="admin-stat-card">
          <p>TOTAL PRODUCTS</p>
          <h2>{products.length}</h2>
        </div>

        <div className="admin-stat-card">
          <p>TOTAL USERS</p>
          <h2>{users.length}</h2>
        </div>

        <div className="admin-stat-card">
          <p>TOTAL ORDERS</p>
          <h2>{orders.length}</h2>
        </div>

      </div>


      {/* PRODUCTS */}

      <div className="admin-section">

        <div className="admin-section-heading">

          <h2>Manage Products</h2>

          <span>
            {products.length} Products
          </span>

        </div>

        <div className="admin-table-container">

          <table>

            <thead>

              <tr>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>ACTION</th>
              </tr>

            </thead>

            <tbody>

              {products.length > 0 ? (

                products.map((product, index) => (

                  <tr
                    key={`${product.adminCategory}-${product.id}-${index}`}
                  >

                    <td>

                      <img
                        src={product.image}
                        alt={product.name}
                        className="admin-product-image"
                      />

                    </td>

                    <td>
                      {product.name}
                    </td>

                    <td>
                      {product.adminCategory}
                    </td>

                    <td>
                      ₹
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}
                    </td>

                    <td>

                      <button
                        className="delete-product"
                        onClick={() =>
                          deleteProduct(product)
                        }
                      >
                        DELETE
                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="5">
                    No products found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* USERS */}

      <div className="admin-section">

        <div className="admin-section-heading">

          <h2>Registered Users</h2>

          <span>
            {users.length} Users
          </span>

        </div>

        <div className="admin-table-container">

          <table>

            <thead>

              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
              </tr>

            </thead>

            <tbody>

              {users.length > 0 ? (

                users.map((user) => (

                  <tr key={user.id}>

                    <td>
                      {user.fullname || user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                    <td>
                      {user.phone || "—"}
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="3">
                    No users found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* ORDERS */}

      <div className="admin-section">

        <div className="admin-section-heading">

          <h2>Customer Orders</h2>

          <span>
            {orders.length} Orders
          </span>

        </div>

        <div className="admin-table-container">

          <table>

            <thead>

              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>DATE</th>
                <th>PAYMENT</th>
                <th>TOTAL</th>
                <th>STATUS</th>
              </tr>

            </thead>

            <tbody>

              {orders.length > 0 ? (

                orders
                  .slice()
                  .reverse()
                  .map((order) => (

                    <tr key={order.id}>

                      <td>
                        {order.id}
                      </td>

                      <td>
                        {order.customer?.name ||
                          order.customer?.fullname ||
                          "—"}
                      </td>

                      <td>
                        {order.date || "—"}
                      </td>

                      <td>
                        {order.payment || "—"}
                      </td>

                      <td>
                        ₹
                        {Number(
                          order.total || 0
                        ).toLocaleString("en-IN")}
                      </td>

                      <td>

                        <span className="order-status">
                          {order.status ||
                            "Processing"}
                        </span>

                      </td>

                    </tr>

                  ))

              ) : (

                <tr>

                  <td colSpan="6">
                    No orders found
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;