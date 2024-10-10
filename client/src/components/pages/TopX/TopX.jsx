import { useState, useEffect } from "react";
import "./TopX.css";
import america from "../../../data/america";
import Button from "../../Button/Button";

function TopX() {
  const autoInvites = ["Henry Chao [US]"];
  const [showAutoInvites, setShowAutoInvites] = useState(true);
  const [currentAmerica, setCurrentAmerica] = useState(america);

  useEffect(() => {
    if (showAutoInvites) return setCurrentAmerica(america);
    const americaInstance = { ...america };
    autoInvites.forEach((autoInvitee) => delete americaInstance[autoInvitee]);
    return setCurrentAmerica(americaInstance);
  }, [showAutoInvites]);

  return (
    <main id="top-x">
      <h2 className="page-title">Top X Race - (NA Masters Beta)</h2>
      <h3>CP race excluding locals</h3>
      <Button
        text={showAutoInvites ? "Hide Auto Invites" : "Show Auto Invites"}
        handleClick={() => setShowAutoInvites(!showAutoInvites)}
        square
        classes="show-hide-auto-invites-button"
      />
      <table>
        <thead>
          <tr>
            <th>Placement</th>
            <th>Name</th>
            <th>Majors CP</th>
            <th>CP Finishes</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(currentAmerica)
            .sort(
              (a, b) =>
                currentAmerica[b].reduce((total, num) => total + num, 0) -
                currentAmerica[a].reduce((total, num) => total + num, 0)
            )
            .map((keyName, i) => (
              <tr className="travelcompany-input" key={i}>
                <td> {i + 1}</td>
                <td>{keyName}</td>
                <td>
                  {currentAmerica[keyName].reduce(
                    (total, num) => total + num,
                    0
                  )}
                </td>
                <td>{currentAmerica[keyName].join(", ")}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default TopX;
