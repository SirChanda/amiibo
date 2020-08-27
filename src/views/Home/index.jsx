import React, { useState } from "react";
import Header from "../../components/Header";
import "./main.css";

export default () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const onClickSearch = () => {
    fetch(`https://www.amiiboapi.com/api/amiibo/?name=${search}`)
      .then((response) => response.json())
      .then((data) => {
        if (data["error"] != undefined) {
          setResult([]);
        } else {
          setResult(data["amiibo"]);
        }
      });
  };

  return (
    <div>
      <Header></Header>
      <div className="search">
        <input
          type="text"
          className="text"
          placeholder="Search amiibo... (mario)"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          type="button"
          className="button"
          value="Search"
          onClick={onClickSearch}
        />
      </div>
      <div className="results">
        {result.length > 0 ? (
          result.map((item) => <p>{item.image}</p>)
        ) : (
          <p>No results</p>
        )}
      </div>
    </div>
  );
};
