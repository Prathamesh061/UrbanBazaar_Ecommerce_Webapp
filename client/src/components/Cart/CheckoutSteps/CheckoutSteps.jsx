import {
  faBuildingColumns,
  faCheckDouble,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import React from "react";
import "./checkoutSteps.css";

function CheckoutSteps({ activeStep }) {
  const steps = [
    {
      label: <h3>Shipping details</h3>,
      icon: <FontAwesomeIcon icon={faTruckFast} />,
    },
    {
      label: <h3>Confirm Order</h3>,
      icon: <FontAwesomeIcon icon={faCheckDouble} />,
    },
    {
      label: <h3>Payment</h3>,
      icon: <FontAwesomeIcon icon={faBuildingColumns} />,
    },
  ];
  return (
    <>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        className="checkout-steps"
      >
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel icon={item.icon}>{item.label} </StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}

export default CheckoutSteps;
