import { useState, useEffect } from "react";
import "./Homies.css";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Homie from "../../Homie/Homie";
import allPlayersEver from "../../../data/allPlayers";

function Homies() {
  const [homieChosen, setHomieChosen] = useState(false);
  const [tournament1, setTournament1] = useState({ players: [] });
  const [tournament2, setTournament2] = useState({ players: [] });
  const [tournament3, setTournament3] = useState({ players: [] });
  const [newHomie, setNewHomie] = useState("");
  const [selectedHomie, setSelectedHomie] = useState(allPlayersEver[0]);
  const [homies, setHomies] = useState(
    JSON.parse(localStorage.getItem("homies")) || []
  );
  const handleSelectChange = (e) => {
    setHomieChosen(true);
    return setSelectedHomie(e.target.value);
  };
  const handleAddClick = () => {
    setHomieChosen(false);
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
      console.log(name, data);
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
          console.log(data.length);
        });
    };
    getTournaments();
  }, [homies]);
  return (
    <main id="homies">
      <h2 className="page-title">Homies - Beta</h2>
      {homies[0] && (
        <div>
          {homies.map((homie) => (
            <Homie
              key={homie}
              homie={homie}
              setHomies={setHomies}
              waiting={tournament1.players.length === 0}
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
          label="Filter Players"
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
              <option>Choose a homie</option>
              {allPlayers.map((player) => (
                <option key={player}>{player}</option>
              ))}
            </select>
            {homieChosen && (
              <Button
                text="+ ADD"
                handleClick={handleAddClick}
                classes="add-button"
              />
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default Homies;
