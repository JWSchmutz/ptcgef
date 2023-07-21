import { useState, useEffect } from "react";
import "./EventFinder.css";
import Colors from "../../Colors";
import Card from "../../Card/Card";
import Form from "../../Form/Form";
import Button from "../../Button/Button";
import Loading from "../../Loading/Loading";
import EventCard from "../../EventCard/EventCard";
const API_Base = "https://jealous-colt-cowboy-hat.cyclic.app";
// const API_Base = "http://localhost:3001";
function EventFinder() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [allEvents, setAllEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const [showChallenges, setShowChallenges] = useState(
    localStorage.getItem("challenges") === "false" ? false : true
  );
  const [challengeDistance, setChallengeDistance] = useState(
    localStorage.getItem("league_challenge") || 25
  );
  const [showCups, setShowCups] = useState(
    localStorage.getItem("cups") === "false" ? false : true
  );
  const [cupDistance, setCupDistance] = useState(
    localStorage.getItem("league_cup") || 25
  );
  const [showPrereleases, setShowPrereleases] = useState(
    localStorage.getItem("prereleases") === "false" ? false : true
  );
  const [prereleaseDistance, setPrereleaseDistance] = useState(
    localStorage.getItem("prerelease") || 25
  );
  const [streetAdress, setStreetAdress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [coordinates, setCoordinates] = useState(
    localStorage.getItem("x-coordinates")
      ? {
          x: localStorage.getItem("x-coordinates"),
          y: localStorage.getItem("y-coordinates"),
        }
      : false
  );

  const resetAddress = () => {
    setIsLoading(true);
    localStorage.removeItem("x-coordinates");
    localStorage.removeItem("y-coordinates");
    setCoordinates("");
  };

  const setCoordinatesInLocalStorageAndState = (x, y) => {
    localStorage.setItem("x-coordinates", x);
    localStorage.setItem("y-coordinates", y);
    setCoordinates({
      x: localStorage.getItem("x-coordinates"),
      y: localStorage.getItem("y-coordinates"),
    });
  };

  const handleUseCurrentLocationClick = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoordinatesInLocalStorageAndState(
          position.coords.longitude,
          position.coords.latitude
        );
      },
      () => {
        alert(
          "you found a bug. If you have time, reach out to @seagrovetcg on twitter and hopefully you can help me improve this app"
        );
      },
      { timeout: 10000 }
    );
  };

  const onSubmit = (e) => {
    setErrorMessage("");
    e.preventDefault();
    fetch(
      `${API_Base}/addresses?street=${streetAdress
        .trim()
        .toLowerCase()
        .split(" ")
        .join("+")}&city=${city.trim().toLowerCase()}&state=${state
        .trim()
        .toLowerCase()}&zip=${zip
        .trim()
        .toLowerCase()}&benchmark=2020&format=json`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length) {
          setCoordinatesInLocalStorageAndState(
            data[0].coordinates.x,
            data[0].coordinates.y
          );
        }
        if (!data.length) {
          return setErrorMessage("Not found. Please try a different address.");
        }
        if (data.length > 1) {
          return alert(
            "You found a bug I have been looking for!  Please message @seagrovetcg on twitter and let me know how you did it so I can fix it."
          );
        }
      });
  };

  const handleShowChange = (e) => {
    localStorage.setItem(e.target.value, e.target.checked);
    switch (e.target.value) {
      case "challenges":
        setShowChallenges(e.target.checked);
        break;
      case "cups":
        setShowCups(e.target.checked);
        break;
      case "prereleases":
        setShowPrereleases(e.target.checked);
        break;
      default:
        break;
    }
    getDesiredEvents();
  };
  const handleDistanceChange = (e) => {
    localStorage.setItem(e.target.name, e.target.value);
    switch (e.target.name) {
      case "league_challenge":
        setChallengeDistance(e.target.value);
        break;
      case "league_cup":
        setCupDistance(e.target.value);
        break;
      case "prerelease":
        setPrereleaseDistance(e.target.value);
        break;
      default:
        break;
    }
    getDesiredEvents();
  };
  useEffect(() => {
    getDesiredEvents();
  }, [
    showChallenges,
    showCups,
    showPrereleases,
    cupDistance,
    challengeDistance,
    prereleaseDistance,
    allEvents,
  ]);

  useEffect(() => {
    if (!coordinates) return;
    setIsLoading(true);
    fetch(`${API_Base}/events?x=${coordinates.x}&y=${coordinates.y}`)
      .then((response) => response.json())
      .then((data) => {
        data.sort((p1, p2) =>
          p1.start_datetime < p2.start_datetime
            ? -1
            : p1.start_datetime > p2.start_datetime
            ? 1
            : 0
        );
        data.filter((event) => event.products.includes("tcg"));

        data.map(function (item) {
          delete item.when;
          delete item.status;
          delete item.products;
          delete item.premier_event_series_guid;
          delete item.payment_options;
          delete item.name;
          item.price = item.metadata.on_site_admission;
          delete item.metadata;
          delete item.local_id;
          delete item.league_guid;
          delete item.large_event_guid;
          delete item.has_registration_skus;
          delete item.has_registration_options;
          delete item.contact_information;
          item.name = item.address.name;
          item.city = item.address.city;
          delete item.address;
          delete item.activity_type;
          return item;
        });

        setAllEvents(
          data.filter(
            (event) =>
              event.tags.includes("league_challenge") ||
              event.tags.includes("league_cup") ||
              event.tags.includes("prerelease")
          )
        );
        return getDesiredEvents();
      });
  }, [coordinates]);

  const getDesiredEvents = () => {
    let eventsToShow = [...allEvents];
    if (!showChallenges)
      eventsToShow = eventsToShow.filter(
        (event) => !event.tags.includes("league_challenge")
      );
    else
      eventsToShow = eventsToShow.filter(
        (event) =>
          event.tags.includes("prerelease") ||
          event.tags.includes("league_cup") ||
          (event.tags.includes("league_challenge") &&
            event.distance < Number(challengeDistance))
      );
    if (!showCups)
      eventsToShow = eventsToShow.filter(
        (event) => !event.tags.includes("league_cup")
      );
    else
      eventsToShow = eventsToShow.filter(
        (event) =>
          event.tags.includes("league_challenge") ||
          event.tags.includes("prerelease") ||
          (event.tags.includes("league_cup") &&
            event.distance < Number(cupDistance))
      );
    if (!showPrereleases)
      eventsToShow = eventsToShow.filter(
        (event) => !event.tags.includes("prerelease")
      );
    else
      eventsToShow = eventsToShow.filter(
        (event) =>
          event.tags.includes("league_challenge") ||
          event.tags.includes("league_cup") ||
          (event.tags.includes("prerelease") &&
            event.distance < Number(prereleaseDistance))
      );

    setEvents(eventsToShow, setIsLoading(false));
  };

  return (
    <>
      {coordinates ? (
        <main id="event-finder">
          <h2 className="page-title">PTCG Event Finder</h2>
          <div
            className="filterSection"
            style={{ color: "white", textAlign: "left" }}
          >
            <div>
              <div>
                <input
                  type="checkbox"
                  role="switch"
                  id="challenges"
                  name="challenges"
                  value="challenges"
                  onChange={handleShowChange}
                  defaultChecked={
                    localStorage.getItem("challenges") === "false"
                      ? false
                      : true
                  }
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                />
                <label htmlFor="challenges">
                  <span className="checkbox"></span>
                  Show Challenges within{" "}
                  <select
                    name="league_challenge"
                    id="league_challenge"
                    onChange={handleDistanceChange}
                    value={localStorage.getItem("league_challenge") || 25}
                  >
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="250">250</option>
                  </select>{" "}
                  miles
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  role="switch"
                  id="cups"
                  name="cups"
                  value="cups"
                  onChange={handleShowChange}
                  defaultChecked={
                    localStorage.getItem("cups") === "false" ? false : true
                  }
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                />
                <label htmlFor="cups">
                  <span className="checkbox"></span>
                  Show Cups within{" "}
                  <select
                    name="league_cup"
                    id="league_cup"
                    onChange={handleDistanceChange}
                    value={localStorage.getItem("league_cup") || 25}
                  >
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="250">250</option>
                  </select>{" "}
                  miles
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  role="switch"
                  id="prereleases"
                  name="prereleases"
                  value="prereleases"
                  onChange={handleShowChange}
                  defaultChecked={
                    localStorage.getItem("prereleases") === "false"
                      ? false
                      : true
                  }
                  style={{ paddingTop: 0, paddingBottom: 0 }}
                />
                <label htmlFor="prereleases">
                  <span className="checkbox"></span> Show Prereleases within{" "}
                  <select
                    name="prerelease"
                    id="prerelease"
                    onChange={handleDistanceChange}
                    value={localStorage.getItem("prerelease") || 25}
                  >
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                    <option value="250">250</option>
                  </select>{" "}
                  miles
                </label>
              </div>
              <div style={{ textAlign: "center", margin: "35px auto 35px" }}>
                <Button text="Change Address" handleClick={resetAddress} />
              </div>
            </div>
          </div>
          <div className="eventSection">
            <h3 className="sub-title">Tournaments</h3>
            <div className="eventHolder">
              {isLoading ? (
                <Loading />
              ) : !events.length ? (
                <p style={{ color: "white" }}>
                  No events to show. Please refine your search.
                </p>
              ) : (
                events.map((event) => (
                  <EventCard event={event} key={event.guid} />
                ))
              )}
            </div>
          </div>
        </main>
      ) : (
        <Card
          children={
            <>
              <Button
                text="Use Current Location"
                handleClick={() => handleUseCurrentLocationClick()}
                classes={"use-current-location-button"}
              />
              <hr
                style={{
                  margin: "40px auto 0",
                  width: "300px",
                  maxWidth: "80%",
                }}
              />
              <span
                className="or"
                style={{
                  backgroundColor: Colors.darker,
                  position: "relative",
                  top: "-10px",
                  padding: "10px",
                }}
              >
                {" "}
                OR{" "}
              </span>

              <Form
                fields={[
                  {
                    name: "address",
                    label: "Street Address",
                    value: streetAdress,
                    onChange: (e) => setStreetAdress(e.target.value),
                  },
                  {
                    name: "city",
                    label: "City",
                    value: city,
                    onChange: (e) => setCity(e.target.value),
                  },
                  {
                    name: "state",
                    label: "State",
                    value: state,
                    onChange: (e) => setState(e.target.value),
                  },
                  {
                    name: "zip",
                    label: "Zip Code",
                    value: zip,
                    onChange: (e) => setZip(e.target.value),
                  },
                ]}
                onSubmit={onSubmit}
              />
              {errorMessage && <p>{errorMessage}</p>}
            </>
          }
          title="Find Events Near"
          width="100%"
          height="auto"
          backgroundColor={Colors.darker}
          color="white"
          className="find-events-card"
        />
      )}
      {console.log(Colors)}
    </>
  );
}

export default EventFinder;
