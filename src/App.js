import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [rate, setRate] = useState();
  const [first, setFirst] = useState("RUB");
  const [second, setSecond] = useState("AZN");

  const [val, setVal] = useState(1);
  const [converted, setConverted] = useState(rate);

  const getData = async (first, second) => {
    const response = await axios.get(
      `https://free.currconv.com/api/v7/convert?q=${first}_${second}&compact=ultra&apiKey=42966ca1a4ac233f4bb0`
    );
    setRate(response.data[`${first}_${second}`]);
  };

  const show = () => {
    let convert = 0;
    if (rate) {
      convert = Number(val * rate).toFixed(2);
      setConverted(convert);
    }
  };

  useEffect(() => {
    getData(first, second);
    show();
  }, [first || second]);

  useEffect(() => {
    getData(first, second);
  }, []);

  return (
    <div className="App">
      <h1>Currency Converter</h1>
      <div className="head">{`1 ${first} = ${rate} ${second}`}</div>
      <div className="content">
        <li>
          <input
            type="number"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
            }}
          />
        </li>
        <li>
          <select
            onChange={(e) => {
              setFirst(e.target.value);
            }}
          >
            <option value="RUB">Rubl</option>
            <option value="AZN">Manat</option>
            <option value="USD">Dollar</option>
            <option value="EUR">Euro</option>
          </select>
        </li>
        <li>
          <p>to</p>
        </li>
        <li>
          <select
            onChange={(e) => {
              setSecond(e.target.value);
            }}
          >
            <option value="AZN">Manat</option>
            <option value="RUB">Rubl</option>
            <option value="USD">Dollar</option>
            <option value="EUR">Euro</option>
          </select>
        </li>
        <li>
          <button
            onClick={() => {
              show();
            }}
          >
            Convert
          </button>
        </li>
        <li>
          <input type="text" value={converted + " " + second} />
        </li>
      </div>
    </div>
  );
};

export default App;
