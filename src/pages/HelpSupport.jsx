
import React, { useState } from "react";
import "../styles/helpSupport.css";

const HelpSupport = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="help-page">

      {/* Hero Section */}
      <section className="help-hero">
        <div>
          <h1>How Can We Help? 💕</h1>
          <p>
            We're here to make your KiddoWorld shopping experience
            happy, easy, and stress-free!
          </p>
        </div>
      </section>

      {/* Support Options */}
      <section className="help-options">

        <div className="help-card">
          <div className="help-icon">📦</div>
          <h3>Orders & Delivery</h3>
          <p>
            Need help tracking your order or understanding
            delivery details?
          </p>
        </div>

        <div className="help-card">
          <div className="help-icon">💳</div>
          <h3>Payments</h3>
          <p>
            Having trouble with payment or checkout?
            We're happy to help.
          </p>
        </div>

        <div className="help-card">
          <div className="help-icon">🔄</div>
          <h3>Returns & Refunds</h3>
          <p>
            Questions about returning a product or getting
            a refund?
          </p>
        </div>

        <div className="help-card">
          <div className="help-icon">👩‍💻</div>
          <h3>Contact Support</h3>
          <p>
            Our support team is always ready to help you
            with your questions.
          </p>
        </div>

      </section>

      {/* FAQ Section */}
      <section className="faq-section">

        <h2>Frequently Asked Questions ❓</h2>

        <div className="faq-container">

          <details>
            <summary>How can I place an order?</summary>
            <p>
              Browse our products, select the item you like,
              click "Add to Bag", and proceed to checkout.
            </p>
          </details>

          <details>
            <summary>How can I track my order?</summary>
            <p>
              Go to your Profile and open the Orders section
              to view your order details.
            </p>
          </details>

          <details>
            <summary>Can I add products to my wishlist?</summary>
            <p>
              Yes! Click the ❤️ icon on any product to save
              it to your wishlist.
            </p>
          </details>

          <details>
            <summary>How can I remove an item from my cart?</summary>
            <p>
              Open your Cart and click the Remove button
              next to the product you want to remove.
            </p>
          </details>

          <details>
            <summary>How do I change the quantity of a product?</summary>
            <p>
              Open your Cart and use the + or − buttons to
              increase or decrease the quantity.
            </p>
          </details>

          <details>
            <summary>How can I contact KiddoWorld?</summary>
            <p>
              You can use the support form below to send us
              your question or message.
            </p>
          </details>

        </div>

      </section>

      {/* Contact Section */}
      <section className="contact-section">

        <div className="contact-info">

          <h2>Get In Touch 💌</h2>

          <p>
            Have a question, suggestion, or need some help?
            Send us a message!
          </p>

          <div className="contact-item">
            📧 <span>support@kiddoworld.com</span>
          </div>

          <div className="contact-item">
            📞 <span>+91 98765 43210</span>
          </div>

          <div className="contact-item">
            🕘 <span>Mon - Sat | 9:00 AM - 6:00 PM</span>
          </div>

        </div>

        {/* Support Form */}
        <form className="support-form" onSubmit={handleSubmit}>

          <h2>Send Us a Message 💕</h2>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="How can we help you?"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
          ></textarea>

          <button type="submit">
            Send Message 💌
          </button>

          {submitted && (
            <p className="success-message">
              Thank you! Your message has been sent successfully. 💕
            </p>
          )}

        </form>

      </section>

    </div>
  );
};

export default HelpSupport;

