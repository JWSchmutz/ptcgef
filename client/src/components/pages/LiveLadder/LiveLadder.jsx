import { useState, useEffect } from "react";
import "./LiveLadder.css";
import Live from "../../../../../db.json";
import ImageUpload from "../../ImageUpload/ImageUpload";
import Button from "../../Button/Button";

function LiveLadder() {
  return (
    <main id="live-ladder">
      <h2 className="page-title">
        Live Ladder Rankings
        <br /> PRE BETA VERSION
      </h2>
      <ImageUpload></ImageUpload>
      <table>
        <thead>
          <tr>
            <th>Placement</th>
            <th>Name</th>
            <th>Elo</th>
          </tr>
        </thead>
        <tbody>
          {Live.map((player, i) => (
            <tr className="travelcompany-input" key={i}>
              <td> {i + 1}</td>
              <td>{player.username}</td>
              <td>{player.elo}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Notice: Complete data accuracy cannot be guaranteed</p>
    </main>
  );
}

export default LiveLadder;
