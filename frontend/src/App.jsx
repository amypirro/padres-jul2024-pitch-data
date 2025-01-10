import React, { useState } from "react";
import "./index.css";
import PadresBatters from "./components/PadresBatters";
import BatEvents from "./components/BatEventsHomeVsAway";

function App() {
  const [currentBatter, setCurrentBatter] = useState(null);

  console.log(currentBatter);
  return (
    <>
      <div className="container mx-auto">
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
