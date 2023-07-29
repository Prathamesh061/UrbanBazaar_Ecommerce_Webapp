import React from "react";
import "./css/footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faGithub,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <section className="footer__moto">
        <p className="section__header">About</p>
        <div className="section__content">
          Building trust with Integrity. At UrbanBazaar, every decision made is
          based on ethical and moral principles - no success is meaningful if
          it’s not achieved the right way.
        </div>
      </section>

      <section className="footer__address">
        <p className="section__header">Address</p>
        <div className="section__content">
          UrbanBazaar Internet Private Limited, Buildings Alyssa, Begonia &
          Clove Embassy Tech Village, Outer Ring Road, Devarabeesanahalli
          Village, Dombivali, 560103, Maharashtra, India
        </div>
      </section>

      <section className="footer__contact">
        <p className="section__header">Contact</p>
        <p className="mail">
          <a href="mailto:prathmeshlakhpaty@gmail.com">
            prathmeshlakhpaty@gmail.com
          </a>
        </p>
        <p className="phone-number">
          <a href="tel:+91 9743345489">+919743345489</a>
        </p>
      </section>

      <section className="footer__about">
        <h3 className="section__header section__header--about">
          &#169; {new Date().getFullYear()} UrbanBazaar
        </h3>

        <ul class="social-list">
          <li class="social-list__item">
            <a
              href="https://www.linkedin.com/in/prathamesh-lakhapati-248395221"
              class="social-list__link"
            >
              <FontAwesomeIcon icon={faLinkedin} className="font-icon" />
            </a>
          </li>
          <li class="social-list__item">
            <a href="https://twitter.com/Hey_lack" class="social-list__link">
              <FontAwesomeIcon icon={faTwitter} className="font-icon" />
            </a>
          </li>
          <li class="social-list__item">
            <a
              href="https://github.com/Prathamesh061"
              class="social-list__link"
            >
              <FontAwesomeIcon icon={faGithub} className="font-icon" />
            </a>
          </li>
          <li class="social-list__item">
            <a
              href="https://www.instagram.com/hey_lack/"
              class="social-list__link"
            >
              <FontAwesomeIcon icon={faInstagram} className="font-icon" />
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
}

export default Footer;
