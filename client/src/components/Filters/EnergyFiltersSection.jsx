import { useEffect, useContext } from "react";
import Checkbox from "../Checkbox/Checkbox";
import FilterContext from "../../context/filter-context";
import SearchContext from "../../context/search-context";
import allStandardLegalEnergy from "../../data/allStandardLegalEnergy";

function EnergyFiltersSection({
  energyTypesToFilterOut,
  setEnergyTypesToFilterOut,
}) {
  const { cardsToShow, setCardsToShow } = useContext(FilterContext);
  const { searchText } = useContext(SearchContext);
  const filterEnergy = (e) => {
    if (!e.target.checked)
      setEnergyTypesToFilterOut([e.target.value, ...energyTypesToFilterOut]);
    if (e.target.checked) {
      const newEnergyTypesToFilterOut = energyTypesToFilterOut.filter(
        (element) => element !== e.target.value
      );
      setEnergyTypesToFilterOut(newEnergyTypesToFilterOut);
    }
  };
  useEffect(() => {
    let newEnergyCardsToShow = [...allStandardLegalEnergy];
    energyTypesToFilterOut.forEach((energyType) => {
      energyType === "Special"
        ? (newEnergyCardsToShow = newEnergyCardsToShow.filter(
            (card) => !card.rules
          ))
        : energyType === "Basic"
        ? (newEnergyCardsToShow = newEnergyCardsToShow.filter(
            (card) => card.rules
          ))
        : (newEnergyCardsToShow = newEnergyCardsToShow.filter(
            (card) => !card.subtypes?.includes(energyType)
          ));
    });
    newEnergyCardsToShow = newEnergyCardsToShow.filter((card) => {
      return (
        card.name.toLowerCase().includes(searchText.toLowerCase()) ||
        card?.rules?.[0]?.toLowerCase().includes(searchText.toLowerCase()) ||
        card?.rules?.[1]?.toLowerCase().includes(searchText.toLowerCase())
      );
    });

    setCardsToShow(newEnergyCardsToShow);
  }, [energyTypesToFilterOut, cardsToShow, searchText]);

  return (
    <form className="filter-form">
      <div className="col">
        <Checkbox value="Basic" onChange={filterEnergy} />
        <Checkbox value="Special" onChange={filterEnergy} />
      </div>
      <div className="col">
        <Checkbox value="ACE SPEC" onChange={filterEnergy} />
        <Checkbox value="No Tag" id="noTag" onChange={filterEnergy} />
      </div>
    </form>
  );
}

export default EnergyFiltersSection;
