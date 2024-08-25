import { useState, useEffect } from "react";
import "./TopX.css";
import pokemon from "../../../data/pokemon";

function TopX() {
  useEffect(() => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        APIKEY: "supercalifragilisticexpialidocious",
        players: [
          {
            name: "Seag*",
            game: "tcg",
            division: "master",
            country: "*",
          },
        ],
      }),
    };
    fetch("https://pokedata.ovh/2024/api/", options).then((response) =>
      response.json().then((data) => console.log(data))
    );
  }, []);

  return (
    <main id="top-x">
      <h2 className="page-title">Top X Race</h2>
    </main>
  );
}

export default TopX;
