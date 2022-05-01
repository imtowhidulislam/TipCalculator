import React, { useEffect, useRef, useState } from "react";

// ! Style Componets.
import "./tipCalculator.css";
const TipCalculator = () => {
  const tipRef = useRef(null);
  const [input, setInput] = useState({ billamount: "", totalamount: "" });
  const [tip, setTip] = useState(null);
  const [tipsPerPerson, setTipsPerPerson] = useState(0.0);
  const [total, setTotal] = useState(0.0);

  // ! Handle Change Funciton...
  const handleChange = (e) => {
    e.preventDefault();
    const { name } = e.target;
    const { value } = e.target;
    setInput({ ...input, [name]: Number(value) });
  };
  // !HandleSubmit Function:::
  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({ billamount: "", totalamount: "" });
    setTipsPerPerson(0.0);
    setTotal(0.0);
  };

  // ! Select Tip
  const selectTip = (e) => {
    e.preventDefault();
    const tip = e.currentTarget.children;
    Array.from(tip).forEach((tip) =>
      tip.addEventListener("click", (e) => {
        const value = e.target.textContent;
        const getValue = parseInt(value);
        // console.log(getValue);
        setTip(getValue);
      })
    );
  };

  // ! Handling UseRef...
  useEffect(() => {}, []);
  // ! Custop Tips...
  const customTip = () => {
    const values = +prompt("enter a number");
    if (isFinite(values) === true) {
      setTip(values);
    } else {
      alert("please enter a valid number");
    }
  };

  // ! Calculate tip perPerson.
  const tipPerPerson = () => {
    const tips = +(
      (input.billamount * (tip / 100)) /
      input.totalamount
    ).toFixed(2);
    setTipsPerPerson(tips);
  };

  // ! Calculate amount perPerson.
  const totalAmount = () => {
    const total = +(
      input.billamount / input.totalamount +
      tipsPerPerson
    ).toFixed(2);
    setTotal(total);
  };
  useEffect(() => {
    tipPerPerson();
    totalAmount();
  }, [tip]);

  return (
    <div className="tip__wrapper">
      <div className="tip__container">
        <h2 className="tip__title">splittler</h2>
        <div className="actual__tip__container">
          <div className="input__feild">
            <div className="bill__input">
              <label htmlFor="bill">Bill</label>
              <input
                type="billamount"
                id="billAmout"
                name="billamount"
                value={input.billamount}
                placeholder="$ enter amount"
                onChange={handleChange}
              />
            </div>
            <div className="tips__container">
              <h4 className="bill">Select Tips</h4>
              <div className="tip__per" ref={tipRef} onClick={selectTip}>
                <h2 className="tips__amount tips__amount-1">5%</h2>
                <h2 className="tips__amount tips__amount-2">10%</h2>
                <h2 className="tips__amount tips__amount-3">15%</h2>
                <h2 className="tips__amount tips__amount-4">20%</h2>
                <h2 className="tips__amount tips__amount-5">50%</h2>
                <h2 className="tips__amount tips__amount-6" onClick={customTip}>
                  Custom
                </h2>
              </div>
            </div>
            <div className="bill__input">
              <label htmlFor="number of people">Number Of People</label>
              <input
                type="text"
                id="totalAmount"
                name="totalamount"
                value={input.totalamount}
                placeholder="$ enter amount"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="display__feild">
            <div className="tip__amount__container">
              <div className="tip__amount">
                <h5>Tip Amount</h5>
                <p>/person</p>
              </div>
              <h2 className="tipamount">${tipsPerPerson}</h2>
            </div>
            <div className="total__amount__container">
              <div className="total__amount">
                <h5>Total Amount</h5>
                <p>/person</p>
              </div>
              <h2 className="totalamount">${total}</h2>
            </div>
            <div className="button__container">
              <button className="btn" onClick={handleSubmit} type="button">
                reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipCalculator;
