import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/books.css";

const Books = () => {

  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [wishlist, setWishlist] = useState([]);

  const currentUser = useSelector(
    (state) => state.user.currentUser
  );

  const navigate = useNavigate();


  /* =================================
     FETCH BOOKS
  ================================= */

  useEffect(() => {

    axios
      .get("https://kiddoworld-server.onrender.com/books")
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log("Error fetching books:", error);
      });

  }, []);


  /* =================================
     LOAD USER-SPECIFIC WISHLIST
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


  /* =================================
     WISHLIST
  ================================= */

  const toggleWishlist = (book) => {

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

    const exists = currentWishlist.some(
      (item) =>
        String(item.id) === String(book.id)
    );

    let updatedWishlist;

    if (exists) {

      updatedWishlist = currentWishlist.filter(
        (item) =>
          String(item.id) !== String(book.id)
      );

      alert(`${book.name} removed from wishlist 💔`);

    } else {

      updatedWishlist = [
        ...currentWishlist,
        book
      ];

      alert(`${book.name} added to wishlist ❤️`);

    }

    setWishlist(updatedWishlist);

    localStorage.setItem(
      `wishlist_${currentUser.id}`,
      JSON.stringify(updatedWishlist)
    );

  };


  /* =================================
     ADD TO BAG
  ================================= */

  const addToBag = (book) => {

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

    const existing = currentCart.find(
      (item) =>
        String(item.id) === String(book.id)
    );

    let updatedCart;

    if (existing) {

      updatedCart = currentCart.map(
        (item) =>
          String(item.id) === String(book.id)
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 1) + 1
              }
            : item
      );

      alert(`${book.name} quantity increased 🛍️`);

    } else {

      updatedCart = [
        ...currentCart,
        {
          ...book,
          quantity: 1
        }
      ];

      alert(`${book.name} added to bag 📚`);

    }

    localStorage.setItem(
      `cart_${currentUser.id}`,
      JSON.stringify(updatedCart)
    );

  };


  /* =================================
     CATEGORIES
  ================================= */

  const categories = [
    "All",
    ...new Set(
      books.map(
        (book) => book.category
      )
    )
  ];


  /* =================================
     SEARCH + FILTER
  ================================= */

  const filteredBooks = books.filter((book) => {

    const searchMatch =
      book.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      book.category
        .toLowerCase()
        .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" ||
      book.category === category;

    return searchMatch && categoryMatch;

  });


  return (

    <div className="books-page">


      {/* =================================
          HERO
      ================================= */}

      <section className="books-hero">

        <div className="books-hero-content">

          <p className="books-small-title">
            ✦ LITTLE READERS CLUB ✦
          </p>

          <h1>
            Big Stories,
            <br />
            <span>Little Readers!</span>
          </h1>

          <p className="books-hero-text">
            Discover magical stories, fun adventures
            and wonderful books made for curious minds.
          </p>

          <button
            className="books-explore-btn"
            onClick={() =>
              document
                .getElementById("books-products")
                .scrollIntoView({
                  behavior: "smooth"
                })
            }
          >
            Explore Books 📚
          </button>

        </div>


        <div className="books-hero-art">

          <div className="book-circle">
            📚
          </div>

          <span className="book-star book-star1">
            ✦
          </span>

          <span className="book-star book-star2">
            ✧
          </span>

          <span className="book-star book-star3">
            ♡
          </span>

        </div>

      </section>


      {/* =================================
          INTRO
      ================================= */}

      <section className="books-intro">

        <p>
          READ • IMAGINE • DISCOVER
        </p>

        <h2>
          A World of
          <span> Wonderful Stories</span>
        </h2>

        <h4>
          Books that make little minds dream bigger.
        </h4>

      </section>


      {/* =================================
          SEARCH & FILTER
      ================================= */}

      <section className="books-controls">

        <div className="books-search">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search your favorite book..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>


        <div className="books-filter">

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


      {/* =================================
          PRODUCTS
      ================================= */}

      <section
        className="books-products"
        id="books-products"
      >

        <div className="books-heading">

          <div>

            <p>
              OUR BOOK COLLECTION
            </p>

            <h2>
              {category === "All"
                ? "All Books"
                : category}
            </h2>

          </div>

          <span>
            {filteredBooks.length} books found
          </span>

        </div>


        <div className="books-grid">

          {filteredBooks.length > 0 ? (

            filteredBooks.map((book) => {

              const isWishlisted =
                wishlist.some(
                  (item) =>
                    String(item.id) ===
                    String(book.id)
                );

              return (

                <div
                  className="book-card"
                  key={book.id}
                >

                  {/* IMAGE */}

                  <div className="book-image">

                    <img
                      src={book.image}
                      alt={book.name}
                    />


                    <button
                      type="button"
                      className={`book-wishlist ${
                        isWishlisted
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        toggleWishlist(book)
                      }
                    >
                      {isWishlisted
                        ? "♥"
                        : "♡"}
                    </button>


                    <span className="book-category">
                      {book.category}
                    </span>

                  </div>


                  {/* DETAILS */}

                  <div className="book-info">

                    <h3>
                      {book.name}
                    </h3>


                    <div className="book-rating">
                      ⭐ {book.rating}
                    </div>


                    <p className="book-age">
                      👶 {book.age}
                    </p>


                    <p className="book-description">
                      {book.description}
                    </p>


                    <div className="book-bottom">

                      <strong>
                        ₹{book.price}
                      </strong>


                      <button
                        type="button"
                        onClick={() =>
                          addToBag(book)
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

            <div className="books-empty">

              <div>📚</div>

              <h3>
                No books found
              </h3>

              <p>
                Try searching for another book.
              </p>

            </div>

          )}

        </div>

      </section>

    </div>

  );
};

export default Books;