import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Start from "./components/Start/Start";
import Game from "./components/Game/Game";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import ChooseMap from "./components/ChooseMap/ChooseMap";
import Storage from "./components/common/Storage";


function App(): JSX.Element {
  const[selectedMap, SetSelectedMap] = useState<string>("map")

  return (
    <div className="App">
      <Storage.Provider value={{ selectedMap, SetSelectedMap }}>
        <Routes>        
          <Route path="/" element={<Start />} />
          <Route path="/game" element={<Game />} />
          <Route path="/leader-board" element={<LeaderBoard />} />
          <Route path="/choose-map" element={<ChooseMap />} />        
        </Routes>
      </Storage.Provider>
    </div>
  );
}

export default App;
