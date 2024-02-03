import "./styles.css";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
  const [country, setCountry] = useState([]);
  const [input, setInput] = useState("");
  const [filtedata, setfilterData] = useState([]);

  useEffect(() => {
    data();
  }, []);
  function data() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data1) => {
        setCountry(data1);
        setfilterData(data1);
      })
      .catch((error) => console.error("Error fetchind data:", error));
  }

  let find = () => {
    let data = country.filter((country) => {
      let val = country.name.common.toLowerCase();
      if (val.includes(input.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });

    setfilterData(data);
  };

  useEffect(() => {
    find();
  }, [input]);

  return (
    <div>
      <div className="search">
        <input
          onChange={(e) => {
            let val = e.target.value;
            setInput(val);
          }}
          placeholder="Search for countries"
          className="searchinput"
          type="text"
        />
      </div>

      <div className="fullCon">
        {filtedata.map((country) => (
          <div className="countryCard" key={country.car.ccn3}>
            <img
              className="imageConatiner"
              src={country.flags.png}
              alt={country.flags.alt}
            />
            <div className="text">{country.name.common}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
