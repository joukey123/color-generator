import React, { useState } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
  const [color, setColor] = useState("");
  const [step, setStep] = useState(10);
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(typeof step);
    try {
      const newColor = new Values(color);
      setList(newColor.all(parseInt(step)));
      setError("");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleColor = (event) => {
    const inputColor = event.target.value;
    const checkInputColor = inputColor.includes("#")
      ? inputColor
      : `#${inputColor}`;
    setColor(checkInputColor);
  };

  return (
    <>
      <section className="container">
        <h3>Color Generator</h3>
        <form onSubmit={handleSubmit}>
          <label>Hex :</label>
          <input
            type="text"
            placeholder="#f15025"
            value={color}
            onChange={handleColor}
            className={error ? "error" : null}
            minLength={7}
            maxLength={7}
          />
          <label>Step :</label>
          <input
            style={{ width: 90 }}
            type="number"
            min={1}
            value={step}
            onChange={(e) => setStep(e.target.value)}
          />
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </section>
      <section className="colors">
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            {list.map((color, index) => {
              return (
                <SingleColor
                  key={index}
                  color={color}
                  index={index}
                  step={step}
                />
              );
            })}
          </>
        )}
      </section>
    </>
  );
}

export default App;
