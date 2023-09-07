import React from "react";
import "./contact.css";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-content">
        <h1 className="contact-heading">Contact Us</h1>
        <p className="contact-description">
          We'd love to hear from you! Feel free to reach out with any questions,
          comments, or feedback.
        </p>
        <div className="contact-details">
          <div className="contact-info">
            <h2>Contact Information</h2>
            <p>
              <span>Email:</span>{" "}
              <a href="mailto:prathmeshlakhpaty@gmail.com">
                prathmeshlakhpaty@gmail.com
              </a>
            </p>
            <p>
              <span>Address:</span> UrbanBazaar Internet Private Limited,
            </p>
            <p>Buildings Alyssa, Begonia & Clove,</p>
            <p>Embassy Tech Village, Outer Ring Road,</p>
            <p>Devarabeesanahalli Village, Dombivali, 560103,</p>
            <p>Maharashtra, India</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
