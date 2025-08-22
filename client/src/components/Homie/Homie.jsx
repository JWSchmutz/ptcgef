import "./Homie.css";
import close from "/close.png";
import Card from "../Card/Card";
import Loading from "../Loading/Loading.jsx";

function Homie({
  homie,
  tournament1,
  tournament2,
  tournament3,
  setHomies,
  waiting,
}) {
  const removeFromString = (words, str) => {
    return words.reduce((result, word) => result.replaceAll(word, ""), str);
  };

  const removeHomie = (homie) => {
    const homiesArray = JSON.parse(localStorage.getItem("homies"));
    homiesArray.splice(homiesArray.indexOf(homie), 1);
    localStorage.setItem("homies", JSON.stringify(homiesArray));
    setHomies(homiesArray);
  };
  const words = [
    "Pokémon",
    "TCG",
    "Championships",
    "Championship",
    "2024",
    "2025",
    "2026",
    "2027",
    "2028",
    "2029",
    "2030",
  ];

  return (
    <Card title={homie} className="homie">
      <img
        className="close"
        src={close}
        alt="remove homie"
        onClick={() => removeHomie(homie)}
      />
      {tournament1.player && (
        <div className="tournament tournament1">
          {removeFromString(words, tournament1.name)} <br />
          {tournament1.player.record?.wins}-{tournament1.player.record?.losses}-
          {tournament1.player.record?.ties}
        </div>
      )}
      {tournament2.player && (
        <div className="tournament tournament2">
          {removeFromString(words, tournament2.name)} <br />
          {tournament2.player.record?.wins}-{tournament2.player.record?.losses}-
          {tournament2.player.record?.ties}
        </div>
      )}
      {tournament3.player && (
        <div className="tournament tournament3">
          {removeFromString(words, tournament3.name)} <br />
          {tournament3.player.record?.wins}-{tournament3.player.record?.losses}-
          {tournament3.player.record?.ties}
        </div>
      )}
      {waiting ? (
        <p className="tournament">
          <Loading />
        </p>
      ) : (
        !tournament1.player &&
        !tournament2.player &&
        !tournament3.player && (
          <p className="tournament">
            <span style={{ fontWeight: "bold" }}>No recent tournaments</span>
            <br /> If you believe this is an error, try closing this card and
            doing a new search. Players names are sometimes changed in RK9.
          </p>
        )
      )}
    </Card>
  );
}

export default Homie;
