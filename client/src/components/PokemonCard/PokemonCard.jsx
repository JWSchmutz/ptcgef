import "./PokemonCard.css";

function PokemonCard({
  card,
  i,
  showDeckListArea,
  showAll,
  handleCardClick,
  handleRemoveCardFromDeckListClick,
  handleAddCardToDeckListClick,
}) {
  return (
    <div
      style={{ display: i > 53 && !showAll ? "none" : "" }}
      className="pokemon-card"
      onClick={() => handleCardClick(card.images.large, card.name)}
    >
      <img src={card.images.small} alt={card.name} loading="lazy" />
      {showDeckListArea && (
        <div className="addOrRemoveCard d-flex justify-content-around">
          <button
            onClick={(e) => handleRemoveCardFromDeckListClick(e, card)}
            className="btn btn-lg btn-danger"
          >
            -
          </button>
          <button
            onClick={(e) => handleAddCardToDeckListClick(e, card)}
            className="btn btn-lg btn-success"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonCard;
