import { useEffect } from "react";

function CardApi() {
  const allStandardLegalCards = [];
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
            console.log(allStandardLegalCards, data);
          } else {
            console.log("WOOOOOO", allStandardLegalCards, data);
          }
          console.log(allStandardLegalCards, data, page);
        });
    };
    getAllStandardLegalCards();
  }, []);
  return <div>CardApi</div>;
}

export default CardApi;
