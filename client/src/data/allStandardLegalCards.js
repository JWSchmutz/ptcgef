const modules = import.meta.glob("./legalSets/*.json", { eager: true });

const allStandardLegalCards = Object.values(modules).flatMap((m) => m.default);
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
    subtypes: card.subtypes ? [...card.subtypes].sort() : [],
    rules: card.rules ? [...card.rules].sort() : [],
  });
}

// Pokémon need their own key because they have more gameplay fields
function getPokemonKey(card) {
  if (card.name.includes("Clefairy ex")) console.log(card);
  return JSON.stringify({
    name: card.name,
    supertype: card.supertype,
    subtypes: card.subtypes ? [...card.subtypes].sort() : [],
    hp: card.hp,
    types: card.types,
    evolvesFrom: card.evolvesFrom,
    abilities: card.abilities,
    attacks: card.attacks,
    weaknesses: card.weaknesses,
    resistances: card.resistances,
    retreatCost: card.retreatCost,
  });
}

// --- GENERIC GROUPING FUNCTION ---
function groupAndStack(cards, keyFn) {
  const map = new Map();

  for (const card of cards) {
    const key = keyFn(card);

    if (map.has(key)) {
      map.get(key).altArts.push({
        id: card.id,
        number: card.number,
        images: card.images,
        flavorText: card.flavorText ?? "",
      });
    } else {
      map.set(key, {
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
  }

  return Array.from(map.values());
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
