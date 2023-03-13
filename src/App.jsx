import * as React from "react";
import { Route, Routes } from "react-router";
import { Home } from "./components/commons/home";
import { Watched } from "./components/commons/Watched";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/watched" element={<Watched />} />
    </Routes>
  )
}

export default App;

