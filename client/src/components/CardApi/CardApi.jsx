import { useEffect } from "react";

function CardApi() {
  let allStandardLegalCards = [];
  let page = 1;

  useEffect(() => {
    const getAllStandardLegalCards = () => {
      const url = `https://api.pokemontcg.io/v2/cards?q=set.legalities.standard:legal%20legalities.standard:legal&page=${page}`;
      fetch(url, {
        headers: {
          "X-Api-key": "c7d98093-9347-4504-92d8-0387131ab03b",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          allStandardLegalCards.push(...data.data);
          if (data.count) {
            page++;
            getAllStandardLegalCards();
            console.log("finished page " + page);
          } else {
            console.log("WOOOOOO", allStandardLegalCards, data);
            allStandardLegalCards.forEach((card) => {
              delete card.cardmarket;
              delete card.tcgplayer;
              if (card.id === "swsh9-132") card.regulationMark = "F";
            });
            allStandardLegalCards = allStandardLegalCards.filter(
              (card) => card.regulationMark !== "D"
            );
            allStandardLegalCards = allStandardLegalCards.filter(
              (card) => card.regulationMark !== "E"
            );
            const allStandardLegalPokemon = allStandardLegalCards.filter(
              (card) => card.supertype === "Pokémon"
            );
            allStandardLegalPokemon.forEach((pokemon) => {
              if (
                !pokemon.rules ||
                !pokemon?.rules[0].includes("Prize cards")
              ) {
                pokemon.subtypes.push("1 Prizer");
              }
              if (!pokemon.retreatCost) pokemon.subtypes.push("Free Retreat");
              if (pokemon.abilities) pokemon.subtypes.push("Ability");
            });

            allStandardLegalPokemon.sort((a, b) =>
              a.name < b.name ? -1 : a.name > b.name ? 1 : 0
            );

            const newSetPoke = allStandardLegalPokemon.filter((card, i) => {
              if (
                allStandardLegalPokemon.findIndex(
                  (element) =>
                    element.name === card.name &&
                    element.hp === card.hp &&
                    element?.attacks?.[0]?.text === card?.attacks?.[0]?.text &&
                    element?.attacks?.[1]?.text === card?.attacks?.[1]?.text &&
                    element?.attacks?.[0]?.name === card?.attacks?.[0]?.name &&
                    element?.attacks?.[1]?.name === card?.attacks?.[1]?.name &&
                    element.types[0] === card.types[0]
                ) !== i
              )
                return false;
              return true;
            });
            console.log("final pokemon", newSetPoke);

            const allStandardLegalTrainers = allStandardLegalCards.filter(
              (card) => card.supertype === "Trainer"
            );
            allStandardLegalTrainers.sort((a, b) =>
              a.name < b.name ? -1 : a.name > b.name ? 1 : 0
            );

            const listOfCardNames = [];
            const newSetTrainers = allStandardLegalTrainers.filter((card) => {
              if (listOfCardNames.includes(card.name)) return false;
              listOfCardNames.push(card.name);
              return true;
            });

            newSetTrainers.forEach((card) => {
              if (
                card.subtypes.length === 1 ||
                (card.subtypes.length === 2 &&
                  card.subtypes.includes("Item") &&
                  card.subtypes.includes("Pokémon Tool"))
              )
                card.subtypes.push("No Tag");
            });
            console.log("final trainers", newSetTrainers);

            const allStandardLegalEnergy = allStandardLegalCards.filter(
              (card) => card.supertype === "Energy"
            );
            const listOfEnergyCardNames = [];
            const newSetEnergy = allStandardLegalEnergy.filter((card) => {
              if (listOfEnergyCardNames.includes(card.name)) return false;
              listOfEnergyCardNames.push(card.name);
              return true;
            });

            newSetEnergy.forEach((card) => {
              if (!card.subtypes) return (card.subtypes = ["No Tag"]);
              if (card.subtypes.length < 2) return card.subtypes.push("No Tag");
            });
            const basicEnergyList = newSetEnergy.filter(
              (energy) => !energy.rules
            );
            basicEnergyList.sort((a, b) =>
              a.name < b.name ? -1 : a.name > b.name ? 1 : 0
            );
            const specialEnergyList = newSetEnergy.filter(
              (energy) => energy.rules
            );
            specialEnergyList.sort((a, b) =>
              a.name < b.name ? -1 : a.name > b.name ? 1 : 0
            );
            const sortedNewSetEnergy = [
              ...specialEnergyList,
              ...basicEnergyList,
            ];
            console.log("final energy", sortedNewSetEnergy);
          }
        });
    };
    getAllStandardLegalCards();
  }, []);
  return <div>CardApi</div>;
}

export default CardApi;
