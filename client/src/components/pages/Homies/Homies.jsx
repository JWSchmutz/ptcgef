import { useState, useEffect } from "react";
import "./Homies.css";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Homie from "../../Homie/Homie";
import allPlayersEver from "../../../data/allPlayers";

function Homies() {
  const [tournament1, setTournament1] = useState({ players: [] });
  const [tournament2, setTournament2] = useState({ players: [] });
  const [tournament3, setTournament3] = useState({ players: [] });
  const [newHomie, setNewHomie] = useState("");
  const [selectedHomie, setSelectedHomie] = useState(allPlayersEver[0]);
  const [homies, setHomies] = useState(
    JSON.parse(localStorage.getItem("homies")) || []
  );
  const handleSelectChange = (e) => setSelectedHomie(e.target.value);
  const handleAddClick = () => {
    console.log(selectedHomie);
    if (selectedHomie === "Choose a player") return;
    homies.push(selectedHomie);
    localStorage.setItem("homies", JSON.stringify(homies));
    setHomies([...homies]);
  };
  const newHomieTextChange = (e) => {
    setAllPlayers(
      allPlayersEver.filter((player) =>
        player.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setNewHomie(e.target.value);
  };
  const [allPlayers, setAllPlayers] = useState([...allPlayersEver]);

  useEffect(() => {
    const getPlayers = async (id, callBack, name) => {
      const url = `/players/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log("Data", data);
      if (callBack) return callBack({ players: data, name });
    };
    const getTournaments = () => {
      const url = "/tournaments";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          getPlayers(
            data[data.length - 1].id,
            setTournament1,
            data[data.length - 1].name
          );
          getPlayers(
            data[data.length - 2].id,
            setTournament2,
            data[data.length - 2].name
          );
          getPlayers(
            data[data.length - 3].id,
            setTournament3,
            data[data.length - 3].name
          );
        });
    };
    getTournaments();
    // let i = 0;
    // const makeTheCall = () => {
    //   i++;
    //   if (i < 10) getPlayers("000000" + i.toString());
    //   if (i >= 10 && i < 100) getPlayers("00000" + i.toString());
    //   if (i >= 100 && i < 1000) getPlayers("0000" + i.toString());
    //   if (i >= 1000) getPlayers("000" + i.toString());
    //   if (i <= 118) makeTheCall();
    // };
    // makeTheCall();
  }, [homies]);
  return (
    <main id="homies">
      <h2 className="page-title">Homies - Still in Development</h2>
      {homies[0] && (
        <div>
          {homies.map((homie) => (
            <Homie
              key={homie}
              homie={homie}
              setHomies={setHomies}
              tournament1={{
                name: tournament1.name,
                player: tournament1.players.filter(
                  (player) => player.name === homie
                )[0],
              }}
              tournament2={{
                name: tournament2.name,
                player: tournament2.players.filter(
                  (player) => player.name === homie
                )[0],
              }}
              tournament3={{
                name: tournament3.name,
                player: tournament3.players.filter(
                  (player) => player.name === homie
                )[0],
              }}
            />
          ))}
        </div>
      )}
      <div id="addHomiesSection">
        Search for a homie to follow their tournament progress:
        <Input
          id="addHomieInput"
          name="addHomie"
          label="Find a homie "
          type="text"
          value={newHomie}
          handleChange={newHomieTextChange}
        ></Input>
        {allPlayers.length <= 30 && (
          <div>
            <select
              value={selectedHomie}
              onChange={(e) => handleSelectChange(e)}
            >
              <option>Choose a player</option>
              {allPlayers.map((player) => (
                <option key={player}>{player}</option>
              ))}
            </select>
            <Button
              text="+ ADD"
              handleClick={handleAddClick}
              classes="add-button"
            />
          </div>
        )}
      </div>
    </main>
  );
}

export default Homies;
