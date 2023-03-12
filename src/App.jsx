import * as React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./components/commons/home";

function App({ searchTerm, onSearch }) {
  return (
    <Routes>
      <Route exact path="/" element={<Home {...{searchTerm, onSearch}} />} />
    </Routes>
  )
}

export default App;

