import { useState, useEffect } from "react";
import "./Homies.css";

function Homies() {
  useEffect(() => {
    const getPlayers = () => {
      const url = `https://www.pokedata.ovh/standings/0000118/masters/0000118_Masters.json`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    };
    getPlayers();
  }, []);
  return <main id="homies">Homies (Still in Development)</main>;
}

export default Homies;
