// Import each JSON set directly
import sv1 from "./legalSets/sv1.json";
import sv2 from "./legalSets/sv2.json";
import sv3 from "./legalSets/sv3.json";
import sv3pt5 from "./legalSets/sv3pt5.json";
import sv4 from "./legalSets/sv4.json";
import sv4pt5 from "./legalSets/sv4pt5.json";
import sv5 from "./legalSets/sv5.json";
import sv6 from "./legalSets/sv6.json";
import sv6pt5 from "./legalSets/sv6pt5.json";
import sv7 from "./legalSets/sv7.json";
import sv8 from "./legalSets/sv8.json";
import sv8pt5 from "./legalSets/sv8pt5.json";
import sv9 from "./legalSets/sv9.json";
import sv10 from "./legalSets/sv10.json";
import svp from "./legalSets/svp.json";
import me1 from "./legalSets/me1.json";
import me2 from "./legalSets/me2.json";
import me2pt5 from "./legalSets/me2pt5.json";
import me3 from "./legalSets/me3.json";

// Merge all arrays into one big array
let allStandardLegalCards = [
  ...sv1,
  ...sv2,
  ...sv3,
  ...sv3pt5,
  ...sv4,
  ...sv4pt5,
  ...sv5,
  ...sv6,
  ...sv6pt5,
  ...sv7,
  ...sv8,
  ...sv8pt5,
  ...sv9,
  ...sv10,
  ...svp,
  ...me1,
  ...me2,
  ...me2pt5,
  ...me3,
];

console.log("aslc", allStandardLegalCards);

// Remove unwanted fields
allStandardLegalCards.forEach((card) => {
  delete card.cardmarket;
  delete card.tcgplayer;
  delete card.artist;
  delete card.rarity;
  delete card.legality;
});

// Sorting helpers
let byName = (a, b) => {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
};

let bySubtype = (a, b) => {
  if (a.subtypes?.[0] < b.subtypes?.[0]) return 1;
  if (a.subtypes?.[0] > b.subtypes?.[0]) return -1;
  return 0;
};

// --- KEY GENERATORS ---

// Trainers & Energy share the same structure
function getTrainerOrEnergyKey(card) {
  return JSON.stringify({
    name: card.name,
    supertype: card.supertype,
    subtypes: card.subtypes,
    rules: card.rules ? [...card.rules].sort() : [],
    regulationMark: card.regulationMark,
    hp: card.hp,
    evolvesTo: card.evolvesTo,
    abilities: card.abilities,
    types: card.types,
    attacks: card.attacks,
    weaknesses: card.weaknesses,
    retreatCost: card.retreatCost,
    convertedRetreatCost: card.convertedRetreatCost,
    nationalPokedexNumbers: card.nationalPokedexNumbers,
  });
}

// Pokémon need their own key because they have more gameplay fields
function getPokemonKey(card) {
  return JSON.stringify({
    name: card.name,
    supertype: card.supertype,
    subtypes: card.subtypes,
    hp: card.hp,
    types: card.types,
    evolvesFrom: card.evolvesFrom,
    evolvesTo: card.evolvesTo,
    abilities: card.abilities,
    attacks: card.attacks,
    weaknesses: card.weaknesses,
    resistances: card.resistances,
    retreatCost: card.retreatCost,
    regulationMark: card.regulationMark,
    nationalPokedexNumbers: card.nationalPokedexNumbers,
  });
}

// --- GENERIC GROUPING FUNCTION ---
function groupAndStack(cards, keyFn) {
  const unique = [];

  cards.forEach((card) => {
    const key = keyFn(card);
    const match = unique.find((c) => keyFn(c) === key);

    if (match) {
      match.altArts.push({
        id: card.id,
        number: card.number,
        images: card.images,
        flavorText: card.flavorText ?? "",
      });
    } else {
      unique.push({
        ...card,
        altArts: [
          {
            id: card.id,
            number: card.number,
            images: card.images,
            flavorText: card.flavorText ?? "",
          },
        ],
      });
    }
  });

  return unique;
}

// --- ENERGY ---
const energyCards = allStandardLegalCards.filter(
  (card) => card.regulationMark !== "G" && card.supertype === "Energy",
);

const uniqueEnergy = groupAndStack(energyCards, getTrainerOrEnergyKey);
console.log("energy (stacked)", uniqueEnergy.sort(byName).sort(bySubtype));

// --- TRAINERS ---
const trainerCards = allStandardLegalCards.filter(
  (card) => card.regulationMark !== "G" && card.supertype === "Trainer",
);

const uniqueTrainers = groupAndStack(trainerCards, getTrainerOrEnergyKey);
console.log("trainer (stacked)", uniqueTrainers.sort(byName));

// Remove repeats: keep only first variant for each unique card
const seenKeys = new Set();
const filteredUniqueTrainers = uniqueTrainers.filter((card) => {
  const key = getTrainerOrEnergyKey(card);
  if (seenKeys.has(key)) return false;
  seenKeys.add(key);
  return true;
});
console.log("trainer (stacked, filtered)", filteredUniqueTrainers);

// --- POKÉMON ---
const pokemonCards = allStandardLegalCards.filter(
  (card) => card.regulationMark !== "G" && card.supertype === "Pokémon",
);

const uniquePokemon = groupAndStack(pokemonCards, getPokemonKey);
console.log("pokemon (stacked)", uniquePokemon.sort(byName));
