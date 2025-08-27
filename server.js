const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
const upload = multer({ dest: "uploads/" });
const bodyParser = require("body-parser");
const FormData = require("form-data");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "./client/dist")));

app.get("/addresses", async (req, res) => {
  // Make a request for a user with a given ID
  axios
    .get(
      "https://geocoding.geo.census.gov/geocoder/locations/address" +
        req._parsedUrl.search
    )
    .then(function (response) {
      // handle success
      res.json(response.data.result.addressMatches);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.get("/events", async (req, res) => {
  const coordinates = req._parsedUrl.query
    .replace("x=", "")
    .replace("y=", "")
    .split("&");
  const lati = coordinates[1];
  const longi = coordinates[0];
  const today = new Date().toISOString().split("T")[0];

  const getStoreDistance = (lat1, lon1, lat2, lon2) =>
    3958.8 *
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin(((lat2 - lat1) * Math.PI) / 180 / 2) ** 2 +
          Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(((lon2 - lon1) * Math.PI) / 180 / 2) ** 2
      )
    );

  axios
    .get(
      `https://pokedata.ovh/events/api/_tcg/cups/challenges/pre/_latitude/${lati}/_longitude/${longi}/_radius/250/_unit/miles/_start/${today}`
    )
    .then((results) => {
      filteredMerged = results.data.map((event) => {
        delete event.TCaccounts;
        delete event.Third_party_registration_website;
        delete event.category;
        delete event.contact_data;
        delete event.date_added;
        delete event.juniors;
        delete event.seniors;
        delete event.masters;
        delete event.league;
        delete event.postal_code;
        delete event.product;
        event.distance = getStoreDistance(
          lati,
          longi,
          event.latitude,
          event.longitude
        );
        delete event.latitude;
        delete event.longitude;
        delete event.status;
        delete event.totalPlayers;
        delete event.tournament_completed;
        delete event.tournament_date;
        delete event.status;
        delete event.state;
        if (event.name.includes("Gemini")) console.log(event.when);
        event.when = event.when.replace(" ", "T");
        event.when = new Date(event.when);
        if (event.name.includes("Gemini")) console.log(event.when);
        return event;
      });
      res.json(results.data);
    })
    .catch((error) => {
      console.error("Error fetching locations:", error);
    });
});

app.get("/players/:id", async (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://www.pokedata.ovh/apiv2/tcg/id/${id}/division/masters/light`)
    .then(function (response) {
      // handle success
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.get("/racers", async (req, res) => {
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({
      APIKEY: "supercalifragilisticexpialidocious",
      players: [
        { name: "Tor*", game: "tcg", division: "master", country: "NOR" },
      ],
    }),
  };
  axios
    .post(`https://www.pokedata.ovh/2024/api`, options)
    .then(function (response) {
      // handle success
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.get("/tournaments", async (req, res) => {
  axios
    .get(`https://pokedata.ovh/standings/tournaments/`)
    .then(function (response) {
      // handle success
      res.json(response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(port, () => console.log("Server started on port " + port));
