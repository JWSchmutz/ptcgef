const Live = [
  {
    username: "Seagrove",
    elo: 1697,
    confidence: 100,
  },
  {
    username: "jun0712",
    elo: 1634,
    confidence: 100,
  },
  {
    username: "DCOLDEST",
    elo: 1716,
    confidence: 100,
  },
  {
    username: "Bloodreaper111",
    elo: 1636,
    confidence: 100,
  },
  {
    username: "UnreadierFuture",
    elo: 1644,
    confidence: 100,
  },
];

Live.sort((a, b) => b.elo - a.elo);

export default Live;
