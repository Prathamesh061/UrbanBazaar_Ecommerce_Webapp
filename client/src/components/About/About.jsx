import React from "react";
import "./about.css";

function About() {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-heading">Welcome to UrbanBazaar</h1>
        <p className="about-description">
          At UrbanBazaar, we're passionate about bringing urban fashion and
          lifestyle products right to your doorstep. With a curated selection of
          the latest trends and unique finds, we're your one-stop destination
          for everything stylish.
        </p>
        <p className="about-mission">
          Our mission is to provide you with a seamless shopping experience,
          ensuring that you stay ahead of the fashion curve while enjoying
          top-notch customer service and unbeatable prices.
        </p>
        <h2 className="about-team-heading">Meet Our Team</h2>
        <div className="about-team">
          <div className="team-member">
            {/* <img src="/images/team-member1.jpg" alt="Team Member 1" /> */}
            <h3>Shakti Man</h3>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member">
            {/* <img src="/images/team-member2.jpg" alt="Team Member 2" /> */}
            <h3>Jane Smith</h3>
            <p>Head of Design</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
