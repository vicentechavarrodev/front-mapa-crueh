import Mapa from "./components/map/index.jsx";
import "./App.css";
import { loader } from "./utils/loader.jsx";
import React from "react";

function App() {
  loader.hide();
  return (
    <>
      <div>
        <Mapa />
      </div>
    </>
  );
}

export default App;
