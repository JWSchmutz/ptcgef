const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const port = process.env.PORT || 3001;
const path = require("path");
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
  // Make a request for a user with a given ID
  axios
    .get(
      `https://op-core.pokemon.com/api/v2/event_locator/search/?distance=250&format=json&latitude=${coordinates[1]}&longitude=${coordinates[0]}`
    )
    .then(function (response) {
      // handle success
      res.json(response.data.activities);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
});

app.get("/players/:id", async (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://www.pokedata.ovh/standings/${id}/masters/${id}_Masters.json`)
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
