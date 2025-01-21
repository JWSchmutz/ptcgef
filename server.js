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
      console.log(response);
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

app.post("/upload", upload.single("image"), async (req, res) => {
  let isPhone = false;
  const eky1 = "d555efb7c422f380e";
  const eky2 = "163e4a76";
  const eky3 = "f25c65079048540";
  const dimensions = JSON.parse(req.body.dimensions);
  if (dimensions.width < dimensions.height) isPhone = true;
  try {
    const imagePath = path.resolve(req.file.path); // Ensure this points to the uploaded image file

    // Create a FormData instance and append the image file
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath)); // Attach the image file

    const response = await axios.post(
      "https://www.imagetotext.info/api/imageToText",
      formData,
      {
        headers: {
          ...formData.getHeaders(), // Include form-data-specific headers
          Authorization: "Bearer " + eky2 + eky1 + eky3,
        },
        maxRedirects: 10,
        timeout: 0,
      }
    );
    let textArray = response.data.result
      .replace(/(\r\n|\n|\r)/gm, "")
      .split("<br />");
    const player1 = {};
    const player2 = {};
    console.log(textArray);
    textArray = textArray.filter((ele) => {
      if (ele === "V" || ele === "VS" || ele === "S") return true;
      console.log(ele);

      if (parseInt(ele) > 0) {
        if (ele.length !== 4) return false;
        else if (ele === "2023") return false;
        else if (ele === "2024") return false;
        else if (ele === "2025") return false;
        console.log(ele);
        return true;
      }

      if (ele.length > 15 || ele.length < 3) return false;
      else if (ele === "Pokemo") return false;
      else if (ele === "Pokem") return false;
      else if (ele === "Poke") return false;
      else if (ele === "Pokey") return false;
      else if (ele === "Peken") return false;
      else if (ele === "Pokemon") return false;
      else if (ele === "CUP") return false;
      else if (ele === "PLAYERS") return false;
      else if (ele === "compassion") return false;
      else if (ele === "I could Win") return false;
      else if (ele === "Angham") return false;
      else if (ele === "Anaheim") return false;
      else if (ele === "bottle") return false;
      else if (ele === "STATS") return false;
      else if (
        ele.includes("Pokém") ||
        ele.includes("PokeNo") ||
        ele.includes("PokeM") ||
        ele.includes("POKEM") ||
        ele.includes("Роком")
      )
        return false;
      else if (
        ele.includes(".") ||
        ele.includes("!") ||
        ele.includes("?") ||
        ele.includes("&")
      )
        return false;
      else if (ele.includes("LIVE")) return false;

      return true;
    });
    console.log(textArray, textArray.length);
    if (
      (textArray.indexOf("VS") === 2 ||
        textArray.indexOf("V") === 2 ||
        textArray.indexOf("S") === 2) &&
      !isPhone
    ) {
      player1.elo = parseInt(textArray[0]);
      player1.username = textArray[1];
      player2.username = textArray[3];
      player2.elo = parseInt(textArray[4]);
    }
    if (isPhone) {
      console.log("here");
      textArray = textArray.filter((el) => !["V", "S", "VS"].includes(el));
      player1.elo = parseInt(textArray[0]);
      player1.username = textArray[2];
      player2.username = textArray[1];
      player2.elo = parseInt(textArray[3]);
      //[03, manuel, 51, jhollen]
      console.log(player2.elo);
      if (isNaN(player2.elo)) {
        player1.elo = parseInt(textArray[0]);
        player1.username = textArray[3];
        player2.username = textArray[1];
        player2.elo = parseInt(textArray[2]);
      }
    }

    const dp2 = path.join(__dirname, "db2.json");

    // Read the existing JSON file
    fs.readFile(dp2, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading db2.json:", err);
        return;
      }

      let jsonArray;
      try {
        // Parse the file contents to a JavaScript array
        jsonArray = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        return;
      }

      // Push textArray into the existing JSON array
      jsonArray.push(textArray);

      // Write the updated array back to the file
      fs.writeFile(
        dp2,
        JSON.stringify(jsonArray, null, 2),
        "utf8",
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing to db2.json:", writeErr);
            return;
          }
          console.log("Successfully updated db2.json");
        }
      );
    });

    const dataPath = path.join(__dirname, "db.json");

    // Read the existing JSON file
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading data.json:", err);
        return;
      }

      let jsonArray;
      try {
        // Parse the file contents to a JavaScript array
        jsonArray = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        return;
      }

      // Function to update or add a player
      const upsertPlayer = (player) => {
        const existingIndex = jsonArray.findIndex(
          (item) => item.username === player.username
        );

        if (existingIndex !== -1) {
          // Overwrite the existing entry
          jsonArray[existingIndex] = player;
        } else {
          // Add as a new entry
          jsonArray.push(player);
        }
      };

      // Update or add player1 and player2
      upsertPlayer(player1);
      upsertPlayer(player2);

      // Write the updated array back to the file
      fs.writeFile(
        dataPath,
        JSON.stringify(jsonArray, null, 2),
        "utf8",
        (writeErr) => {
          if (writeErr) {
            console.error("Error writing to data.json:", writeErr);
            return;
          }
          console.log("Successfully updated data.json");
          fs.unlink(imagePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error("Error deleting file:", unlinkErr);
              return;
            }
            console.log("Successfully deleted the file:", imagePath);
          });
        }
      );
    });
    res.end;
    res.json({
      message: "Image uploaded and processed successfully!",
      player1,
      player2,
      textArray,
    });
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
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
