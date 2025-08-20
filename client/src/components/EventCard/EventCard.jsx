import React from "react";
import Card from "../Card/Card.jsx";
import formatDate from "../Date/Date";
import Colors from "../../data/Colors.js";

function EventCard({ event }) {
  console.log("Event Card", event);
  return (
    <a
      href={event.pokemon_url}
      target="blank"
      style={{ textDecoration: "none" }}
    >
      <Card
        key={event.guid}
        children={
          <>
            <h4>{formatDate(event?.date)}</h4>
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
          event.type === "League Challenge"
            ? "League Challenge"
            : event.type === "League Cup"
            ? "League Cup"
            : event.type === "Pre Release"
            ? "Pre-Release"
            : "Other"
        }`}
        backgroundColor={`${
          event.type === "League Challenge"
            ? Colors.primaryDark
            : event.type === "League Cup"
            ? Colors.primary
            : event.type === "Pre Release"
            ? Colors.dark
            : "white"
        }`}
        color={`${
          event.type === "League Challenge" ||
          event.type === "League Cup" ||
          event.type === "Pre Release"
            ? "white"
            : "black"
        }`}
      />
    </a>
  );
}

export default EventCard;
