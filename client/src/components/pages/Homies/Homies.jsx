import { useState, useEffect } from "react";
import "./Homies.css";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import Homie from "../../Homie/Homie";
import Loading from "../../Loading/Loading";

function Homies() {
  const [allRecentPlayers, setAllRecentPlayers] = useState([]);
  const [loadingForMostRecentEventsCheck, setLoadingForMostRecentEventsCheck] =
    useState(true);
  const [loadingForMostRecentEvents, setLoadingForMostRecentEvents] =
    useState(true);
  const [homieChosen, setHomieChosen] = useState(false);
  const [tournament1, setTournament1] = useState({ players: [] });
  const [tournament2, setTournament2] = useState({ players: [] });
  const [tournament3, setTournament3] = useState({ players: [] });
  const [newHomie, setNewHomie] = useState("");
  const [selectedHomie, setSelectedHomie] = useState(allRecentPlayers[0]);
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
      allRecentPlayers.filter((player) =>
        player.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setNewHomie(e.target.value);
  };
  const [allPlayers, setAllPlayers] = useState([...allRecentPlayers]);

  useEffect(() => {
    const getPlayers = async (id, name) => {
      const url = `/players/${id}`;
      const response = await fetch(url);
      const data = await response.json();
      return { players: data.tournament_data[0].data, name };
    };
    const getTournaments = () => {
      const url = "/tournaments";
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setTimeout(() => {
            setLoadingForMostRecentEventsCheck(false);
          }, 3000);

          Promise.all([
            getPlayers(data[data.length - 1].id, data[data.length - 1].name),
            getPlayers(data[data.length - 2].id, data[data.length - 2].name),
            getPlayers(data[data.length - 3].id, data[data.length - 3].name),
          ]).then(([res1, res2, res3]) => {
            setTournament1(res1);
            setTournament2(res2);
            setTournament3(res3);
            setAllRecentPlayers([
              ...new Set(
                [...res1.players, ...res2.players, ...res3.players].map(
                  (obj) => obj.name
                )
              ),
            ]);
            setLoadingForMostRecentEvents(false);
          });
        });
    };
    getTournaments();
  }, [homies]);
  return (
    <main id="homies">
      <h2 className="page-title">Homies - Beta</h2>
      {loadingForMostRecentEventsCheck ? (
        <Loading text="Checking for most recent events." />
      ) : loadingForMostRecentEvents ? (
        <Loading text="Getting players from most recent events." />
      ) : (
        <div>
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
        </div>
      )}
    </main>
  );
}

export default Homies;
