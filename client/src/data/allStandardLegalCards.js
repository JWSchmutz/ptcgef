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
];

console.log("aslc", allStandardLegalCards);

allStandardLegalCards.forEach((card) => {
  delete card.cardmarket;
  delete card.tcgplayer;
  delete card.artist;
  delete card.rarity;
  delete card.legality;
});

let byName = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
};

console.log(
  "Pokémon",
  allStandardLegalCards
    .filter(
      (card) => card.regulationMark !== "G" && card.supertype === "Pokémon",
    )
    .sort(byName),
);
console.log(
  "trainer",
  allStandardLegalCards
    .filter(
      (card) => card.regulationMark !== "G" && card.supertype === "Trainer",
    )
    .sort(byName),
);
let bySubtype = (a, b) => {
  if (a.subtypes[0] < b.subtypes[0]) {
    return 1;
  }
  if (a.subtypes[0] > b.subtypes[0]) {
    return -1;
  }
  return 0;
};

console.log(
  "energy",
  allStandardLegalCards
    .filter(
      (card) => card.regulationMark !== "G" && card.supertype === "Energy",
    )
    .sort(byName)
    .sort(bySubtype),
);
