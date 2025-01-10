import React, { useState } from "react";
import "./index.css";
import PadresBatters from "./components/PadresBatters";
import BatEvents from "./components/BatEventsHomeVsAway";
import HeaderNav from "./components/Header";

function App() {
  const [currentBatter, setCurrentBatter] = useState(null);

  return (
    <>
      <HeaderNav />
      <div className="container mx-auto px-5">
        <PadresBatters
          currentBatter={currentBatter}
          setCurrentBatter={setCurrentBatter}
        />
        <BatEvents currentBatter={currentBatter} />
      </div>
    </>
  );
}

export default App;
