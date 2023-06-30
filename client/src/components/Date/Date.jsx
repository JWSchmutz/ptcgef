import React from "react";

function formatTime(hours, minutes) {
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}${period}`;
}

function formatDate(dateTimeString) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(dateTimeString);
  const month = months[date.getMonth()];
  const day = date.getDate();
  const hour = date.getHours() + 4;
  const minute = date.getMinutes();

  const suffix =
    day === 1 || day === 21 || day === 31
      ? "st"
      : day === 2 || day === 22
      ? "nd"
      : day === 3 || day === 23
      ? "rd"
      : "th";

  const formattedDate = `${month} ${day}${suffix}`;
  const formattedTime = formatTime(hour, minute);

  return `${formattedDate} at ${formattedTime}`;
}
export default formatDate;
