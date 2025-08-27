function formatDate(apiDateTimeString) {
  const date = new Date(apiDateTimeString);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default formatDate;
