import React from "react";
import "./Table.css";
function TableMajor({ title, data }) {
  return (
    <div className="table-holder">
      <h3>{title}</h3>
      <p>
        <br />
        Points for placement /{" "}
        <span style={{ color: "#66FF99" }}>bubbled&nbsp;in</span> /{" "}
        <span style={{ color: "#FF8080" }}>bubbled&nbsp;out</span>
      </p>
      <table className="styled-table">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th>Tournament</th>
            <th>8</th>
            <th>16</th>
            <th>32</th>
            <th>64</th>
            <th>128</th>
            <th>256</th>
            <th>512</th>
            <th>1024</th>
          </tr>
        </thead>
        <tbody>
          {data.map((tournament, i) => (
            <tr key={i}>
              <td>
                {tournament.location}
                <br />
                {tournament.masters} masters
              </td>
              {tournament.results.map((result) => (
                <td>
                  {result.points}/
                  <span style={{ color: "#66FF99" }}>{result.in}</span>/
                  <span style={{ color: "#FF8080" }}>{result.out}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableMajor;
