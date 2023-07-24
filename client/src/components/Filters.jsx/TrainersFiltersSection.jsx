import { useEffect, useContext } from "react";
import Checkbox from "../Checkbox/Checkbox";
import FilterContext from "../../context/filter-context";
import SearchContext from "../../context/search-context";
import allStandardLegalTrainers from "../../data/allStandardLegalTrainers";

function TrainerFiltersSection({
  trainerTypesToFilterOut,
  setTrainerTypesToFilterOut,
}) {
  const { cardsToShow, setCardsToShow } = useContext(FilterContext);
  const { searchText } = useContext(SearchContext);
  const filterTrainers = (e) => {
    if (!e.target.checked)
      setTrainerTypesToFilterOut([e.target.value, ...trainerTypesToFilterOut]);
    if (e.target.checked) {
      const newTrainerTypesToFilterOut = trainerTypesToFilterOut.filter(
        (element) => element !== e.target.value
      );
      setTrainerTypesToFilterOut(newTrainerTypesToFilterOut);
    }
  };
  useEffect(() => {
    let newTrainerCardsToShow = [...allStandardLegalTrainers];
    trainerTypesToFilterOut.forEach((trainerType) => {
      newTrainerCardsToShow = newTrainerCardsToShow.filter(
        (card) => !card.subtypes?.includes(trainerType)
      );
    });
    newTrainerCardsToShow = newTrainerCardsToShow.filter(
      (card) =>
        card.name.toLowerCase().includes(searchText.toLowerCase()) ||
        card.rules?.[0]?.toLowerCase().includes(searchText.toLowerCase())
    );
    setCardsToShow(newTrainerCardsToShow);
  }, [trainerTypesToFilterOut, cardsToShow, searchText]);

  return (
    <form className="filter-form">
      <div className="col">
        <Checkbox value="Item" label="Items" onChange={filterTrainers} />
        <Checkbox
          value="Supporter"
          label="Supporters"
          onChange={filterTrainers}
        />
        <Checkbox value="Stadium" label="Stadiums" onChange={filterTrainers} />
        <Checkbox
          value="Pokémon Tool"
          id="PokémonTool"
          label="Tools"
          onChange={filterTrainers}
        />
      </div>
      <div className="col">
        <Checkbox
          value="Rapid Strike"
          id="RapidStrike"
          onChange={filterTrainers}
        />
        <Checkbox
          value="Single Strike"
          id="SingleStrike"
          onChange={filterTrainers}
        />
        <Checkbox
          value="Fusion Strike"
          id="FusionStrike"
          onChange={filterTrainers}
        />
        <Checkbox value="No Tag" id="noTag" onChange={filterTrainers} />
      </div>
    </form>
  );
}

export default TrainerFiltersSection;
