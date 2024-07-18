import React from "react";
import "./Table.css";
function Table({ title, data }) {
  console.log(data);
  return (
    <div className="table-holder">
      <h3>{title}</h3>
      <table className="styled-table">
        <thead>
          <tr>
            <th># of Masters</th>
            <th>Points for cut</th>
            <th>Bubbled in</th>
            <th>Bubbled out</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tournament, i) => (
            <tr key={i}>
              <td>{tournament.masters}</td>
              <td>{tournament.pointsForCut}</td>
              <td>{tournament.bubbledIn}</td>
              <td>{tournament.bubbledOut}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
