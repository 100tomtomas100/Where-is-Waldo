import { Route, Routes } from "react-router-dom";

import "./App.css";
import Start from "./components/Start/Start";
import Game from "./components/Game/Game";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/game" element={<Game />} />
        <Route path="/leader-board" element={<LeaderBoard />} />
      </Routes>
    </div>
  );
}

export default App;
