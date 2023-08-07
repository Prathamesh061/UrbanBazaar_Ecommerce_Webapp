import React, { useEffect, useState, useRef } from "react";
import "./rangeSlider.css";

function RangeSlider({ min = 1, max }) {
  const [value, setValue] = useState(min);
  const [thumbPosition, setThumbPosition] = useState(0);
  const [space, setSpace] = useState(0);
  const [showValue, setShowValue] = useState(false);

  const rangeLineRef = useRef(null);
  const rangeThumbRef = useRef(null);
  const rangeInputRef = useRef(null);

  useEffect(() => {
    // Normalize the value between 0 and 1 based on min and max
    const normalizedValue = (value - min) / (max - min);
    setThumbPosition(normalizedValue);
    setSpace(
      rangeInputRef.current.offsetWidth - rangeThumbRef.current.offsetWidth
    );
  }, [value, min, max]);

  function handleInput(e) {
    setValue(e.target.value);
    setShowValue(true);
  }

  function handleBlur() {
    setShowValue(false);
  }

  return (
    <div className="range">
      <div className="range__content">
        <div className="min value">{min}</div>
        <div className="range__slider">
          <div
            className="range__slider-line"
            ref={rangeLineRef}
            style={{ width: thumbPosition * 100 + "%" }} // Adjust the width based on thumbPosition
          ></div>
        </div>
        <div
          className={`range__thumb ${showValue ? "show" : ""}`}
          ref={rangeThumbRef}
          style={{ left: thumbPosition * space + "px" }}
        >
          <div
            className={`range__value ${showValue ? "show" : ""}`}
            id="range-value"
          >
            <div className="range__value-number">{value}</div>
          </div>
        </div>
        <div className="max value">{max}</div>

        <input
          type="range"
          className="range__input"
          id="range-input"
          min={min}
          max={max}
          value={value}
          step="1"
          onInput={handleInput}
          onBlur={handleBlur}
          ref={rangeInputRef}
        />
      </div>
    </div>
  );
}

export default RangeSlider;
