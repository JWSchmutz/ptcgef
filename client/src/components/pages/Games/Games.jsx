import { useState, useEffect } from "react";
import "./Games.css";
import pokemon from "../../../data/pokemon";

function Games() {
  const [isGuessing, setIsGuessing] = useState(true);
  const [options, setOptions] = useState([...pokemon]);
  const [imgClass, setImgClass] = useState("");
  const [message, setMessage] = useState("Guess the pokemon");
  const [currentPokemon, setCurrentPokemon] = useState(
    pokemon[Math.floor(Math.random() * pokemon.length)]
  );
  const [filterQuery, setFilterQuery] = useState("");
  const handleChange = (e) => {
    setFilterQuery(e.target.value);
  };
  const [selectedPokemon, setSelectedPokemon] = useState("Bulbasaur");
  const handleGuessClick = () => {
    // if (currentPokemon === selectedPokemon)
    return handleCorrectGuess();
    return setImgClass("escaped");
  };
  const handleNextClick = () => {
    setOptions([...pokemon]);
    setImgClass("");
    setFilterQuery("");
    setIsGuessing(true);
    setTimeout(
      () =>
        setCurrentPokemon(pokemon[Math.floor(Math.random() * pokemon.length)]),
      1100
    );
    setMessage("Guess the pokemon");
  };
  const handleCorrectGuess = () => {
    setImgClass("normal");
    setIsGuessing(false);
    setMessage(`It's ${currentPokemon}!`);
  };
  useEffect(() => {
    let options = [...pokemon].filter((option) =>
      option.toLowerCase().includes(filterQuery.toLowerCase())
    );
    options.length ? setOptions(options) : setOptions(["No match"]);
  }, [filterQuery]);
  useEffect(() => {
    setSelectedPokemon(options[0]);
  }, [options]);

  return (
    <main id="games">
      <h2 className="page-title">Poke Guesser</h2>
      <div className="card">
        <p id="message">{message}</p>
        <img
          id="pkmn-img"
          src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${
            pokemon.indexOf(currentPokemon) + 1
          }.png`}
          alt="mystery pokemon"
          draggable={false}
          className={imgClass}
          onError={() =>
            setCurrentPokemon(
              pokemon[Math.floor(Math.random() * pokemon.length)]
            )
          }
        />
        <br />
        <label htmlFor="pokemon-filter">
          Start typing to filter the list below:
        </label>
        <br />
        <input
          name="pokemon-filter"
          id="pokemon-filter"
          value={filterQuery}
          onChange={(e) => handleChange(e)}
        />
        <br />
        <label htmlFor="pokemon-select">Choose a pokemon:</label>
        <br />
        <select
          name="pokemon"
          id="pokemon-select"
          onChange={(e) => setSelectedPokemon(e.target.value)}
        >
          {options.map((pokemon, i) => (
            <option value={pokemon} key={i + 1}>
              {" "}
              {pokemon}{" "}
            </option>
          ))}
        </select>
        <br />
        {isGuessing ? (
          <button className="guess" onClick={handleGuessClick}>
            Reveal
          </button>
        ) : (
          <button className="guess" onClick={handleNextClick}>
            Play Again
          </button>
        )}
      </div>
    </main>
  );
}

export default Games;
