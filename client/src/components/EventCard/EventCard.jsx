import React from "react";
import Card from "../Card/Card.jsx";
import formatDate from "../Date/Date";

function EventCard({ event }) {
  return (
    <a href={event.pokemon_url} target="blank">
      <Card
        key={event.guid}
        children={
          <>
            <h4>{formatDate(event?.start_datetime)}</h4>
            <span
              style={{
                position: "absolute",
                top: "3px",
                left: "10px",
              }}
            >
              {event?.price &&
                `$${event?.price?.replace("$", "").replace(".00", "")}`}
            </span>
            <span
              style={{
                position: "absolute",
                top: "3px",
                right: "10px",
                lineHeight: "16px",
              }}
            >
              {`${Math.round(event?.distance)} mi`}
              <br />
              {event?.city}
            </span>
          </>
        }
        title={`${event?.name} ${
          event?.tags?.includes("league_challenge")
            ? "League Challenge"
            : event?.tags?.includes("league_cup")
            ? "League Cup"
            : event?.tags?.includes("prerelease")
            ? "Pre-Release"
            : "Other"
        }`}
        backgroundColor={`${
          event?.tags?.includes("league_challenge")
            ? "#3700B3"
            : event?.tags?.includes("league_cup")
            ? "#03DAC5"
            : event?.tags?.includes("prerelease")
            ? "#EFBCD5"
            : "white"
        }`}
        color={`${
          event?.tags?.includes("league_challenge") ? "white" : "black"
        }`}
      />
    </a>
  );
}

export default EventCard;
