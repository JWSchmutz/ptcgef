const majors = [
  {
    location: "Stuttgart '25",
    masters: 1702,
    results: [
      {
        top: 16,
        points: 28,
        in: 8,
        out: 12,
      },
      {
        top: 32,
        points: 27,
        in: 4,
        out: 9,
      },
      {
        top: 64,
        points: 25,
        in: 9,
        out: 32,
      },
      {
        top: 128,
        points: 23,
        in: 13,
        out: 23,
      },
      {
        top: 256,
        points: 20,
        in: 44,
        out: 4,
      },
      {
        top: 512,
        points: 13,
        in: 66,
        out: 106,
      },
    ],
  },
  {
    location: "Perth '25",
    masters: 318,
    results: [
      {
        top: 16,
        points: 22,
        in: 6,
        out: 1,
      },
      {
        top: 32,
        points: 19,
        in: 1,
        out: 13,
      },
      {
        top: 64,
        points: 15,
        in: 9,
        out: 11,
      },
      {
        top: 128,
        points: 12,
        in: 7,
        out: 20,
      },
    ],
  },
  {
    location: "Bogota '25",
    masters: 225,
    results: [
      {
        top: 16,
        points: 18,
        in: 1,
        out: 5,
      },
      {
        top: 32,
        points: 17,
        in: 11,
        out: 1,
      },
      {
        top: 64,
        points: 12,
        in: 7,
        out: 7,
      },
    ],
  },
  {
    location: "Sacramento '25",
    masters: 1705,
    results: [
      {
        top: 8,
        points: 30,
        in: 3,
        out: 1,
      },
      {
        top: 16,
        points: 28,
        in: 5,
        out: 15,
      },
      {
        top: 32,
        points: 27,
        in: 2,
        out: 10,
      },
      {
        top: 64,
        points: 25,
        in: 9,
        out: 36,
      },
      {
        top: 128,
        points: 23,
        in: 7,
        out: 23,
      },
      {
        top: 256,
        points: 19,
        in: 5,
        out: 22,
      },
      {
        top: 512,
        points: 13,
        in: 71,
        out: 99,
      },
    ],
  },
  {
    location: "Gdansk '25",
    masters: 1372,
    results: [
      {
        top: 8,
        points: 30,
        in: 3,
        out: 0,
      },
      {
        top: 16,
        points: 28,
        in: 6,
        out: 7,
      },
      {
        top: 32,
        points: 27,
        in: 9,
        out: 2,
      },
      {
        top: 64,
        points: 24,
        in: 3,
        out: 14,
      },
      {
        top: 128,
        points: 17,
        in: 11,
        out: 8,
      },
      {
        top: 256,
        points: 15,
        in: 46,
        out: 88,
      },
      {
        top: 512,
        points: 12,
        in: 2,
        out: 145,
      },
    ],
  },
  {
    location: "Baltimore '25",
    masters: 2307,
    results: [
      {
        top: 8,
        points: 33,
        in: 2,
        out: 2,
      },
      {
        top: 16,
        points: 31,
        in: 3,
        out: 4,
      },
      {
        top: 32,
        points: 30,
        in: 12,
        out: 9,
      },
      {
        top: 64,
        points: 27,
        in: 3,
        out: 24,
      },
      {
        top: 128,
        points: 22,
        in: 8,
        out: 1,
      },
      {
        top: 256,
        points: 18,
        in: 48,
        out: 118,
      },
      {
        top: 512,
        points: 16,
        in: 101,
        out: 9,
      },
      {
        top: 1024,
        points: 12,
        in: 113,
        out: 103,
      },
    ],
  },
  {
    location: "Dortmund '25",
    masters: 1815,
    results: [
      {
        top: 8,
        points: 30,
        in: 2,
        out: 4,
      },
      {
        top: 16,
        points: 29,
        in: 4,
        out: 0,
      },
      {
        top: 32,
        points: 27,
        in: 3,
        out: 19,
      },
      {
        top: 64,
        points: 25,
        in: 8,
        out: 14,
      },
      {
        top: 128,
        points: 22,
        in: 12,
        out: 4,
      },
      {
        top: 256,
        points: 16,
        in: 74,
        out: 19,
      },
      {
        top: 512,
        points: 13,
        in: 5,
        out: 141,
      },
    ],
  },
  {
    location: "Joinville '25",
    masters: 578,
    results: [
      {
        top: 8,
        points: 27,
        in: 4,
        out: 1,
      },
      {
        top: 16,
        points: 24,
        in: 4,
        out: 6,
      },
      {
        top: 32,
        points: 23,
        in: 10,
        out: 1,
      },
      {
        top: 64,
        points: 16,
        in: 4,
        out: 28,
      },
      {
        top: 128,
        points: 15,
        in: 37,
        out: 23,
      },
      {
        top: 256,
        points: 12,
        in: 43,
        out: 25,
      },
    ],
  },
  {
    location: "Lima '25",
    masters: 307,
    results: [
      {
        top: 8,
        points: 23,
        in: 2,
        out: 0,
      },
      {
        top: 16,
        points: 21,
        in: 5,
        out: 1,
      },
      {
        top: 32,
        points: 16,
        in: 4,
        out: 6,
      },
      {
        top: 64,
        points: 14,
        in: 4,
        out: 12,
      },
      {
        top: 128,
        points: 12,
        in: 16,
        out: 13,
      },
    ],
  },
  {
    location: "Louisville '25",
    masters: 1938,
    results: [
      {
        top: 8,
        points: 31,
        in: 8,
        out: 0,
      },
      {
        top: 16,
        points: 30,
        in: 8,
        out: 2,
      },
      {
        top: 32,
        points: 28,
        in: 10,
        out: 1,
      },
      {
        top: 64,
        points: 26,
        in: 2,
        out: 5,
      },
      {
        top: 128,
        points: 24,
        in: 34,
        out: 1,
      },
      {
        top: 256,
        points: 16,
        in: 47,
        out: 26,
      },
      {
        top: 512,
        points: 14,
        in: 16,
        out: 18,
      },
    ],
  },
  {
    location: "Lille '25",
    masters: 1311,
    results: [
      {
        top: 8,
        points: 30,
        in: 4,
        out: 1,
      },
      {
        top: 16,
        points: 28,
        in: 3,
        out: 4,
      },
      {
        top: 32,
        points: 27,
        in: 12,
        out: 5,
      },
      {
        top: 64,
        points: 24,
        in: 4,
        out: 14,
      },
      {
        top: 128,
        points: 16,
        in: 2,
        out: 80,
      },
      {
        top: 256,
        points: 15,
        in: 48,
        out: 73,
      },
      {
        top: 512,
        points: 12,
        in: 21,
        out: 115,
      },
    ],
  },
];

majors.sort((a, b) => parseFloat(b.masters) - parseFloat(a.masters));

export default majors;
