import { Route, Routes, BrowserRouter } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Home from "./components/pages/Home/Home";
import CardSearch from "./components/pages/CardSearch/CardSearch";
import EventFinder from "./components/pages/EventFinder/EventFinder";
import TopCutData from "./components/pages/TopCutData/TopCutData";
import Games from "./components/pages/Games/Games";
import Store from "./components/pages/Store/Store";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <Navbar
        title="SeagroveTCG"
        pages={[
          "card-search",
          "event-finder",
          "top-cut-data",
          "games",
          "store",
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
          <Route exact path="/games" element={<Games />} />
          <Route exact path="/store" element={<Store />} />
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
