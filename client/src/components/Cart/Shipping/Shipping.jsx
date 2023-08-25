import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../../actions/cartAction";
import MetaData from "../../Utility/MetaData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faEarthAmericas,
  faHouse,
  faLocationDot,
  faPhone,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import { Country, State } from "country-state-city";
import "./shipping.css";
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";

function Shipping() {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);
  const { shippingInfo, error } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNum, setPhoneNum] = useState(shippingInfo.phoneNo);
  const [message, setMessage] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleShippingSubmit(e) {
    e.preventDefault();

    if (phoneNum.length < 10 || phoneNum.length > 10) {
      setMessage("Phone Number should be of 10 digits");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNum,
      })
    );

    navigate("/order/confirm");
  }
  useEffect(() => {
    if (!isAuthenticated) {
      navigate(
        `/login?message=You must log in first.&redirectTo=${location.pathname}`
      );
    }
  });
  return (
    <>
      <MetaData title="Shipping || UrbanBazaar" />
      <Link to={`..`} relative="path" className="profile-back-btn">
        &larr; <span>Back</span>
      </Link>
      <CheckoutSteps className="checkout-steps" activeStep={0} />
      <div className="shipping-container">
        <div className="shipping-box">
          <h2 className="shipping-header">Shipping details</h2>

          <form
            className="shipping-form"
            encType="multipart/form-data"
            onSubmit={handleShippingSubmit}
          >
            {error && <p className="error">{error}</p>}
            {message && <p className="error">{message}</p>}

            <div className="address-name">
              <FontAwesomeIcon icon={faHouse} className="icon-clr" />
              <input
                type="text"
                placeholder="Address"
                required
                name="name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="address-city">
              <FontAwesomeIcon icon={faCity} className="icon-clr" />
              <input
                type="text"
                placeholder="City"
                required
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="address-pincode">
              <FontAwesomeIcon icon={faLocationDot} className="icon-clr" />
              <input
                type="number"
                placeholder="Pin code"
                required
                name="pinCode"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="address-phoneno">
              <FontAwesomeIcon icon={faPhone} className="icon-clr" />
              <input
                type="number"
                placeholder="Phone number"
                required
                name="phoneNum"
                value={phoneNum}
                onChange={(e) => setPhoneNum(e.target.value)}
                size={10}
              />
            </div>

            <div className="address-country">
              <FontAwesomeIcon icon={faEarthAmericas} className="icon-clr" />
              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((country) => (
                    <option value={country.isoCode} key={country.isoCode}>
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>

            <div className="address-state">
              <FontAwesomeIcon icon={faSitemap} className="icon-clr" />
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>
            <input
              type="submit"
              value={"Continue"}
              className="update-btn btn"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Shipping;
