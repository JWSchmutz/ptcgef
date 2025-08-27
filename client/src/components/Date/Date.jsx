function formatTime(hours, minutes) {
  const period = hours >= 12 ? "pm" : "am";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");
  return `${formattedHours}:${formattedMinutes}${period}`;
}

function formatDate(apiDateTimeString) {
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

  // Step 1: Parse the API string as Eastern Time
  const [datePart, timePart] = apiDateTimeString.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute, second] = timePart
    .replace("Z", "")
    .split(":")
    .map(Number);

  // Eastern Time offset (EDT is UTC-4, EST is UTC-5)
  // Using Date.UTC to handle proper conversion to local timezone automatically
  const easternDateUTC = new Date(
    Date.UTC(year, month - 1, day, hour + 4, minute, second)
  );

  // Step 2: Get local time components
  const localDate = easternDateUTC;
  const localMonth = months[localDate.getMonth()];
  const localDay = localDate.getDate();
  const localHour = localDate.getHours();
  const localMinute = localDate.getMinutes();

  const suffix =
    localDay === 1 || localDay === 21 || localDay === 31
      ? "st"
      : localDay === 2 || localDay === 22
      ? "nd"
      : localDay === 3 || localDay === 23
      ? "rd"
      : "th";

  const formattedDate = `${localMonth} ${localDay}${suffix}`;
  const formattedTime = formatTime(localHour, localMinute);

  return `${formattedDate} at ${formattedTime}`;
}

export default formatDate;
