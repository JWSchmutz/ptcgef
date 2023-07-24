import "./SortGroup.css";

function SortGroup({
  title,
  highestValue,
  lowestValue,
  handleSortClick,
  sortBy,
  sortPokemonBy,
}) {
  return (
    <div className="sort-group">
      <h4>{title}</h4>
      <div className="d-flex justify-content-around">
        <button
          type="button"
          className={
            sortBy === sortPokemonBy[0] && sortPokemonBy[1] === "high"
              ? "btn btn-primary active"
              : "btn btn-primary"
          }
          onClick={() => handleSortClick([sortBy, "high"])}
        >
          {highestValue} ↓
        </button>
        <button
          type="button"
          className={
            sortBy === sortPokemonBy[0] && sortPokemonBy[1] === "low"
              ? "btn btn-primary active"
              : "btn btn-primary"
          }
          onClick={() => handleSortClick([sortBy, "low"])}
        >
          {lowestValue} ↑
        </button>
      </div>
    </div>
  );
}

export default SortGroup;
