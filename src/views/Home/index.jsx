import React, { useState, useRef } from "react";
import Header from "../../components/Header";
import Card from "../../components/Card";
import "./main.css";

export default () => {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const loadingDiv = useRef(null);
  const searchDiv = useRef(null);
  const resultsDiv = useRef(null);

  const onClickSearch = () => {
    loadingDiv.current.style.display = "flex";
    searchDiv.current.style.visibility = "hidden";
    resultsDiv.current.style.display = "none";

    fetch(`https://www.amiiboapi.com/api/amiibo/?name=${search}`)
      .then((response) => response.json())
      .then((data) => {
        loadingDiv.current.style.display = "none";
        searchDiv.current.style.visibility = "visible";
        resultsDiv.current.style.display = "flex";
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
      <div id="search" className="search" ref={searchDiv}>
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
      <div className="results" ref={resultsDiv}>
        {result.length > 0 ? (
          result.map((item) => (
            <Card
              img={item.image}
              character={item.character}
              serie={item.gameSeries}
            ></Card>
          ))
        ) : (
          <h1>No results</h1>
        )}
      </div>
      <div className="loading" ref={loadingDiv}>
        <h1>Loading...</h1>
      </div>
    </div>
  );
};
