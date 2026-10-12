import { useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import PokemonFiltersSection from "./PokemonFiltersSection";
import TrainersFiltersSection from "./TrainersFiltersSection";
import EnergyFiltersSection from "./EnergyFiltersSection";
import SearchContext from "../../context/search-context";
import Input from "../Input/Input";

function Filters({ setChecked, setLoading, checked }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchText, setSearchText } = useContext(SearchContext);
  const [energyTypesToFilterOut, setEnergyTypesToFilterOut] = useState("Basic");
  const [trainerTypesToFilterOut, setTrainerTypesToFilterOut] = useState([]);
  const pokemonTypesToFilterOut = searchParams.getAll("exclude");
  const onlyShowPokemonThatAre = searchParams.getAll("only");
  const setPokemonTypesToFilterOut = (types) =>
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("exclude");
        types.forEach((type) => nextParams.append("exclude", type));
        return nextParams;
      },
      { replace: true }
    );
  const setOnlyShowPokemonThatAre = (types) =>
    setSearchParams(
      (currentParams) => {
        const nextParams = new URLSearchParams(currentParams);
        nextParams.delete("only");
        types.forEach((type) => nextParams.append("only", type));
        return nextParams;
      },
      { replace: true }
    );
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchTextChange = (e) => setSearchText(e.target.value);
  const handleTabChange = (e) => {
    setLoading(true);
    setChecked(e.target.getAttribute("id"));
    if (e.target.getAttribute("id") === "energy") setEnergyTypesToFilterOut([]);
    if (e.target.getAttribute("id") === "pokemon") {
      setSearchParams(
        (currentParams) => {
          const nextParams = new URLSearchParams(currentParams);
          nextParams.delete("exclude");
          nextParams.delete("only");
          return nextParams;
        },
        { replace: true }
      );
    }
    if (e.target.getAttribute("id") === "trainer")
      setTrainerTypesToFilterOut([]);
  };

  return (
    <section>
      <div className="form-outline m-auto mb-4">
        <Input
          id="pkmnSearch"
          label="Search for name or text"
          square={true}
          handleChange={handleSearchTextChange}
          value={searchText}
        />
      </div>
      <div className="tabs d-flex justify-content-around">
        <h2
          id="pokemon"
          className={checked === "pokemon" ? "active mb-0" : "mb-0"}
          onClick={checked === "pokemon" ? () => {} : handleTabChange}
        >
          Pokemon
        </h2>
        <h2
          id="trainers"
          className={checked === "trainers" ? "active mb-0" : "mb-0"}
          onClick={checked === "trainers" ? () => {} : handleTabChange}
        >
          Trainers
        </h2>
        <h2
          id="energy"
          className={checked === "energy" ? "active mb-0" : "mb-0"}
          onClick={checked === "energy" ? () => {} : handleTabChange}
        >
          Energy
        </h2>
      </div>
      <div
        className={
          showFilters
            ? "subTypes row pt-2 mb-3 rounded-9"
            : "subTypes row pt-2 mb-3 rounded-9 dont-show-filters"
        }
      >
        <p
          onClick={() => setShowFilters(!showFilters)}
          className="show-hide-filters"
        >
          Filters {showFilters ? <span>&uarr;</span> : <span>&darr;</span>}
        </p>
        {checked === "pokemon" && (
          <PokemonFiltersSection
            pokemonTypesToFilterOut={pokemonTypesToFilterOut}
            setPokemonTypesToFilterOut={setPokemonTypesToFilterOut}
            onlyShowPokemonThatAre={onlyShowPokemonThatAre}
            setOnlyShowPokemonThatAre={setOnlyShowPokemonThatAre}
          />
        )}
        {checked === "trainers" && (
          <TrainersFiltersSection
            trainerTypesToFilterOut={trainerTypesToFilterOut}
            setTrainerTypesToFilterOut={setTrainerTypesToFilterOut}
          />
        )}
        {checked === "energy" && (
          <EnergyFiltersSection
            energyTypesToFilterOut={energyTypesToFilterOut}
            setEnergyTypesToFilterOut={setEnergyTypesToFilterOut}
          />
        )}
      </div>
    </section>
  );
}

export default Filters;
