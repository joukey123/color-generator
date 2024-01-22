import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ color, index, step }) => {
  const { rgb, weight, hex } = color;
  const [alert, setAlert] = useState(false);
  const textRgb = rgb.join(",");
  const textHex = `#${hex}`;
  const copyHex = () => {
    navigator.clipboard.writeText(textHex);
    setAlert(true);
  };
  useEffect(() => {
    const timeOut = setTimeout(() => setAlert(false), 3000);
    return () => {
      clearTimeout(timeOut);
    };
  }, [alert]);
  return (
    <article
      className={`color ${index > 100 / step && "color-light"}`}
      onClick={copyHex}
      style={{ backgroundColor: `rgb(${textRgb})` }}
    >
      <p className="color-value">{textRgb}</p>
      <p className="color-value">{textHex}</p>
      <p className="percent-value">{weight}%</p>
      {alert ? <p className="alert">copied clipboard</p> : null}
    </article>
  );
};

export default SingleColor;
