function formatTime(hours, minutes) {
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}${period}`;
}

function formatDate(apiDateTimeString) {
  // Append "T" string but *do NOT add Z*
  const [datePart, timePart] = apiDateTimeString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);

  // Create a Date using local time
  const date = new Date(year, month - 1, day, hour, minute, second);

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
  const dayNum = date.getDate();
  const suffix =
    dayNum === 1 || dayNum === 21 || dayNum === 31
      ? "st"
      : dayNum === 2 || dayNum === 22
      ? "nd"
      : dayNum === 3 || dayNum === 23
      ? "rd"
      : "th";

  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${
    months[date.getMonth()]
  } ${dayNum}${suffix} at ${formattedHours}:${minutes} ${period}`;
}

export default formatDate;
