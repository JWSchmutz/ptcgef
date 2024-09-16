import { Route, Routes } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./components/pages/Home/Home";
import CardSearch from "./components/pages/CardSearch/CardSearch";
import EventFinder from "./components/pages/EventFinder/EventFinder";
import TopCutData from "./components/pages/TopCutData/TopCutData";
import TopX from "./components/pages/TopX/TopX";
import Homies from "./components/pages/Homies/Homies";
import Navbar from "./components/Navbar/Navbar";
// import allStandardLegalCards from "./data/allStandardLegalCards";
import "./App.css";

function App() {
  return (
    <>
      <Navbar
        title="SeagroveTCG"
        pages={[
          "card-search",
          "event-finder",
          "homies",
          "top-cut-data",
          // "top-X",
        ]}
      />
      {/* <Route
        path="/login"
        render={() => <LoginForm updateUser={updateUser} user={user} />}
      />
      <Route path="/signup" render={() => <SignUp user={user} />} /> */}
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/card-search" element={<CardSearch />} />
          <Route exact path="/event-finder" element={<EventFinder />} />
          <Route exact path="/top-cut-data" element={<TopCutData />} />
          <Route exact path="/top-x" element={<TopX />} />
          <Route exact path="/homies" element={<Homies />} />
          {/*
      <PrivateRoute
        authed={!!user.username}
        path="/players"
        element={<Players />}
      /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
