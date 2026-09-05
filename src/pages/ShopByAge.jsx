import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/shopbyage.css";

const ShopByAge = () => {

  const [products, setProducts] = useState([]);
  const [selectedAge, setSelectedAge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();


  const ages = [
    { id: 1, min: 0, max: 1, title: "0–1 Years", emoji: "👶" },
    { id: 2, min: 1, max: 2, title: "1–2 Years", emoji: "🧸" },
    { id: 3, min: 2, max: 3, title: "2–3 Years", emoji: "🎨" },
    { id: 4, min: 3, max: 4, title: "3–4 Years", emoji: "🚗" },
    { id: 5, min: 4, max: 5, title: "4–5 Years", emoji: "🧩" },
    { id: 6, min: 5, max: 6, title: "5–6 Years", emoji: "🎒" },
    { id: 7, min: 6, max: 7, title: "6–7 Years", emoji: "📚" },
    { id: 8, min: 7, max: 8, title: "7–8 Years", emoji: "🚀" },
    { id: 9, min: 8, max: 9, title: "8–9 Years", emoji: "⚽" },
    { id: 10, min: 9, max: 10, title: "9–10 Years", emoji: "🎮" },
    { id: 11, min: 10, max: 11, title: "10–11 Years", emoji: "🔬" },
    { id: 12, min: 11, max: 12, title: "11–12 Years", emoji: "🌟" }
  ];


  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  useEffect(() => {

    const fetchProducts = async () => {

      const endpoints = [
        "toys",
        "clothing",
        "books",
        "schoolSupplies",
        "artsCrafts",
        "sports",
        "homeProducts"
      ];

      try {

        const responses = await Promise.all(

          endpoints.map(async (endpoint) => {

            try {

              const response = await axios.get(
                `http://localhost:5001/${endpoint}`
              );

              if (Array.isArray(response.data)) {

                return response.data.map((product) => ({
                  ...product,
                  sourceCategory: endpoint
                }));

              }

              return [];

            } catch (error) {

              console.log(
                `Could not load ${endpoint}:`,
                error.message
              );

              return [];

            }

          })

        );

        const allProducts = responses.flat();

        console.log("ALL PRODUCTS:", allProducts);
        console.log("TOTAL PRODUCTS:", allProducts.length);

        setProducts(allProducts);

      } catch (error) {

        console.error(
          "Error loading products:",
          error
        );

      } finally {

        setLoading(false);

      }

    };

    fetchProducts();

  }, []);


  // ==========================================
  // LOAD USER-SPECIFIC WISHLIST
  // ==========================================

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


  // ==========================================
  // GET AGE RANGE FROM PRODUCT
  // ==========================================

  const getAgeRange = (product) => {

    if (!product) {
      return null;
    }

    const possibleAgeValues = [
      product.age,
      product.ageRange,
      product.recommendedAge,
      product.recommended_age,
      product.ages,
      product.ageGroup
    ];

    let ageValue = possibleAgeValues.find(
      (value) =>
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    );

    if (!ageValue) {
      return null;
    }

    if (Array.isArray(ageValue)) {
      ageValue = ageValue.join(" ");
    }

    let value = String(ageValue)
      .toLowerCase()
      .trim();

    // Convert different dash types
    value = value.replace(/[–—−]/g, "-");

    // Convert "to" into "-"
    value = value.replace(/\bto\b/g, "-");


    // ------------------------------------------
    // Months + Years
    // Example: 6 months - 1 year
    // ------------------------------------------

    const monthYearMatch = value.match(
      /(\d+(?:\.\d+)?)\s*months?.*?(\d+(?:\.\d+)?)\s*years?/
    );

    if (monthYearMatch) {

      return {
        min:
          parseFloat(monthYearMatch[1]) / 12,

        max:
          parseFloat(monthYearMatch[2])
      };

    }


    // ------------------------------------------
    // Months
    // Example: 6 months - 12 months
    // ------------------------------------------

    const monthsMatch = value.match(
      /(\d+(?:\.\d+)?)\s*months?.*?(\d+(?:\.\d+)?)\s*months?/
    );

    if (monthsMatch) {

      return {
        min:
          parseFloat(monthsMatch[1]) / 12,

        max:
          parseFloat(monthsMatch[2]) / 12
      };

    }


    // ------------------------------------------
    // Normal ranges
    // Example: 0-1
    // Example: 0 - 3 years
    // Example: 5–8 years
    // ------------------------------------------

    const rangeMatch = value.match(
      /(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)/
    );

    if (rangeMatch) {

      return {
        min:
          parseFloat(rangeMatch[1]),

        max:
          parseFloat(rangeMatch[2])
      };

    }


    // ------------------------------------------
    // Under / Below
    // Example: Under 3 years
    // ------------------------------------------

    const underMatch = value.match(
      /(?:under|below|less than)\s*(\d+(?:\.\d+)?)/
    );

    if (underMatch) {

      return {
        min: 0,
        max: parseFloat(underMatch[1])
      };

    }


    // ------------------------------------------
    // Plus
    // Example: 3+ years
    // Example: 3 years and above
    // ------------------------------------------

    const plusMatch = value.match(
      /(\d+(?:\.\d+)?)\s*\+|\b(\d+(?:\.\d+)?)\s*years?\s*(?:and\s*)?(?:above|up)/
    );

    if (plusMatch) {

      const min = parseFloat(
        plusMatch[1] || plusMatch[2]
      );

      return {
        min,
        max: 100
      };

    }


    // ------------------------------------------
    // Single number
    // Example: 3 years
    // ------------------------------------------

    const singleMatch = value.match(
      /(\d+(?:\.\d+)?)\s*years?/
    );

    if (singleMatch) {

      const number = parseFloat(
        singleMatch[1]
      );

      return {
        min: number,
        max: number
      };

    }

    return null;

  };


  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts = selectedAge
    ? products.filter((product) => {

        const productAge =
          getAgeRange(product);

        if (!productAge) {
          return false;
        }

        return (
          productAge.min <= selectedAge.max &&
          productAge.max >= selectedAge.min
        );

      })
    : [];


  // ==========================================
  // WISHLIST
  // ==========================================

  const toggleWishlist = (product) => {

    // Check login
    if (!currentUser) {

      alert("Please login first 🔐");

      navigate("/Login");

      return;

    }


    const savedWishlist =
      localStorage.getItem(
        `wishlist_${currentUser.id}`
      );

    const currentWishlist =
      savedWishlist
        ? JSON.parse(savedWishlist)
        : [];


    const exists = currentWishlist.some(
      (item) =>
        String(item.id) ===
        String(product.id)
    );


    let updatedWishlist;


    if (exists) {

      updatedWishlist =
        currentWishlist.filter(
          (item) =>
            String(item.id) !==
            String(product.id)
        );

      alert(
        `${product.name} removed from wishlist 💔`
      );

    } else {

      updatedWishlist = [
        ...currentWishlist,
        product
      ];

      alert(
        `${product.name} added to wishlist ❤️`
      );

    }


    setWishlist(updatedWishlist);


    localStorage.setItem(
      `wishlist_${currentUser.id}`,
      JSON.stringify(updatedWishlist)
    );

  };


  // ==========================================
  // CHECK WISHLIST
  // ==========================================

  const isWishlisted = (product) => {

    return wishlist.some(
      (item) =>
        String(item.id) ===
        String(product.id)
    );

  };


  // ==========================================
  // ADD TO CART
  // ==========================================

  const addToCart = (product) => {

    // Check login
    if (!currentUser) {

      alert("Please login first 🔐");

      navigate("/Login");

      return;

    }


    // Get user-specific cart
    const savedCart = localStorage.getItem(
      `cart_${currentUser.id}`
    );

    const cart = savedCart
      ? JSON.parse(savedCart)
      : [];


    // IMPORTANT:
    // Products from different categories
    // can have the same ID.
    // So compare both ID and sourceCategory.

    const existingItem = cart.find(
      (item) =>
        String(item.id) ===
          String(product.id) &&
        item.sourceCategory ===
          product.sourceCategory
    );


    let updatedCart;


    if (existingItem) {

      updatedCart = cart.map((item) =>

        String(item.id) ===
          String(product.id) &&
        item.sourceCategory ===
          product.sourceCategory

          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) + 1
            }

          : item

      );

      alert(
        `${product.name} quantity increased 🛍️`
      );

    } else {

      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ];

      alert(
        `${product.name} added to bag 🛍️`
      );

    }


    // Save cart for current user
    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );

  };


  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="shop-age">


      {/* HERO */}

      <section className="age-hero">

        <div className="age-hero-content">

          <p className="age-small-heading">
            FIND THEIR PERFECT FIT
          </p>

          <h1>
            Shop By <span>Age</span>
          </h1>

          <p>
            Discover toys, books, clothing, crafts
            and more, specially selected for every
            stage of your little one's journey.
          </p>

          <button
            className="age-explore-btn"
            onClick={() =>
              document
                .getElementById("age-section")
                ?.scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Explore Ages
          </button>

        </div>


        <div className="age-hero-visual">

          <span className="age-floating-star star-one">
            ✦
          </span>

          <span className="age-floating-star star-two">
            ✦
          </span>

          <span className="age-floating-star star-three">
            ✦
          </span>

          <div className="age-hero-circle">
            👶
          </div>

        </div>

      </section>


      {/* HEADING */}

      <section
        className="age-heading"
        id="age-section"
      >

        <p>CHOOSE A STAGE</p>

        <h2>
          Find Products For{" "}
          <span>Every Age</span>
        </h2>

        <p>
          Pick an age group to discover products
          made for their growing world.
        </p>

      </section>


      {/* AGE CARDS */}

      <div className="age-container">

        {ages.map((age) => (

          <div
            key={age.id}
            className={`age-card ${
              selectedAge?.id === age.id
                ? "active"
                : ""
            }`}
            onClick={() =>
              setSelectedAge(age)
            }
          >

            <span className="age-emoji">
              {age.emoji}
            </span>

            <h3>
              {age.title}
            </h3>

            <p>
              Explore Products
            </p>

          </div>

        ))}

      </div>


      {/* LOADING */}

      {loading && (

        <div className="age-products">

          <div className="loading-products">

            <div>🧸</div>

            <h2>
              Finding lovely products...
            </h2>

          </div>

        </div>

      )}


      {/* PRODUCTS */}

      {!loading && selectedAge && (

        <section className="age-products">

          <div className="products-top">

            <h2>
              Products for{" "}
              <span>
                {selectedAge.title}
              </span>
            </h2>

            <span>
              {filteredProducts.length} products
            </span>

          </div>


          {filteredProducts.length > 0 ? (

            <div className="product-grid">

              {filteredProducts.map(
                (product, index) => (

                  <div
                    className="product-card"
                    key={`${product.sourceCategory}-${product.id}-${index}`}
                  >

                    {/* IMAGE */}

                    <div className="product-image">

                      <img
                        src={
                          product.image ||
                          "https://via.placeholder.com/400x300?text=Product"
                        }
                        alt={
                          product.name ||
                          "Product"
                        }
                      />


                      <button
                        type="button"
                        className={`wishlist-btn ${
                          isWishlisted(product)
                            ? "liked"
                            : ""
                        }`}
                        onClick={() =>
                          toggleWishlist(product)
                        }
                      >

                        {isWishlisted(product)
                          ? "♥"
                          : "♡"}

                      </button>


                      <span className="product-category">

                        {product.category ||
                          product.sourceCategory}

                      </span>

                    </div>


                    {/* DETAILS */}

                    <div className="product-details">

                      <h3>
                        {product.name ||
                          "Unnamed Product"}
                      </h3>


                      <div className="product-rating">

                        ⭐{" "}

                        {product.rating ||
                          "4.5"}

                      </div>


                      <p className="product-age">

                        Age:{" "}

                        {product.age ||
                          product.ageRange ||
                          "All Ages"}

                      </p>


                      <p className="product-description">

                        {product.description ||
                          "A wonderful product for your little one."}

                      </p>


                      <div className="product-bottom">

                        <span className="price">

                          ₹{product.price}

                        </span>


                        <button
                          type="button"
                          className="bag-btn"
                          onClick={() =>
                            addToCart(product)
                          }
                        >
                          Add to Bag
                        </button>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <div className="no-products">

              <div>🧸</div>

              <h3>
                No products available
              </h3>

              <p>
                We couldn't find products for{" "}
                {selectedAge.title}.
              </p>

              <p>
                Total products loaded:{" "}
                {products.length}
              </p>

            </div>

          )}

        </section>

      )}

    </div>

  );

};

export default ShopByAge;