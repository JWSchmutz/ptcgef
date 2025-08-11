import { useState, useEffect, useContext } from "react";
import Checkbox from "../Checkbox/Checkbox";
import FilterContext from "../../context/filter-context";
import SearchContext from "../../context/search-context";
import SortGroup from "../SortGroup/SortGroup";
import allStandardLegalPokemon from "../../data/allStandardLegalPokemon";

import colorless from "/colorless.png";
import darkness from "/darkness.png";
import dragon from "/dragon.png";
import fighting from "/fighting.png";
import fire from "/fire.png";
import grass from "/grass.png";
import lightning from "/lightning.png";
import metal from "/metal.png";
import psychic from "/psychic.png";
import water from "/water.png";

function PokemonFiltersSection({
  pokemonTypesToFilterOut,
  setPokemonTypesToFilterOut,
  onlyShowPokemonThatAre,
  setOnlyShowPokemonThatAre,
}) {
  const highestHp = Math.max(...allStandardLegalPokemon.map((card) => card.hp));
  const lowestHp = Math.min(...allStandardLegalPokemon.map((card) => card.hp));
  const { cardsToShow, setCardsToShow } = useContext(FilterContext);
  const { searchText } = useContext(SearchContext);
  const [sortPokemonBy, setSortPokemonBy] = useState(["name", "high"]);

  const sortPokemon = (cardsToSort) => {
    switch (sortPokemonBy[0]) {
      case "hp":
        if (sortPokemonBy[1] === "high")
          return cardsToSort.sort(
            (a, b) => Number(b[sortPokemonBy[0]]) - Number(a[sortPokemonBy[0]])
          );
        return cardsToSort.sort(
          (a, b) => Number(a[sortPokemonBy[0]]) - Number(b[sortPokemonBy[0]])
        );
      case "name":
        if (sortPokemonBy[1] === "high")
          return cardsToSort.sort((a, b) =>
            a.name < b.name ? -1 : a.name > b.name ? 1 : 0
          );
        return cardsToSort.sort((a, b) =>
          a.name < b.name ? 1 : a.name > b.name ? -1 : 0
        );
      case "types":
        if (sortPokemonBy[1] === "high")
          return cardsToSort.sort((a, b) =>
            a.types[0] < b.types[0] ? -1 : a.types[0] > b.types[0] ? 1 : 0
          );
        return cardsToSort.sort((a, b) =>
          a.types[0] < b.types[0] ? 1 : a.types[0] > b.types[0] ? -1 : 0
        );
      default:
        return cardsToSort.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        );
    }
  };

  const filterPokemon = (e) => {
    if (!e.target.checked)
      setPokemonTypesToFilterOut([e.target.value, ...pokemonTypesToFilterOut]);
    if (e.target.checked) {
      const newPokemonTypesToFilterOut = pokemonTypesToFilterOut.filter(
        (element) => element !== e.target.value
      );
      setPokemonTypesToFilterOut(newPokemonTypesToFilterOut);
    }
  };

  const showOnly = (e) => {
    if (e.target.checked)
      setOnlyShowPokemonThatAre([e.target.value, ...onlyShowPokemonThatAre]);
    if (!e.target.checked) {
      const newOnlyShowPokemonThatAre = onlyShowPokemonThatAre.filter(
        (element) => element !== e.target.value
      );
      setOnlyShowPokemonThatAre(newOnlyShowPokemonThatAre);
    }
  };

  useEffect(() => {
    let newPokemonCardsToShow = [...allStandardLegalPokemon];

    pokemonTypesToFilterOut.forEach((pokemonType) => {
      newPokemonCardsToShow = newPokemonCardsToShow.filter(
        (card) =>
          !card.subtypes?.includes(pokemonType) &&
          !card.types?.includes(pokemonType)
      );
    });

    onlyShowPokemonThatAre.forEach((pokemonType) => {
      newPokemonCardsToShow = newPokemonCardsToShow.filter((card) =>
        card.subtypes?.includes(pokemonType)
      );
    });

    newPokemonCardsToShow = newPokemonCardsToShow.filter(
      (card) =>
        card?.name?.toLowerCase().includes(searchText.toLowerCase()) ||
        card?.attacks?.[0]?.text
          ?.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        card?.attacks?.[1]?.text
          ?.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        card?.attacks?.[2]?.text
          ?.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        card?.abilities?.[0]?.text
          ?.toLowerCase()
          .includes(searchText.toLowerCase())
    );
    sortPokemon(newPokemonCardsToShow);
    setCardsToShow(newPokemonCardsToShow);
  }, [
    pokemonTypesToFilterOut,
    onlyShowPokemonThatAre,
    cardsToShow,
    sortPokemonBy,
    searchText,
  ]);

  return (
    <form className="filter-form">
      <div>
        <Checkbox
          value="Colorless"
          image={colorless}
          onChange={filterPokemon}
        />
        <Checkbox value="Darkness" image={darkness} onChange={filterPokemon} />
        <Checkbox value="Dragon" image={dragon} onChange={filterPokemon} />
        <Checkbox value="Fighting" image={fighting} onChange={filterPokemon} />
        <Checkbox value="Fire" image={fire} onChange={filterPokemon} />
        <Checkbox value="Grass" image={grass} onChange={filterPokemon} />
        <Checkbox
          value="Lightning"
          image={lightning}
          onChange={filterPokemon}
        />
        <Checkbox value="Metal" image={metal} onChange={filterPokemon} />
        <Checkbox value="Psychic" image={psychic} onChange={filterPokemon} />
        <Checkbox value="Water" image={water} onChange={filterPokemon} />
      </div>
      <div>
        <Checkbox value="Basic" onChange={filterPokemon} />
        <Checkbox value="Stage 1" id="stage 1" onChange={filterPokemon} />
        <Checkbox value="Stage 2" id="stage 2" onChange={filterPokemon} />
        <hr style={{ width: "205px", margin: "6px auto" }} />
        <Checkbox value="1 Prizer" label="1 Prizers" onChange={filterPokemon} />
        <Checkbox value="ex" onChange={filterPokemon} />
        <p>Show only:</p>
        <Checkbox value="Future" onChange={showOnly} unchecked={true} />
        <Checkbox value="Ancient" onChange={showOnly} unchecked={true} />
        <Checkbox value="Tera" onChange={showOnly} unchecked={true} />
        <Checkbox value="Ability" onChange={showOnly} unchecked={true} />
        <Checkbox value="Free Retreat" onChange={showOnly} unchecked={true} />
      </div>
      <div className="col-sm-8 col-md-4 m-auto sort d-flex flex-column justify-content-center">
        <h3 className="sort-label">Sort:</h3>
        <SortGroup
          title="HP"
          highestValue={highestHp}
          lowestValue={lowestHp}
          handleSortClick={setSortPokemonBy}
          sortPokemonBy={sortPokemonBy}
          sortBy="hp"
        />
        <hr style={{ width: "205px", margin: "16px auto" }} />
        <SortGroup
          title="Alphabetically"
          highestValue="A "
          lowestValue="Z"
          handleSortClick={setSortPokemonBy}
          sortPokemonBy={sortPokemonBy}
          sortBy="name"
        />
        <hr style={{ width: "205px", margin: "16px auto" }} />
        <SortGroup
          title="Type"
          highestValue={<img src={colorless} alt="colorless" />}
          lowestValue={<img src={water} alt="water" />}
          handleSortClick={setSortPokemonBy}
          sortPokemonBy={sortPokemonBy}
          sortBy="types"
        />
      </div>
    </form>
  );
}

export default PokemonFiltersSection;
