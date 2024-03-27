import { useState, useEffect, useContext, createContext } from "react";
import allStandardLegalPokemon from "../../../data/allStandardLegalPokemon";
import Filters from "../../Filters/Filters";
import Loading from "../../Loading/Loading.jsx";
import Modal from "../../Modal/Modal.jsx";
import Button from "../../Button/Button";
import FilterContext from "../../../context/filter-context";
import SearchContext from "../../../context/search-context";
import PokemonCard from "../../PokemonCard/PokemonCard";
import "./CardSearch.css";
// import CardApi from "../../CardApi/CardApi.jsx";
import "../../../data/originalJsonResponse.js";

function CardSearch() {
  const [showAll, setShowAll] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalCardImage, setModalCardImage] = useState(false);
  const [modalCardName, setModalCardName] = useState(false);
  const [cardsToShow, setCardsToShow] = useState(allStandardLegalPokemon);
  const [checked, setChecked] = useState("pokemon");

  const handleCardClick = (cardImage, cardName) => {
    setShowModal(true);
    setModalCardImage(cardImage);
    setModalCardName(cardName);
  };
  const handleCloseModalClick = () => setShowModal(false);

  useEffect(() => {
    setShowAll(false);
    setLoading(false);
  }, [checked, searchText]);
  return (
    <FilterContext.Provider value={{ cardsToShow: "hi", setCardsToShow }}>
      <SearchContext.Provider value={{ searchText, setSearchText }}>
        {/* <CardApi></CardApi> */}
        <div id="card-search">
          <h2 className="page-title">Card Search</h2>
          {showModal && (
            <Modal
              cardName={modalCardName}
              cardImage={modalCardImage}
              handleCloseModalClick={handleCloseModalClick}
            />
          )}
          <Filters
            checked={checked}
            setLoading={setLoading}
            setChecked={setChecked}
          />
          {loading && <Loading />}
          {!loading && (
            <section className="card-holder">
              {cardsToShow.length
                ? cardsToShow.map((card, i) => {
                    return (
                      <PokemonCard
                        key={card.id}
                        i={i}
                        card={card}
                        showAll={showAll}
                        handleCardClick={handleCardClick}
                      />
                    );
                  })
                : "No cards match your search parameters.  Please refine your search."}
            </section>
          )}
          {!showAll && cardsToShow.length > 53 && (
            <div className="partial-loading-section">
              <p>
                To decrease load time and improve user experience, I have only
                loaded the first few cards. Would you like to load all?
              </p>
              <Button
                classes="show-all-button"
                text="Load All"
                handleClick={() => setShowAll(true)}
              />
            </div>
          )}
        </div>
      </SearchContext.Provider>
    </FilterContext.Provider>
  );
}

export default CardSearch;
