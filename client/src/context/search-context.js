import React from "react";

// set the defaults
const searchContext = React.createContext({
  searchText: "",
  setSearchText: () => {},
});

export default searchContext;
