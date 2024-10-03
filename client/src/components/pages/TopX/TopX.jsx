import { useState, useEffect } from "react";
import "./TopX.css";
import america from "../../../data/america";

function TopX() {
  return (
    <main id="top-x">
      <h2 className="page-title">Top X Race - (NA Masters Beta)</h2>
      <h3>CP race excluding locals</h3>
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
          {Object.keys(america)
            .sort(
              (a, b) =>
                america[b].reduce((total, num) => total + num, 0) -
                america[a].reduce((total, num) => total + num, 0)
            )
            .map((keyName, i) => (
              <tr className="travelcompany-input" key={i}>
                <td> {i + 1}</td>
                <td>{keyName}</td>
                <td>
                  {america[keyName].reduce((total, num) => total + num, 0)}
                </td>
                <td>{america[keyName].join(", ")}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </main>
  );
}

export default TopX;
