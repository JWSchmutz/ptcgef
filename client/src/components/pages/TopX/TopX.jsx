import { useState, useEffect } from "react";
import "./TopX.css";
import NA from "../../../data/NA";
import EU from "../../../data/EU";
import LA from "../../../data/LA";
import OC from "../../../data/OC";
import MESA from "../../../data/MESA";
import Button from "../../Button/Button";

function TopX() {
  const autoInvites = [
    "Raz Wolpe [IL]",
    "Jesse Parker [US]",
    "Fernando Cifuentes [CL]",
    "Henry Chao [US]",
    "Caleb Gedemer [US]",
    "James Cox [NL]",
    "Yerco Valencia [CL]",
    "Giovanny Sasso [BR]",
    "Alberto Conti [IT]",
    "miloslav posledni [CZ]",
    "Jeremy Gumila [US]",
    "Brent Tonisson [AU]",
    "ILYA KORNILOV [FI]",
    "Daniel Magda [CZ]",
    "Landen Kaetler [CA]",
    "Aarni Karjala [FI]",
    "Francisco Osorio [CL]",
    "Calvin Connor [US]",
  ];
  const [showAutoInvites, setShowAutoInvites] = useState(true);
  const [currentRegionData, setCurrentRegionData] = useState(NA);
  const [currentRegion, setCurrentRegion] = useState(
    localStorage.getItem("currentRegion") || "NA"
  );

  useEffect(() => {
    if (showAutoInvites)
      switch (currentRegion) {
        case "NA":
          return setCurrentRegionData(NA);
        case "EU":
          return setCurrentRegionData(EU);
        case "LA":
          return setCurrentRegionData(LA);
        case "OC":
          return setCurrentRegionData(OC);
        case "MESA":
          return setCurrentRegionData(MESA);
      }
    const CurrentRegionInstance = { ...currentRegionData };
    autoInvites.forEach(
      (autoInvitee) => delete CurrentRegionInstance[autoInvitee]
    );
    return setCurrentRegionData(CurrentRegionInstance);
  }, [showAutoInvites]);

  return (
    <main id="top-x">
      <h2 className="page-title">Top X Race</h2>
      <h3>CP race excluding locals</h3>
      <Button
        text={showAutoInvites ? "Hide Auto Invites" : "Show Auto Invites"}
        handleClick={() => setShowAutoInvites(!showAutoInvites)}
        square
        classes="show-hide-auto-invites-button"
      />
      <div className="regionControl">
        <Button
          text="EU"
          handleClick={() => {
            setCurrentRegion("EU");
            setCurrentRegionData(EU);
            setShowAutoInvites(true);
            localStorage.setItem("currentRegion", "EU");
          }}
          square
          color="white"
          classes="show-hide-auto-invites-button"
          reverse={currentRegion === "EU" ? true : false}
        />
        <Button
          text="LA"
          handleClick={() => {
            setCurrentRegion("LA");
            setCurrentRegionData(LA);
            setShowAutoInvites(true);
            localStorage.setItem("currentRegion", "LA");
          }}
          square
          classes="show-hide-auto-invites-button"
          reverse={currentRegion === "LA" ? true : false}
        />
        <Button
          text="MESA"
          handleClick={() => {
            setCurrentRegion("MESA");
            setCurrentRegionData(MESA);
            setShowAutoInvites(true);
            localStorage.setItem("currentRegion", "MESA");
          }}
          square
          classes="show-hide-auto-invites-button"
          reverse={currentRegion === "MESA" ? true : false}
        />
        <Button
          text="NA"
          handleClick={() => {
            setCurrentRegion("NA");
            setCurrentRegionData(NA);
            setShowAutoInvites(true);
            localStorage.setItem("currentRegion", "NA");
          }}
          square
          classes="show-hide-auto-invites-button"
          reverse={currentRegion === "NA" ? true : false}
        />
        <Button
          text="OC"
          handleClick={() => {
            setCurrentRegion("OC");
            setCurrentRegionData(OC);
            setShowAutoInvites(true);
            localStorage.setItem("currentRegion", "OC");
          }}
          square
          classes="show-hide-auto-invites-button"
          reverse={currentRegion === "OC" ? true : false}
        />
      </div>
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
          {Object.keys(currentRegionData)
            .sort(
              (a, b) =>
                currentRegionData[b].reduce((total, num) => total + num, 0) -
                currentRegionData[a].reduce((total, num) => total + num, 0)
            )
            .map((keyName, i) => (
              <tr className="travelcompany-input" key={i}>
                <td> {i + 1}</td>
                <td>{keyName}</td>
                <td>
                  {currentRegionData[keyName].reduce(
                    (total, num) => total + num,
                    0
                  )}
                </td>
                <td>{currentRegionData[keyName].join(", ")}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <p>Notice: Complete data accuracy cannot be guaranteed</p>
    </main>
  );
}

export default TopX;
