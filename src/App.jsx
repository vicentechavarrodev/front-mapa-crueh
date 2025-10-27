import "./App.css";
import Dashboard from "./components/dashboard/index.jsx";
import { loader } from "./utils/loader.jsx";

import React from "react";

function App() {
  loader.hide();
  return <Dashboard />;
}

export default App;
